// React
import React , { useEffect, useState } from 'react';
import { View, Text } from 'react-native';

// Native Components
import { Container, Content, Description, DescriptionContent, Title } from './Style';

import Header from '../../Components/Header/Index';
import { indiceDb } from "../../../Services/SqlTables/sqliteDb";


import { VictoryBar, VictoryChart, VictoryTheme, VictoryPolarAxis } from "victory-native";
import Score from '../../Components/Score/Index';


const getMaxScores = () => {
    return new Promise((resolve, reject) => {
      indiceDb.then((data) => {
        data.transaction((tx) => {
          //comando SQL modificável
          tx.executeSql(
              `
                SELECT DescSubCat, SUM(Pontuacao) AS MaxScore FROM Indicador I
                INNER JOIN SubCategoria SC ON SC.CodSubCat = I.CodSubCat
                INNER JOIN AvaliacaoPeso AP ON AP.CodInd = I.CodInd
                WHERE AP.Maxima = 1
                GROUP BY SC.DescSubCat
                ORDER BY SC.CodSubCat ASC
              `,
            [],
            //-----------------------
            (_, { rows }) => resolve(rows._array),
            (_, error) => reject(error) // erro interno em tx.executeSql
          );
        });
      });
    });
}

const getActualScores = () => {
  return new Promise((resolve, reject) => {
    indiceDb.then((data) => {
      data.transaction((tx) => {
        //comando SQL modificável
        tx.executeSql(
            `
            SELECT DescSubCat, SUM(Pontuacao) as ActualScore FROM AnaliseItem AI
            INNER JOIN AvaliacaoPeso AP ON AI.CodAvPeso = AP.CodAvPeso
            INNER JOIN Indicador I ON AI.CodInd = I.CodInd
            INNER JOIN SubCategoria SC ON I.CodSubCat = SC.CodSubCat
            GROUP BY DescSubCat
            `,
          [],
          //-----------------------
          (_, { rows }) => resolve(rows._array),
          (_, error) => reject(error) // erro interno em tx.executeSql
        );
      });
    });
  });
}

const Dashboard = ({ navigation, route }) => {
    const aterroData = route.params.aterroData
    const [score, setScore] = useState(Array(8).fill(0))
    const [globalScore, setGlobalScore] = useState()

    const loadData = async () => {
      const maxScores = await getMaxScores()
      const actualScores = await getActualScores()
      const technicArray = Array(8).fill(0)
      let totalScore = 0;

      actualScores.map((eachActualScore) => {
        // Pega o score máximo e o índice de acordo com o nome da subcategoria
        const maxScore = parseInt(maxScores.find(eachScore => eachScore.DescSubCat === eachActualScore.DescSubCat).MaxScore)
        const index =  parseInt(maxScores.findIndex(eachScore => eachScore.DescSubCat === eachActualScore.DescSubCat))
        const actualScore = parseInt(eachActualScore.ActualScore)
        totalScore += actualScore
        technicArray[index] = parseInt((100 * (actualScore / maxScore)).toFixed())
      })
      
      setGlobalScore(totalScore)
      setScore(technicArray)
    }

    useEffect(() => {
      loadData()  
    }, [])


  return (
    <Container>
        <Header title={`Dashboard Técnico - ${aterroData.Nome}`}/>
        <Content>
        
        <Title>Performance Geral</Title>
        <Score scored={globalScore} total={638} />

        <VictoryChart polar
            theme={VictoryTheme.material}
          >
            {
              ["1", "2", "3", "4", "5", "6", "7", "8"].map((d, i) => {
                return (
                  <VictoryPolarAxis dependentAxis
                    key={i}
                    label={d}
                    labelPlacement="perpendicular"
                    style={{ tickLabels: { fill: "none" } }}
                    axisValue={d}
                  />
                );
              })
            }
            <VictoryBar
              style={{ data: { fill: "tomato", width: 25 } }}
              data={[
                { x: "1", y: parseInt(score[0])},
                { x: "2", y: parseInt(score[1]) },
                { x: "3", y: parseInt(score[2]) },
                { x: "4", y: parseInt(score[3]) },
                { x: "5", y: parseInt(score[4]) },
                { x: "6", y: parseInt(score[5])  },
                { x: "7", y: parseInt(score[6])  },
                { x: "8", y: parseInt(score[7]) }
              ]}
            />
          </VictoryChart>

          <DescriptionContent>
              <Title>Número relacionado a Sub-área</Title>
              <Description>1: Características fisiográficas</Description>
              <Description>2: Interface socioambiental</Description>
              <Description>3: Sistema viário público de acesso</Description>
              <Description>4: Avaliação da infraestrutura implantada</Description>
              <Description>5: Avaliação do sistema de controle implantado</Description>
              <Description>6: Caracteristicas operacionais</Description>
              <Description>7: Avaliação da Eficiência dos Sistemas de Controle</Description>
              <Description>8: Documentos básicos e diretrizes operacionais</Description>
          </DescriptionContent>
        </Content>

    </Container>
)
}

export default Dashboard;