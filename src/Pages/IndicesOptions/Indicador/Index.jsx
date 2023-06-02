import React, { useState, useEffect } from "react";

import {
    Container,
    Button,
    Text,
    Content,
    CardContainer,
    Title,
} from './Style'

import { ScrollView } from "react-native";

import Header from "../../Components/Header/Index";
import Score from "../../Components/Score/Index";
import { indiceDb } from "../../../Services/SqlTables/sqliteDb";

const getGlobalScore = (codAnalise) => {
    console.log(codAnalise)
    return new Promise((resolve, reject) => {
      indiceDb.then((data) => {
        data.transaction((tx) => {
          //comando SQL modificável
          tx.executeSql(
              `
                  SELECT SUM(Pontuacao) AS Pontuacao from AnaliseItem AI
                  INNER JOIN AvaliacaoPeso AP ON AP.CodAvPeso = AI.CodAvPeso
                  WHERE AI.CodAnalise = ?
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

function Indicador({ navigation, route }) {
    const indicadorType = route.params.type
    const aterroData = route.params.aterroData
    const analiseData = route.params.analiseData
    const maxScore = 638
    const [selectedScore, setSelectedScore] = useState(0)

    const loadScore = async () => {
        const response = await getGlobalScore(analiseData.CodAnalise)

        setSelectedScore(response[0].Pontuacao)
    }

    useEffect(() => {
		// Evita renderizar dados antigos quando voltando para trás na navigation stack
		navigation.addListener('focus', () => {
		  loadScore();
		});
	}, [navigation]);

    const indicadorData = [
        {
            category: "Características Locacionais",
            subCategories: [
                {name: "Características fisiográficas", maxScore: 71},
                {name: "Interface socioambiental", maxScore: 51},
                {name: "Sistema viário público de acesso", maxScore: 40},
            ]
        },
        {
            category: "Infraestrutura Implantada",
            subCategories: [
                {name: "Avaliação da infraestrutura implantada", maxScore: 72},
                {name: "Avaliação do sistema de controle implantado", maxScore: 98}
            ]
        },
        {
            category: "Condições Operacionais",
            subCategories: [
                {name: "Caracteristicas operacionais", maxScore: 104},
                {name: "Avaliação da Eficiência dos Sistemas de Controle", maxScore: 125},
                {name: "Documentos básicos e diretrizes operacionais", maxScore: 77},
            ]
        }
    ]


    return(
        <Container>
            <ScrollView>
            <Header title={`${indicadorType} - ${aterroData.Nome}`} />
            <Score scored={selectedScore} total={maxScore} />

            <Content>

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