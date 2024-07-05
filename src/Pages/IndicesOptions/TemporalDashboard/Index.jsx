// React
import React, { useEffect, useRef, useState } from 'react';
import { ScrollView } from 'react-native';

// Native Components
import { Container, Content, Description, DescriptionContent, Title, Button, TextButton, Line, ColorBox } from './Style';

import Header from '../../Components/Header/Index';
import { indiceDb } from "../../../Services/SqlTables/sqliteDb";


import { VictoryLine, VictoryChart, VictoryTheme, VictoryAxis, VictoryLabel, VictoryScatter } from "victory-native";
import { economicoInfo, socialInfoRisc, tecnicoInfo } from '../../../Configs/Fonts/IndicadorInfo';

import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import ViewShot, { captureRef } from 'react-native-view-shot';
import * as FileSystem from 'expo-file-system';

const getTemporalScores = () => {
  return new Promise((resolve, reject) => {
    indiceDb.then((data) => {
      data.transaction((tx) => {
        //comando SQL modificável
        tx.executeSql(
          `
            SELECT A1.DataIni,
            (
            SELECT SUM(Pontuacao) AS ActualScore FROM AnaliseItem AI
            INNER JOIN Analise A ON A.CodAnalise = AI.CodAnalise
            INNER JOIN AvaliacaoPeso AP ON AP.CodAvPeso = AI.CodAvPeso
            INNER JOIN Indicador I ON I.CodInd = AI.CodInd
            INNER JOIN SubCategoria SC ON I.CodSubCat = SC.CodSubCat
            INNER JOIN Categoria C ON C.CodCat = SC.CodCat
            INNER JOIN TipoIndicador TP ON TP.CodTipo = C.CodTipoInd
            WHERE AI.CodAnalise = A1.CodAnalise AND TP.DescTipo = "Técnico"
            ) AS TecScore,
            (
            SELECT SUM(Pontuacao) AS ActualScore FROM AnaliseItem AI
            INNER JOIN Analise A ON A.CodAnalise = AI.CodAnalise
            INNER JOIN AvaliacaoPeso AP ON AP.CodAvPeso = AI.CodAvPeso
            INNER JOIN Indicador I ON I.CodInd = AI.CodInd
            INNER JOIN SubCategoria SC ON I.CodSubCat = SC.CodSubCat
            INNER JOIN Categoria C ON C.CodCat = SC.CodCat
            INNER JOIN TipoIndicador TP ON TP.CodTipo = C.CodTipoInd
            WHERE AI.CodAnalise = A1.CodAnalise AND TP.DescTipo = "Econômico"
            ) AS EcoScore,
            (
            SELECT SUM(Pontuacao) AS ActualScore FROM AnaliseItem AI
            INNER JOIN Analise A ON A.CodAnalise = AI.CodAnalise
            INNER JOIN AvaliacaoPeso AP ON AP.CodAvPeso = AI.CodAvPeso
            INNER JOIN Indicador I ON I.CodInd = AI.CodInd
            INNER JOIN SubCategoria SC ON I.CodSubCat = SC.CodSubCat
            INNER JOIN Categoria C ON C.CodCat = SC.CodCat
            INNER JOIN TipoIndicador TP ON TP.CodTipo = C.CodTipoInd
            WHERE AI.CodAnalise = A1.CodAnalise AND TP.DescTipo = "Social"
            ) AS SocScore,
            (
            SELECT SUM(Pontuacao) AS Pontuacao from AnaliseItem AI
            INNER JOIN AvaliacaoPeso AP ON AP.CodAvPeso = AI.CodAvPeso
            WHERE AI.CodAnalise = A1.CodAnalise AND (AI.CodInd BETWEEN 1 AND 116)
            ) AS TotalScore
            FROM Analise A1
            ORDER BY CAST(SUBSTR(DataIni, 0, 3) AS UNSIGNED)
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

const getPercentage = (value, total) => {
  if (!value) {
    value = 0
  }

  return parseInt(((value / total) * 100).toFixed())
}

const TemporalDashboard = ({ navigation, route }) => {
  const aterroData = route.params.aterroData
  const [dataIniList, setDataIniList] = useState([""])
  const [tecScoreList, setTecScoreList] = useState([{ x: "", y: 0 }])
  const [ecoScoreList, setEcoScoreList] = useState([{ x: "", y: 0 }])
  const [socScoreList, setSocScoreList] = useState([{ x: "", y: 0 }])
  const [totalScoreList, setTotalScoreList] = useState([{ x: "", y: 0 }])

  const loadData = async () => {
    const response = await getTemporalScores()
    const auxDataIni = []
    const auxTecScore = []
    const auxEcoScore = []
    const auxSocScore = []
    const auxTotalScore = []

    response.map((eachValue) => {
      auxDataIni.push(eachValue.DataIni)

      auxTecScore.push({ x: eachValue.DataIni, y: getPercentage(eachValue.TecScore, tecnicoInfo.details.maxScore) })
      auxEcoScore.push({ x: eachValue.DataIni, y: getPercentage(eachValue.EcoScore, economicoInfo.details.maxScore) })
      auxSocScore.push({ x: eachValue.DataIni, y: getPercentage(eachValue.SocScore, socialInfoRisc.details.maxScore) })
      auxTotalScore.push({ x: eachValue.DataIni, y: getPercentage(eachValue.TotalScore, (tecnicoInfo.details.maxScore + economicoInfo.details.maxScore + socialInfoRisc.details.maxScore)) })
    })

    setDataIniList(auxDataIni)
    setTecScoreList(auxTecScore)
    setEcoScoreList(auxEcoScore)
    setSocScoreList(auxSocScore)
    setTotalScoreList(auxTotalScore)
  }

  useEffect(() => {
    try {
      loadData()
    }
    catch (e) {
      alert("Erro ao carregar gráfico")
    }
  }, [])

  const viewRef = useRef();

  const exportComponentAsPDF = async (viewRef) => {
    try {
      // Transformar View em imagem
      const uri = await captureRef(viewRef, {
        format: 'png',
        quality: 0.8,
      });

      const pdf = await Print.printToFileAsync({
        html: `<html>
                    <head>
                    <link href="https://fonts.googleapis.com/css2?family=Medula+One&display=swap" rel="stylesheet">
                    </head>
                    <body>
                    <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; margin: auto; margin-top: -20px; margin-bottom: 0; font-family: 'Poppins', sans-serif;">
                        <h1 style="font-weight: bold; font-size: 36px; margin-bottom: -10px;">Dashboard Temporal</h1>    
                        <img src="${uri}" style="width: 100%; height: 90%;" />
                    </div>
                    </body>
                </html>`,
      });

      // Função pra remover acento dos arquivos - evitar erro de exportação
      function normalizeFilename(filename) {
        return filename.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      }

      // Criar o PDF
      const newFileName = normalizeFilename(`Dashboard-Temporal-${aterroData.Nome}.pdf`);
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

  const handleExport = async () => {
    await exportComponentAsPDF(viewRef.current);
  };

  return (
    <Container>
      <Header title={`Dashboard Temporal - ${aterroData.Nome}`} />
      <Button onPress={handleExport}>
        <TextButton>Exportar Dashboard</TextButton>
      </Button>
      <ViewShot ref={viewRef} options={{ format: 'png', quality: 0.8 }}>

        <Content>
          <Title>Performance Temporal</Title>
          <Line />
          <ScrollView>
            <VictoryChart
              theme={VictoryTheme.material}
            >
              <VictoryAxis
                label="Mês do Ano"
                axisLabelComponent={<VictoryLabel dy={24} />}
              />
              <VictoryAxis
                dependentAxis
                label="Pontuação (%)"
                axisLabelComponent={<VictoryLabel dy={-24} />}
              />
              <VictoryScatter
                style={{
                  data: { fill: "#fe8a71" }
                }}
                size={5}
                data={tecScoreList}
                labels={({ datum }) => datum.y}
              />
              <VictoryLine
                style={{
                  data: { stroke: "#fe8a71" },
                  parent: { border: "1px solid #ccc" }
                }}
                categories={{
                  x: dataIniList
                }}

                animate={{
                  duration: 2000,
                  onLoad: { duration: 3000 }
                }}
                data={tecScoreList}
              />
              <VictoryScatter
                style={{
                  data: { fill: "#f6cd61" }
                }}
                size={5}
                data={ecoScoreList}
                labels={({ datum }) => datum.y}
              />
              <VictoryLine
                style={{
                  data: { stroke: "#f6cd61" },
                  parent: { border: "1px solid #ccc" }
                }}
                categories={{
                  x: dataIniList
                }}
                animate={{
                  duration: 2000,
                  onLoad: { duration: 3000 }
                }}
                data={ecoScoreList}
              />
              <VictoryScatter
                style={{
                  data: { fill: "#3da4ab" }
                }}
                size={5}
                data={socScoreList}
                labels={({ datum }) => datum.y}
              />
              <VictoryLine
                style={{
                  data: { stroke: "#3da4ab" },
                  parent: { border: "1px solid #ccc" }
                }}
                categories={{
                  x: dataIniList
                }}
                animate={{
                  duration: 2000,
                  onLoad: { duration: 3000 }
                }}
                data={socScoreList}
              />
              <VictoryScatter
                style={{
                  data: { fill: "#381704" }
                }}
                size={5}
                data={totalScoreList}
                labels={({ datum }) => datum.y}
              />
              <VictoryLine
                style={{
                  data: { stroke: "#381704" },
                  parent: { border: "1px solid #ccc" }
                }}
                categories={{
                  x: dataIniList
                }}
                animate={{
                  duration: 2000,
                  onLoad: { duration: 3000 }
                }}
                data={totalScoreList}
              />

            </VictoryChart>

            <DescriptionContent>
              <Description>Legenda: </Description>
              <Description><ColorBox color={"#381704"}>&#x2587;</ColorBox> Total</Description>
              <Description><ColorBox color={"#fe8a71"}>&#x2587;</ColorBox> Técnico</Description>
              <Description><ColorBox color={"#f6cd61"}>&#x2587;</ColorBox> Econômico</Description>
              <Description><ColorBox color={"#3da4ab"}>&#x2587;</ColorBox> Social</Description>
            </DescriptionContent>
          </ScrollView>
        </Content>

      </ViewShot>
    </Container>
  )
}

export default TemporalDashboard;