// React
import React , { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';

// Native Components
import { Container, Content, Description, DescriptionContent, Title, Button, TextButton, Line, ColorBox } from './Style';

import Header from '../../Components/Header/Index';
import { indiceDb } from "../../../Services/SqlTables/sqliteDb";


import { VictoryLine, VictoryChart, VictoryTheme, VictoryAxis, VictoryLabel} from "victory-native";
import { economicoInfo, socialInfoRisc, tecnicoInfo } from '../../../Configs/Fonts/IndicadorInfo';


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
            ) AS SocScore
            FROM Analise A1
            ORDER BY DataIni ASC
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
  if (!value){
    value = 0
  }

  return parseInt(((value / total) * 100).toFixed())
}

const TemporalDashboard = ({ navigation, route }) => {
  const aterroData = route.params.aterroData
  const [dataIniList, setDataIniList] = useState([""])
  const [tecScoreList, setTecScoreList] = useState([{x:"", y:0}])
  const [ecoScoreList, setEcoScoreList] = useState([{x:"", y:0}])
  const [socScoreList, setSocScoreList] = useState([{x:"", y:0}])

  const loadData = async () => {
    const response = await getTemporalScores()
    const auxDataIni = []
    const auxTecScore = []
    const auxEcoScore = []
    const auxSocScore = []

    response.map((eachValue) => {
      auxDataIni.push(eachValue.DataIni)

      auxTecScore.push({x: eachValue.DataIni, y: getPercentage(eachValue.TecScore, tecnicoInfo.details.maxScore)})
      auxEcoScore.push({x: eachValue.DataIni, y: getPercentage(eachValue.EcoScore, economicoInfo.details.maxScore)})
      auxSocScore.push({x: eachValue.DataIni, y: getPercentage(eachValue.SocScore, socialInfoRisc.details.maxScore)})
    })

    setDataIniList(auxDataIni)
    setTecScoreList(auxTecScore)
    setEcoScoreList(auxEcoScore)
    setSocScoreList(auxSocScore)
  }

  useEffect(() => {
    try{
      loadData()
    }
    catch (e) {
      alert("Erro ao carregar gráfico")
    }
  }, [])

  return (
    <Container>
      <Header title={`Dashboard Temporal - ${aterroData.Nome}`}/>
      <Content>
        <Title>Performance Temporal</Title>
        <Line/>
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
            <VictoryLine
              style={{
                data: { stroke: "#fe8a71" },
                parent: { border: "1px solid #ccc"}
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
            <VictoryLine
              style={{
                data: { stroke: "#f6cd61" },
                parent: { border: "1px solid #ccc"}
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
            <VictoryLine
              style={{
                data: { stroke: "#3da4ab" },
                parent: { border: "1px solid #ccc"}
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
            
          </VictoryChart>

          <DescriptionContent>
            <Description>Legenda: </Description>
            <Description><ColorBox color={"#fe8a71"}>&#x2587;</ColorBox> Técnico</Description>
            <Description><ColorBox color={"#f6cd61"}>&#x2587;</ColorBox> Econômico</Description>
            <Description><ColorBox color={"#3da4ab"}>&#x2587;</ColorBox> Social</Description>
          </DescriptionContent>
        </ScrollView>
      </Content>

      <Button>
        <TextButton>Gerar PDF</TextButton>
      </Button>
    </Container>
)
}

export default TemporalDashboard;