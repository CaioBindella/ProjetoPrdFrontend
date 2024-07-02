import React, { useState, useEffect } from "react";

import {
    Container,
    Button,
    Text,
    Content,
    CardContainer,
    Title,
    DashboardButton,
    TextDashboard,
} from './Style'

import { ScrollView } from "react-native";

import Header from "../../Components/Header/Index";
import Score from "../../Components/Score/Index";
import { indiceDb } from "../../../Services/SqlTables/sqliteDb";
import StarRating from "../../Components/star";

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

function Indicador({ navigation, route }) {
    const indicadorType = route.params.type
    const aterroData = route.params.aterroData
    const analiseData = route.params.analiseData
    const indicadorData = route.params.indicadorData
    const indicadorDetails = route.params.indicadorDetails
    const [selectedScore, setSelectedScore] = useState(0)
    const [scoreStar, setScoreStar] = useState(0)

    const loadScore = async () => {
        const response = await getGlobalScore(analiseData.CodAnalise, indicadorDetails.firstQuestion, indicadorDetails.lastQuestion);
        
        let ScoreAtual = ((response[0].Pontuacao / (indicadorDetails.maxScore)) * 100).toFixed();
        
        if (ScoreAtual == 0) {
            setScoreStar(0);
        } else if (ScoreAtual >= 1 && ScoreAtual < 20) {
            setScoreStar(1);
        }else if (ScoreAtual >= 20 && ScoreAtual < 40) {
            setScoreStar(2);
        } else if (ScoreAtual >= 40 && ScoreAtual < 60) {
            setScoreStar(3);
        } else if (ScoreAtual >= 60 && ScoreAtual < 80) {
            setScoreStar(4);
        } else if (ScoreAtual >= 80 && ScoreAtual <= 100) {
            setScoreStar(5);
        } else {
            setScoreStar(0);
        }

        setSelectedScore(response[0].Pontuacao)
    }

    useEffect(() => {
		// Evita renderizar dados antigos quando voltando para trás na navigation stack
		navigation.addListener('focus', () => {
		  loadScore();
		});
	}, [navigation]);


    return(
        <Container>
            <ScrollView>
                <Header title={`${indicadorType} - ${aterroData.Nome} ${analiseData.DataIni}`} />
                <Score scored={selectedScore} total={indicadorDetails.maxScore} />
                <StarRating initialRating={scoreStar}/>

                <Content>
                    <DashboardButton onPress={() => navigation.navigate('Dashboard', {
                        aterroData: aterroData, analiseData: analiseData ,indicadorType: indicadorType, indicadorDetails: indicadorDetails})}>
                        <TextDashboard>Gerar DashBoard</TextDashboard>
                    </DashboardButton>

                    {indicadorData.map((eachCategory, index) => {
                        return (
                            <CardContainer key={index}>
                                <Title>{eachCategory.category}</Title>
                                {eachCategory.subCategories.map((eachSubCategory, index) => {
                                    return (
                                        <Button key={index} onPress={() => navigation.navigate('FormIndicador', {subCategory: eachSubCategory, aterroData: aterroData, analiseData: analiseData})}>
                                            <Text>{eachSubCategory.name}</Text>
                                        </Button>
                                    )
                                })}
                            </CardContainer>
                        )
                    })}
                </Content>
            </ScrollView>

        </Container>
    );
};

export default Indicador;