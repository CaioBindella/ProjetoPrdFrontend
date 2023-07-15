// React
import React , { useEffect } from 'react';
import { View, Text } from 'react-native';

// Native Components
import { Container, Content, Description, DescriptionContent, Title } from './Style';

import Header from '../../Components/Header/Index';
import { indiceDb } from "../../../Services/SqlTables/sqliteDb";


import { VictoryBar, VictoryChart, VictoryTheme, VictoryPolarAxis } from "victory-native";


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

    const loadData = async () => {
        const maxScores = await getMaxScores()

        console.log(maxScores)
    }
    
    useEffect(() => {
        loadData()

        
    }, [])

    const arrayDeObjetos = [
      { nome: "Objeto 1", numero: 10, taxa: 98 },
      { nome: "Objeto 2", numero: 20, taxa: 55 },
      { nome: "Objeto 3", numero: 30, taxa: 60 },
    ];


  return (
    <Container>
        <Header title={`Dashboard Técnico - ${aterroData.Nome}`}/>

        <Content>
          {/* {arrayDeObjetos.map((objeto, index) => (
            <BarChart key={index} name={objeto.nome} number={objeto.numero} taxa={objeto.taxa}/>
        ))} */}

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
                { x: "1", y: 10 },
                { x: "2", y: 25 },
                { x: "3", y: 40 },
                { x: "4", y: 50 },
                { x: "5", y: 50 },
                { x: "6", y: 30 },
                { x: "7", y: 50 },
                { x: "8", y: 30 }
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