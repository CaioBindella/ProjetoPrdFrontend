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
                  data={[   { x: "1", y: parseInt(firsttec)},
                            { x: "2", y: parseInt(sectec) },
                            { x: "3", y: parseInt(thirdtec) }
                          ]}
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
                <VictoryPie
                  padAngle={({ datum }) => datum.y}
                  innerRadius={100}
                  colorScale={["tomato", "orange", "gold", "cyan", "navy" ]}
                />

                <DescriptionContent>
                    <Title>Letra relacionada ao Percentual do CMO Estimado diário</Title>
                    <Description>A: Escavadeira 90HP</Description>
                    <Description>B: Caminhão tanque (18.000l)</Description>
                    <Description>C: Trator Esteira D6K 13,4t 125HP </Description>
                    <Description>D: Compactador de solo 130HP</Description>
                    <Description>E: Outros</Description>
                </DescriptionContent>
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
                
              <Title>Impactos Positivos</Title>  
              <VictoryPie
                data={[
                  { x: 1, y: 2, label: "A" },
                  { x: 2, y: 3, label: "B" },
                  { x: 3, y: 4, label: "C" },
                  { x: 4, y: 5, label: "D" }
                ]}
                colorScale={["purple", "darkblue", "darkred", "green" ]}
              />

              <DescriptionContent>
                  <Title>Letra relacionada aos Impactos Positivos Identificados:</Title>
                  <Description>A: Sinalização</Description>
                  <Description>B: Melhorias(Vias)</Description>
                  <Description>C: Contratação</Description>
                  <Description>D: Educação</Description>
              </DescriptionContent>
              
              <Title>Impactos Negativos</Title>
              <VictoryPie
                data={[
                  { x: 1, y: 2, label: "A" },
                  { x: 2, y: 3, label: "B" },
                  { x: 3, y: 4, label: "C" },
                  { x: 4, y: 5, label: "D" }
                ]}
                colorScale={["lightblue", "cyan", "darkred", "grey" ]}
              />

              <DescriptionContent>
                  <Title>Letra relacionada aos Impactos Positivos Identificados:</Title>
                  <Description>A: Sinalização</Description>
                  <Description>B: Melhorias(Vias)</Description>
                  <Description>C: Contratação</Description>
                  <Description>D: Educação</Description>
              </DescriptionContent>
              </Content>
              </ScrollView>
            </ContentCharts>; 
          break;
        default:
          chartComponent = null;
          break;
      }

    const html = `
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
      </head>
      <body style="text-align: center;">
        <h1 style="font-size: 50px; font-family: Helvetica Neue; font-weight: normal;">
          Hello Expo!
        </h1>
        <img
          src="https://d30j33t1r58ioz.cloudfront.net/static/guides/sdk.png"
          style="width: 90vw;" />
      </body>
    </html>
    `;


    const printToFile = async () => {
      // On iOS/android prints the given html. On web prints the HTML from the current page.
      const { uri } = await Print.printToFileAsync({ html });
      console.log('File has been saved to:', uri);
      await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
    };

    useEffect(() => {
      loadData()  
    }, [])


  return (
    <Container>
      <ScrollView>
        {chartComponent}

        <Button onPress={printToFile}>
          <TextButton>Gerar PDF</TextButton>
        </Button>
      </ScrollView>
    </Container>
)
}

export default Dashboard;