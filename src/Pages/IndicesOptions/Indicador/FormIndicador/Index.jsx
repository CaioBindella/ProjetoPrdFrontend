import React, { useState, useEffect } from "react";

import { Container } from "./Style";

import { ScrollView } from "react-native";

import Header from "../../../Components/Header/Index";
import IndiceCard from "../../../Components/IndiceCard/Index";
import Score from "../../../Components/Score/Index";
import { indiceDb } from "../../../../Services/SqlTables/sqliteDb";

const getQuestions = (subcat) => {
  return new Promise((resolve, reject) => {
    indiceDb.then((data) => {
      data.transaction((tx) => {
        //comando SQL modificável
        tx.executeSql(
          `
            SELECT I.Titulo, I.DescInd, I.CodInd, A.Desc, AP.Pontuacao, AP.CodAvPeso 
            from Categoria C                 
            INNER JOIN SubCategoria SC ON SC.CodCat = C.CodCat                 
            INNER JOIN Indicador I ON I.CodSubCat = SC.CodSubCat                 
            INNER JOIN AvaliacaoPeso AP ON AP.CodInd = I.CodInd                 
            INNER JOIN Avaliacao A ON A.CodAval = AP.CodAval                 
            WHERE SC.DescSubCat = "${subcat}";
            `,
          [],
          //-----------------------
          (_, { rows }) => resolve(rows._array),
          (_, error) => reject(error) // erro interno em tx.executeSql
        );
      });
    });
  });
};

const checkPreviousAnaliseItem = (codInd, codAnalise) => {
    return new Promise((resolve, reject) => {
      indiceDb.then((data) => {
        data.transaction((tx) => {
          //comando SQL modificável
          tx.executeSql(
            `
                SELECT CodAvPeso, CodInd, CodAnalise
                FROM AnaliseItem
                WHERE CodInd=? AND CodAnalise=?;
            `,
            [codInd, codAnalise],
            //-----------------------
            (_, { rows }) => resolve(rows._array),
            (_, error) => reject(error) // erro interno em tx.executeSql
          );
        });
      });
    });
};

const createAnaliseItemRegisters = (codAvPeso, codInd, codAnalise) => {
  return new Promise((resolve, reject) => {
    indiceDb.then((data) => {
      data.transaction((tx) => {
        //comando SQL modificável
        tx.executeSql(
            `
            INSERT INTO AnaliseItem (CodAvPeso, CodInd, CodAnalise) VALUES (?, ?, ?);
            `,
          [codAvPeso, codInd, codAnalise],
          //-----------------------
          (_, { rows }) => resolve(rows._array),
          (_, error) => reject(error) // erro interno em tx.executeSql
        );
      });
    });
  });
};

const formatData = (response) => {
  const differentDescriptions = {};

  for (let i = 0; i < response.length; i++) {
    const { Titulo, DescInd, Desc, Pontuacao, CodInd, CodAvPeso } = response[i];

    if (differentDescriptions[Titulo]) {
      if (!differentDescriptions[Titulo].Desc.includes(Desc)) {
        differentDescriptions[Titulo].Desc.push(Desc);
        differentDescriptions[Titulo].Pontuacao.push(Pontuacao);
        differentDescriptions[Titulo].CodAvPeso.push(CodAvPeso);
      }
    } else {
      differentDescriptions[Titulo] = {
        CodInd: CodInd,
        Titulo: Titulo,
        DescInd: DescInd,
        CodAvPeso: [CodAvPeso],
        Desc: [Desc],
        Pontuacao: [Pontuacao],
      };
    }
  }

  return Object.values(differentDescriptions);
};

const deleteAllAnaliseItem = () => {
  return new Promise((resolve, reject) => {
    indiceDb.then((data) => {
      data.transaction((tx) => {
        //comando SQL modificável
        tx.executeSql(
            `
            DELETE FROM AnaliseItem;"
            `,
          [],
          //-----------------------
          (_, { rows }) => resolve(rows._array),
          (_, error) => reject(error) // erro interno em tx.executeSql
        );
      });
    });
  });
};

const getScore = (initialCodInd, maxCodInd, codAnalise) => {
  console.log(initialCodInd-1, (initialCodInd-1)+maxCodInd)
  return new Promise((resolve, reject) => {
    indiceDb.then((data) => {
      data.transaction((tx) => {
        //comando SQL modificável
        tx.executeSql(
            `
                SELECT SUM(Pontuacao) AS Pontuacao from AnaliseItem AI
                INNER JOIN AvaliacaoPeso AP ON AP.CodAvPeso = AI.CodAvPeso
                WHERE (AI.CodInd > ? AND AI.CodInd <= ? ) AND AI.CodAnalise = ?
            `,
          [initialCodInd-1, (initialCodInd-1)+maxCodInd, codAnalise],
          //-----------------------
          (_, { rows }) => resolve(rows._array),
          (_, error) => reject(error) // erro interno em tx.executeSql
        );
      });
    });
  });
}

function FormIndicador({ route }) {
  const [data, setData] = useState([]);
  const [score, setScore] = useState(0)
  const [updateScore, setUpdateScore] = useState(false)
  const subCat = route.params.subCategory;
  const aterroData = route.params.aterroData;
  const analiseData = route.params.analiseData;

  const loadData = async () => {
    try {
        const response = await getQuestions(subCat.name);
        const formatedData = formatData(response);
        const score = await getScore(formatedData[0].CodInd, formatedData.length, analiseData.CodAnalise)
        // console.log(formatedData);
        console.log(score[0].Pontuacao)
        
        console.log(analiseData.CodAnalise)
        setScore(score[0].Pontuacao)
        const previousAnaliseItems = await checkPreviousAnaliseItem(formatedData[0].CodInd, analiseData.CodAnalise)

        if(previousAnaliseItems.length === 0){
            formatedData.map(async (eachValue) =>{
                await createAnaliseItemRegisters(null, eachValue.CodInd, analiseData.CodAnalise)
            })
        }
        else{
            console.log("Registros de AnaliseItem já criados!!")
        }

        // await deleteAllAnaliseItem()

        setData(formatedData);
    } catch (e) {
        console.log(e)
        alert("Ocorreu um erro ao carregar as perguntas.");
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Container>
      <ScrollView>
        <Header title={subCat.name} />
        <Score scored={score} total={subCat.maxScore} />

        {data.map((eachData, index) => {
          return (
            <IndiceCard
              key={index}
              codInd={eachData.CodInd}
              title={eachData.Titulo}
              description={eachData.DescInd}
              codAvPeso={eachData.CodAvPeso}
              options={eachData.Desc}
              optionValue={eachData.Pontuacao}
              codAnalise={analiseData.CodAnalise}
              data={data}
              getScore={getScore}
              setScore={setScore}
            />
          );
        })}
      </ScrollView>
    </Container>
  );
}

export default FormIndicador;