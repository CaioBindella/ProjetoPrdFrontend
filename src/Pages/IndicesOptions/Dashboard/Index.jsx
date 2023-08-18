// React
import React , { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';

// Native Components
import { Container, Content, ContentCharts, Description, DescriptionContent, Title, Button, TextButton, Line } from './Style';

import Header from '../../Components/Header/Index';
import { indiceDb } from "../../../Services/SqlTables/sqliteDb";


import { VictoryBar, VictoryChart, VictoryTheme, VictoryPolarAxis, VictoryPie } from "victory-native";
import Score from '../../Components/Score/Index';

import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';

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
    const tipoind = route.params.indicadorType
    const [score, setScore] = useState(Array(8).fill(0))
    const [globalScore, setGlobalScore] = useState()

    const [firsttec , setFirsttec] = useState()
    const [sectec , setSectec] = useState()
    const [thirdtec , setThirdtec] = useState()

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
      
      //pega a pontuação de cada sub-area
      const firstgrouptec = ((technicArray[0] + technicArray[1] + technicArray[2])/3).toFixed()
      const secondgrouptec = ((technicArray[3] + technicArray[4])/2).toFixed()
      const thirdgrouptec = ((technicArray[5] + technicArray[6] + technicArray[7])/3).toFixed()

      console.log(firstgrouptec)
      console.log(secondgrouptec)
      console.log(thirdgrouptec)
      setGlobalScore(totalScore)
      setScore(technicArray)
      
      setFirsttec(firstgrouptec)
      setSectec(secondgrouptec)
      setThirdtec(thirdgrouptec)
    }

    let chartComponent;
      switch (tipoind) {
        case 'Técnico':
          chartComponent = 
            <ContentCharts> 
              <ScrollView>
              <Header title={`Dashboard Técnico - ${aterroData.Nome}`}/>
              <Content>
              <Title>Performance Geral</Title>
              <Score scored={globalScore} total={638} />

              <Line/>
              <Title>Avaliação Técnica Ambiental</Title>

              <VictoryChart
                theme={VictoryTheme.material}
                domainPadding={{ x: 100 }}
              >
                <VictoryBar horizontal
                  style={{
                    data: { fill: "darkblue" }
                  }}
                  // data={[   { x: "1", y: parseInt(firsttec)},
                  //           { x: "2", y: parseInt(sectec) },
                  //           { x: "3", y: parseInt(thirdtec) }
                  //         ]}
                />
              </VictoryChart>

              <Line/> 
              <Title>Avaliação da Sub-área</Title>            
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
            </ScrollView>
            </ContentCharts>
          break;
        case 'Econômico':
          chartComponent = 
            <ContentCharts>
              <ScrollView>
              <Header title={`Dashboard Técnico - ${aterroData.Nome}`}/>
              <Content>
              <Line/> 
              <Title>Avaliação da Disponibilidade de Equipamentos Mínimos Obrigatórios</Title>            
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
                    style={{ data: { fill: "purple", width: 25 } }}
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
                    <Title>Número relacionado a Sub-ítem</Title>
                    <Description>1: Trator Esteira D6K 13,4t 125HP</Description>
                    <Description>2: Escavadeira 90HP</Description>
                    <Description>3: Caminhão Tanque</Description>
                    <Description>4: Compactador de solo 130HP</Description>
                    <Description>5: Moto nivelador 125HP</Description>
                    <Description>6: Carregadeira de rodas 128HP</Description>
                    <Description>7: Disponibilidade de Lâmina Raspadora</Description>
                    <Description>8: CMO Praticado em função do Porte</Description>
                </DescriptionContent>
                <Line/>
                <Title>Avaliação da Inadimplência</Title>
                <VictoryChart
                theme={VictoryTheme.material}
                domainPadding={{ x: 10 }}
              >
                <VictoryBar horizontal
                  style={{
                    data: { fill: "darkblue" }
                  }}
                  barWidth={40}
                  domain={{x: [0, 3], y: [0, 100]}}
                  data={[   { x: "%", y: 75},   
                          ]}
                />
              </VictoryChart>

              </Content>
              </ScrollView>
            </ContentCharts>;
          break;
        case 'Social':
          chartComponent = 
          <ContentCharts>
            <ScrollView>
              <Header title={`Dashboard Técnico - ${aterroData.Nome}`}/>
              <Content>
                
              <Title>Avaliação da percepção social dos impactos ambientais negativos da atividade</Title>  
              
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
                    style={{ data: { fill: "purple", width: 25 } }}
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
                    <Title>Número relacionado a Sub-ítem</Title>
                    <Description>1: Foi percebido cheiro de lixo nas redondezas do aterro ?</Description>
                    <Description>2: Foi percebido barulho de caminhões transitando no entorno do aterro?</Description>
                    <Description>3: Foi percebida fumaça oriunda de caminhões transitando no entorno do aterro?</Description>
                    <Description>4: Foi constatada a presença de resíduos volantes oriundos dos caminhões?</Description>
                    <Description>5: Foi constatada fila de caminhões no acesso à balança do aterro?</Description>
                    <Description>6: Foi constatado chorume oriundo dos caminhões no entorno do aterro?</Description>
                    <Description>7: Foi percebido barulho do maquinário pesado da operação do aterro na entorno do aterro? </Description>
                    <Description>8: Foi percebido o aumento de poeira e material particulado no interior das resídências devido ao trânsito de caminhões no  entorno do aterro?</Description>
                    <Description>9: Foi constatada aproliferação de ratos e outros vetores terrestres após a instalação do aterro?</Description>
                    <Description>10: Foi constatada alteração de odor/sabor caracteristico na água de poço após a instalação do aterro?</Description>
                    <Description>11: Foi constatada aproliferação de moscas e outros vetores aéreos após a instalação do aterro?</Description>
                    <Description>12: Quantos entrevistados afirmaram haver, ao menos, 3 benefícios em função das operações normais do aterro?</Description>
                    <Description>13: Quanto à duração dos impacos constatdos, quantos foram considerados constantes?</Description>
                    <Description>14: Quanto à frequência dos impacos constatdos, quantos foram considerados diários?</Description>
                    <Description>15: Quantos entrevistados afirmaram haver, ao menos, 3 prejuizos ao bem-estar em função das operações normais do aterro?</Description>
                </DescriptionContent>

              </Content>
              </ScrollView>
            </ContentCharts>; 
          break;
        default:
          chartComponent = null;
          break;
      }

    useEffect(() => {
      loadData()  
    }, [])


  return (
    <Container>
      <ScrollView>
        {chartComponent}
        <Button>
          <TextButton>Gerar PDF</TextButton>
        </Button>
      </ScrollView>
    </Container>
)
}

export default Dashboard;