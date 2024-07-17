// React
import React, { useEffect, useRef, useState } from 'react';
import { ScrollView } from 'react-native';

// Native Components
import { Container, Content, ContentCharts, Description, DescriptionContent, Title, Button, TextButton, Line } from './Style';

import Header from '../../Components/Header/Index';
import { indiceDb } from "../../../Services/SqlTables/sqliteDb";


import { VictoryBar, VictoryChart, VictoryTheme, VictoryPolarAxis } from "victory-native";
import Score from '../../Components/Score/Index';

import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import ViewShot, { captureRef } from 'react-native-view-shot';
import * as FileSystem from 'expo-file-system';

import StarRating from '../../Components/StarRating/Index';
import { economicoInfo } from '../../../Configs/Fonts/IndicadorInfo';

const getMaxTecScores = () => {
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

const getActualTecScores = (codAnalise) => {
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
            INNER JOIN Categoria C ON SC.CodCat = C.CodCat
            INNER JOIN TipoIndicador TP ON C.CodTipoInd = TP.CodTipo
            WHERE TP.DescTipo = "Técnico"  AND AI.CodAnalise = ?
            GROUP BY DescSubCat
            `,
          [codAnalise],
          //-----------------------
          (_, { rows }) => resolve(rows._array),
          (_, error) => reject(error) // erro interno em tx.executeSql
        );
      });
    });
  });
}

const getMaxScores = (tipo, subcat) => {
  return new Promise((resolve, reject) => {
    indiceDb.then((data) => {
      data.transaction((tx) => {
        //comando SQL modificável
        tx.executeSql(
          `
            SELECT Titulo, Pontuacao AS MaxScore FROM Indicador I
            INNER JOIN SubCategoria SC ON SC.CodSubCat = I.CodSubCat
            INNER JOIN Categoria C ON C.CodCat = SC.CodCat
            INNER JOIN TipoIndicador TP ON TP.CodTipo = C.CodTipoInd
            INNER JOIN AvaliacaoPeso AP ON AP.CodInd = I.CodInd
            WHERE AP.Maxima = 1 AND TP.DescTipo = ? AND SC.DescSubCat = ?
            `,
          [tipo, subcat],
          //-----------------------
          (_, { rows }) => resolve(rows._array),
          (_, error) => reject(error) // erro interno em tx.executeSql
        );
      });
    });
  });
}

const getActualScores = (tipo, subcat, codAnalise) => {
  return new Promise((resolve, reject) => {
    indiceDb.then((data) => {
      data.transaction((tx) => {
        //comando SQL modificável
        tx.executeSql(
          `
            SELECT Titulo, Pontuacao as ActualScore FROM AnaliseItem AI
            INNER JOIN AvaliacaoPeso AP ON AI.CodAvPeso = AP.CodAvPeso
            INNER JOIN Indicador I ON AI.CodInd = I.CodInd
            INNER JOIN SubCategoria SC ON I.CodSubCat = SC.CodSubCat
            INNER JOIN Categoria C ON SC.CodCat = C.CodCat
            INNER JOIN TipoIndicador TP ON C.CodTipoInd = TP.CodTipo
            WHERE TP.DescTipo = ? AND SC.DescSubCat = ? AND AI.CodAnalise = ?
            `,
          [tipo, subcat, codAnalise],
          //-----------------------
          (_, { rows }) => resolve(rows._array),
          (_, error) => reject(error) // erro interno em tx.executeSql
        );
      });
    });
  });
}

export const getGlobalScore = (codAnalise, minInterval, maxInterval) => {
  // console.log(`Pegando Score Global entre: ${minInterval} e ${maxInterval} CodAnalise ${codAnalise}`)

  return new Promise((resolve, reject) => {
    indiceDb.then((data) => {
      data.transaction((tx) => {
        //comando SQL modificável
        tx.executeSql(
          `
                SELECT SUM(Pontuacao) AS Pontuacao from AnaliseItem AI
                INNER JOIN AvaliacaoPeso AP ON AP.CodAvPeso = AI.CodAvPeso
                WHERE AI.CodAnalise = ? AND (AI.CodInd BETWEEN ? AND ?)
            `,
          [codAnalise, minInterval, maxInterval],
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
  const indicadorDetails = route.params.indicadorDetails
  const analiseData = route.params.analiseData

  const [score, setScore] = useState(Array(8).fill(0))
  const [globalScore, setGlobalScore] = useState(0)

  //Tecnico
  const [firsttec, setFirsttec] = useState(0)
  const [sectec, setSectec] = useState(0)
  const [thirdtec, setThirdtec] = useState(0)

  //Economico
  const [firstEco, setFirstEco] = useState(0)
  const [inadimplencia, setInadimplencia] = useState([])

  //Social
  const [firstSocial, setFirstSocial] = useState(0)

  const viewShot = useRef(null);

  const exportComponentAsPDF = async () => {
    try {
      // Capture a imagem da view
      const uri = await viewShot.current.capture();
      const base64Image = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const base64DataURL = `data:image/png;base64,${base64Image}`;

      const pdf = await Print.printToFileAsync({
        html: `<html>
                <head>
                  <link href="https://fonts.googleapis.com/css2?family=Medula+One&display=swap" rel="stylesheet">
                  <style>
                    body { font-family: 'Poppins', sans-serif; margin: 0; padding: 0; }
                    .container { display: flex; flex-direction: column; justify-content: center; align-items: center; margin: 0; }
                    .image-container { width: 100%; display: flex; justify-content: center; align-items: center; }
                    .image { width: 100%; height: auto; }
                    @page { size: A4; margin: 10mm; }
                    @media print {
                      .container { page-break-inside: avoid; }
                    }
                  </style>
                </head>
                <body>
                  <div class="container">
                    <div class="image-container">
                      <img src="${base64DataURL}" class="image" />
                    </div>
                  </div>
                </body>
              </html>`,
      });

      // Função para remover acento dos arquivos - evitar erro de exportação
      function normalizeFilename(filename) {
        return filename.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      }

      // Criar o PDF
      const newFileName = normalizeFilename(`Dashboard-${tipoind}.pdf`);
      const newPath = `${FileSystem.documentDirectory}${newFileName}`;

      // Renomear o arquivo PDF
      await FileSystem.moveAsync({
        from: pdf.uri,
        to: newPath,
      });

      // Compartilhar o PDF
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(newPath);
      } else {
        console.log('Compartilhamento não possível.');
      }
    } catch (error) {
      console.error("Erro ao exportar PDF:", error);
    }
  };

  const loadScore = async () => {
    const globalPoints = await getGlobalScore(analiseData.CodAnalise, indicadorDetails.firstQuestion, indicadorDetails.lastQuestion)
    setGlobalScore(globalPoints[0].Pontuacao)
  }

  useEffect(() => {
    // Evita renderizar dados antigos quando voltando para trás na navigation stack
    navigation.addListener('focus', () => {
      loadScore();
    });
  }, [navigation]);

  const loadData = async () => {

    const technicArray = Array(8).fill(0)
    const economicArray = Array(8).fill(0)
    const socialArray = Array(15).fill(0)
    let totalScore = 0;

    switch (tipoind) {
      case 'Técnico':
        const maxTecScores = await getMaxTecScores()
        const actualTecScores = await getActualTecScores(analiseData.CodAnalise)

        actualTecScores.map((eachActualScore) => {
          // Pega o score máximo e o índice de acordo com o nome da subcategoria
          const maxScore = parseInt(maxTecScores.find(eachScore => eachScore.DescSubCat === eachActualScore.DescSubCat).MaxScore)
          const index = parseInt(maxTecScores.findIndex(eachScore => eachScore.DescSubCat === eachActualScore.DescSubCat))
          const actualScore = parseInt(eachActualScore.ActualScore)
          totalScore += actualScore
          technicArray[index] = parseInt((100 * (actualScore / maxScore)).toFixed())
        })

        //pega a pontuação de cada sub-area
        const genfirstgrouptec = ((technicArray[0] + technicArray[1] + technicArray[2]) / 3).toFixed()
        const gensecondgrouptec = ((technicArray[3] + technicArray[4]) / 2).toFixed()
        const genthirdgrouptec = ((technicArray[5] + technicArray[6] + technicArray[7]) / 3).toFixed()

        setScore(technicArray)

        setFirsttec(genfirstgrouptec)
        setSectec(gensecondgrouptec)
        setThirdtec(genthirdgrouptec)
        break;

      case 'Econômico':
        const maxEcoScores = await getMaxScores("Econômico", "Disponibilidade de Equipamentos Mínimos Obrigatórios")
        const actualEcoScores = await getActualScores("Econômico", "Disponibilidade de Equipamentos Mínimos Obrigatórios", analiseData.CodAnalise)
        const PercentInadimplencia = await getActualScores("Econômico", "Inadimplência", analiseData.CodAnalise)

        const nonZeroScores = PercentInadimplencia
          .map((item, index) => item.ActualScore < 0 ? index : null)
          .filter(index => index !== null);

        actualEcoScores.map((eachActualScore) => {
          // Pega o score máximo e o índice de acordo com o nome da subcategoria
          const maxScore = parseInt(maxEcoScores.find(eachScore => eachScore.Titulo === eachActualScore.Titulo).MaxScore)
          const index = parseInt(maxEcoScores.findIndex(eachScore => eachScore.Titulo === eachActualScore.Titulo))
          const actualScore = parseInt(eachActualScore.ActualScore)
          totalScore += actualScore
          economicArray[index] = parseInt((100 * (actualScore / maxScore)).toFixed())
        })

        switch (nonZeroScores[0]) {
          case 0:
            setInadimplencia(25);
            break;
          case 1:
            setInadimplencia(50);
            break;
          case 2:
            setInadimplencia(75);
            break;
          case 3:
            setInadimplencia(100);
            break;
        }
        setScore(economicArray)
        break;

      case 'Social':
        var maxSocialScores, actualSocialScores

        maxSocialScores = await getMaxScores("Social", "Percepção social dos impactos ambientais negativos da atividade - Análise de Risco")
        actualSocialScores = await getActualScores("Social", "Percepção social dos impactos ambientais negativos da atividade - Análise de Risco", analiseData.CodAnalise)


        actualSocialScores.map((eachActualScore) => {
          // Pega o score máximo e o índice de acordo com o nome da subcategoria
          const maxScore = parseInt(maxSocialScores.find(eachScore => eachScore.Titulo === eachActualScore.Titulo).MaxScore)
          const index = parseInt(maxSocialScores.findIndex(eachScore => eachScore.Titulo === eachActualScore.Titulo))
          const actualScore = parseInt(eachActualScore.ActualScore)
          totalScore += actualScore
          socialArray[index] = parseInt((100 * (actualScore / maxScore)).toFixed())
        })

        setScore(socialArray)
        break;
    }
  }

  let chartComponent;
  switch (tipoind) {
    case 'Técnico':
      chartComponent =
        <ContentCharts>
          <ScrollView>
            <Header title={`Dashboard Técnico - ${aterroData.Nome} - ${analiseData.DataIni}`} />
            <Button onPress={exportComponentAsPDF}>
              <TextButton>Exportar Dashboard</TextButton>
            </Button>
            <ViewShot ref={viewShot} options={{ format: 'png', quality: 0.8 }}>
              <Content>
                {/* <Title>Performance Geral</Title> */}
                <Title style={{ fontSize: 18 }}>Dashboard Técnico</Title>
                <Score scored={globalScore} total={indicadorDetails.maxScore} />
                <StarRating scored={globalScore} total={indicadorDetails.maxScore} />

                <Line style={{ marginTop: 15, marginBottom: 10 }} />
                <Title style={{ marginBottom: -40 }}>Avaliação Técnica Ambiental</Title>

                <VictoryChart
                  theme={VictoryTheme.material}
                  domainPadding={{ x: 100 }}
                >
                  <VictoryBar horizontal
                    style={{
                      data: { fill: "darkblue" }
                    }}
                    data={[{ x: "1", y: parseInt(firsttec) },
                    { x: "2", y: parseInt(sectec) },
                    { x: "3", y: parseInt(thirdtec) }
                    ]}
                  />
                </VictoryChart>

                <Description>1: Características locacionais</Description>
                <Description>2: Infra estrutura implantada</Description>
                <Description>3: Condições operacionais</Description>

                <Line />
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
                      { x: "1", y: parseInt(score[0]) },
                      { x: "2", y: parseInt(score[1]) },
                      { x: "3", y: parseInt(score[2]) },
                      { x: "4", y: parseInt(score[3]) },
                      { x: "5", y: parseInt(score[4]) },
                      { x: "6", y: parseInt(score[5]) },
                      { x: "7", y: parseInt(score[6]) },
                      { x: "8", y: parseInt(score[7]) }
                    ]}
                  />
                </VictoryChart>

                <DescriptionContent style={{ marginTop: 30 }}>
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
            </ViewShot>

          </ScrollView>
        </ContentCharts>
      break;
    case 'Econômico':
      chartComponent =
        <ContentCharts>
          <ScrollView>
            <Header title={`Dashboard Econômico - ${aterroData.Nome} - ${analiseData.DataIni}`} />
            <Button onPress={exportComponentAsPDF}>
              <TextButton>Exportar Dashboard</TextButton>
            </Button>
            <ViewShot ref={viewShot} options={{ format: 'png', quality: 0.8 }}>
              <Content>
                <Title style={{ fontSize: 18 }}>Dashboard Econômico</Title>
                <Score scored={globalScore} total={indicadorDetails.maxScore} />
                <StarRating scored={globalScore} total={indicadorDetails.maxScore} />

                <Line />
                <Title style={{ marginBottom: -30 }}>Avaliação da Disponibilidade de Equipamentos Mínimos Obrigatórios</Title>
                <VictoryChart polar
                  theme={VictoryTheme.material}
                  width={330}
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
                      { x: "1", y: parseInt(score[0]) },
                      { x: "2", y: parseInt(score[1]) },
                      { x: "3", y: parseInt(score[2]) },
                      { x: "4", y: parseInt(score[3]) },
                      { x: "5", y: parseInt(score[4]) },
                      { x: "6", y: parseInt(score[5]) },
                      { x: "7", y: parseInt(score[6]) },
                      { x: "8", y: parseInt(score[7]) }
                    ]}
                  />
                </VictoryChart>

                <DescriptionContent style={{ marginTop: -26 }}>
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
                <Line />
                <Title style={{ marginBottom: -30 }}>Avaliação da Inadimplência</Title>
                <VictoryChart
                  theme={VictoryTheme.material}
                  domainPadding={{ x: 10 }}
                  width={300}
                  height={275}
                >
                  <VictoryBar horizontal
                    style={{
                      data: { fill: "darkblue" }
                    }}
                    barWidth={40}
                    domain={{ x: [0, 3], y: [0, 100] }}
                    data={[{ x: "%", y: inadimplencia },
                    ]}
                  />
                </VictoryChart>

                <DescriptionContent>
                  <Title>Representação do nível de Inadimplência</Title>
                  <Description>25%: Inadimplência entre 5% e 25%</Description>
                  <Description>50%: Inadimplência entre 25% e 50%</Description>
                  <Description>75%: Inadimplência entre 50% e 75%</Description>
                  <Description>100%: Inadimplência acima de 75%</Description>
                </DescriptionContent>

              </Content>
            </ViewShot>
          </ScrollView>
        </ContentCharts >;
      break;
    case 'Social':
      chartComponent =
        <ContentCharts>
          <ScrollView>
            <Header title={`Dashboard Social - ${aterroData.Nome} - ${analiseData.DataIni}`} />
            <Button onPress={exportComponentAsPDF}>
              <TextButton>Exportar Dashboard</TextButton>
            </Button>
            <ViewShot ref={viewShot} options={{ format: 'png', quality: 0.8 }}>
              <Content>
                <Title style={{ fontSize: 18 }}>Dashboard Social</Title>
                <Score scored={globalScore} total={indicadorDetails.maxScore} />
                <StarRating scored={globalScore} total={indicadorDetails.maxScore} />

                <Line></Line>
                <Title style={{ marginBottom: -30 }}>Avaliação da percepção social dos impactos ambientais negativos da atividade</Title>

                <VictoryChart polar
                  theme={VictoryTheme.material}
                  width={330}
                >
                  {
                    ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15"].map((d, i) => {
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
                    style={{ data: { fill: "darkgreen", width: 15 } }}
                    data={[
                      { x: "1", y: parseInt(score[0]) },
                      { x: "2", y: parseInt(score[1]) },
                      { x: "3", y: parseInt(score[2]) },
                      { x: "4", y: parseInt(score[3]) },
                      { x: "5", y: parseInt(score[4]) },
                      { x: "6", y: parseInt(score[5]) },
                      { x: "7", y: parseInt(score[6]) },
                      { x: "8", y: parseInt(score[7]) },
                      { x: "9", y: parseInt(score[0]) },
                      { x: "10", y: parseInt(score[1]) },
                      { x: "11", y: parseInt(score[2]) },
                      { x: "12", y: parseInt(score[3]) },
                      { x: "13", y: parseInt(score[4]) },
                      { x: "14", y: parseInt(score[5]) },
                      { x: "15", y: parseInt(score[6]) },
                    ]}
                  />
                </VictoryChart>

                <DescriptionContent style={{ marginTop: -10 }}>
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
            </ViewShot>
          </ScrollView>
        </ContentCharts>
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
      </ScrollView>
    </Container>
  )
}

export default Dashboard;