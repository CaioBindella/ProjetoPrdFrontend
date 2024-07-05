// React
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';

// Native Components
import { Container, Content, ContentCharts, Description, DescriptionContent, Title, Button, TextButton, Line } from './Style';

import Header from '../../Components/Header/Index';
import { indiceDb } from "../../../Services/SqlTables/sqliteDb";

import { VictoryBar, VictoryChart, VictoryTheme, VictoryPolarAxis, VictoryPie } from "victory-native";
import Score from '../../Components/Score/Index';

import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import ViewShot, { captureRef } from 'react-native-view-shot';
import * as FileSystem from 'expo-file-system';

import { tecnicoInfo, economicoInfo, socialInfoRisc } from '../../../Configs/Fonts/IndicadorInfo';
import StarRating from '../../Components/star';

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

const GeralDashboard = ({ navigation, route }) => {
    const aterroData = route.params.aterroData;
    const analiseData = route.params.analiseData;

    const [globalScore, setGlobalScore] = useState();

    const [scoreTec, setScoreTec] = useState(Array(8).fill(0));
    const [scoreEco, setScoreEco] = useState(Array(8).fill(0));
    const [scoreSocial, setScoreSocial] = useState(Array(8).fill(0));

    //Tecnico
    const [firsttec, setFirsttec] = useState(0);
    const [sectec, setSectec] = useState(0);
    const [thirdtec, setThirdtec] = useState(0);

    //Economico
    const [firstEco, setFirstEco] = useState(0)
    const [inadimplencia, setInadimplencia] = useState([])

    // Estrelas
    const [selectedScore, setSelectedScore] = useState(0)
    const [scoreStar, setScoreStar] = useState(0)

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
                        <h1 style="font-weight: bold; font-size: 36px; margin-bottom: -10px;">Dashboard Geral - ${analiseData.DataIni}</h1>    
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
            const newFileName = normalizeFilename(`Dashboard-Geral-${analiseData.DataIni}.pdf`);
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

    // STARS

    const loadScore = async () => {
        var response
        response = await getGlobalScore(analiseData.CodAnalise, tecnicoInfo.details.firstQuestion, socialInfoRisc.details.lastQuestion)

        let ScoreAtual = ((response[0].Pontuacao / (tecnicoInfo.details.maxScore + economicoInfo.details.maxScore + socialInfoRisc.details.maxScore)) * 100).toFixed()
        console.log(ScoreAtual)
        if (ScoreAtual <= 50) {
            setScoreStar(0);
        } else if (ScoreAtual > 50 && ScoreAtual <= 60) {
            setScoreStar(1);
        } else if (ScoreAtual > 60 && ScoreAtual <= 70) {
            setScoreStar(2);
        } else if (ScoreAtual > 70 && ScoreAtual <= 80) {
            setScoreStar(3);
        } else if (ScoreAtual > 80 && ScoreAtual <= 90) {
            setScoreStar(4);
        } else if (ScoreAtual > 90 && ScoreAtual <= 100) {
            setScoreStar(5);
        } else {
            setScoreStar(0);
        }

        setSelectedScore(response[0].Pontuacao)
    }

    const deleteData = async () => {
        await excluir(analiseData.CodAnalise, 'analise')
    }


    useEffect(() => {
        loadScore()
    }, [])

    const loadData = async () => {
        const technicArray = Array(8).fill(0);
        const economicArray = Array(8).fill(0);
        const socialArray = Array(15).fill(0);

        let tecTotalScore = 0;
        let ecoTotalScore = 0;
        let socialTotalScore = 0;

        // Lógica para pegar a pontuação do técnico
        const maxTecScores = await getMaxTecScores()
        const actualTecScores = await getActualTecScores(analiseData.CodAnalise)

        actualTecScores.map((eachActualScore) => {
            // Pega o score máximo e o índice de acordo com o nome da subcategoria
            const maxScore = parseInt(maxTecScores.find(eachScore => eachScore.DescSubCat === eachActualScore.DescSubCat).MaxScore)
            const index = parseInt(maxTecScores.findIndex(eachScore => eachScore.DescSubCat === eachActualScore.DescSubCat))
            const actualScore = parseInt(eachActualScore.ActualScore)
            tecTotalScore += actualScore
            technicArray[index] = parseInt((100 * (actualScore / maxScore)).toFixed())
        })

        //pega a pontuação de cada sub-area
        const genfirstgrouptec = ((technicArray[0] + technicArray[1] + technicArray[2]) / 3).toFixed()
        const gensecondgrouptec = ((technicArray[3] + technicArray[4]) / 2).toFixed()
        const genthirdgrouptec = ((technicArray[5] + technicArray[6] + technicArray[7]) / 3).toFixed()

        setScoreTec(technicArray)

        setFirsttec(genfirstgrouptec)
        setSectec(gensecondgrouptec)
        setThirdtec(genthirdgrouptec)

        console.log(`Porcentagem Técnico: ${(tecTotalScore / tecnicoInfo.details.maxScore) * 100} %`)

        // Lógica para pegar a pontuação do econômico
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
            ecoTotalScore += actualScore
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

        setScoreEco(economicArray)

        console.log(`Porcentagem Econômico: ${(ecoTotalScore / economicoInfo.details.maxScore) * 100} %`)

        // Lógica para pegar a pontuação do social
        maxSocialScores = await getMaxScores("Social", "Percepção social dos impactos ambientais negativos da atividade - Entrevista")
        actualSocialScores = await getActualScores("Social", "Percepção social dos impactos ambientais negativos da atividade - Entrevista", analiseData.CodAnalise)

        actualSocialScores.map((eachActualScore) => {
            // Pega o score máximo e o índice de acordo com o nome da subcategoria
            const maxScore = parseInt(maxSocialScores.find(eachScore => eachScore.Titulo === eachActualScore.Titulo).MaxScore)
            const index = parseInt(maxSocialScores.findIndex(eachScore => eachScore.Titulo === eachActualScore.Titulo))
            const actualScore = parseInt(eachActualScore.ActualScore)
            socialTotalScore += actualScore
            socialArray[index] = parseInt((100 * (actualScore / maxScore)).toFixed())
        })

        console.log(`Porcentagem Social: ${(socialTotalScore / socialInfoRisc.details.maxScore) * 100} %`)

        setGlobalScore(tecTotalScore + ecoTotalScore + socialTotalScore)
        setScoreSocial(socialArray)

        console.log(`Porcentagem Geral: ${((tecTotalScore + ecoTotalScore + socialTotalScore) / (tecnicoInfo.details.maxScore + economicoInfo.details.maxScore + socialInfoRisc.details.maxScore)) * 100} %`)
    }

    useEffect(() => {
        loadData();
    }, []);

    return (
        <ContentCharts>
            <ScrollView>
                <Header title={`Dashboard Geral - ${aterroData.Nome} - ${analiseData.DataIni}`} />
                <Button onPress={handleExport}>
                    <TextButton>Exportar Dashboard</TextButton>
                </Button>
                <ViewShot ref={viewRef} options={{ format: 'png', quality: 0.8 }}>
                    <Content>
                        {/* <Title>Performance Geral</Title> */}
                        <Score scored={globalScore} total={tecnicoInfo.details.maxScore + economicoInfo.details.maxScore + socialInfoRisc.details.maxScore} />
                        {/* <Line /> */}
                        <StarRating initialRating={scoreStar} />
                        <Line style={{ marginTop: 20, marginBottom: 15 }} />

                        <Title>Indicador Técnico</Title>

                        <Line />
                        <Title style={{ marginTop: 5, marginBottom: -25 }}>Avaliação Técnica Ambiental</Title>

                        <VictoryChart
                            theme={VictoryTheme.material}
                            domainPadding={{ x: 100 }}
                            width={300}
                            height={275}
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

                        <Description style={{ marginTop: 10 }}>1: Características locacionais</Description>
                        <Description>2: Infra estrutura implantada</Description>
                        <Description style={{ marginBottom: 5 }}>3: Condições operacionais</Description>

                        <Line style={{ marginTop: 20 }} />
                        <Title style={{ marginVertical: 5 }}>Avaliação da Sub-área</Title>
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
                                style={{ data: { fill: "tomato", width: 25 } }}
                                data={[
                                    { x: "1", y: parseInt(scoreTec[0]) },
                                    { x: "2", y: parseInt(scoreTec[1]) },
                                    { x: "3", y: parseInt(scoreTec[2]) },
                                    { x: "4", y: parseInt(scoreTec[3]) },
                                    { x: "5", y: parseInt(scoreTec[4]) },
                                    { x: "6", y: parseInt(scoreTec[5]) },
                                    { x: "7", y: parseInt(scoreTec[6]) },
                                    { x: "8", y: parseInt(scoreTec[7]) }
                                ]}
                            />
                        </VictoryChart>

                        <DescriptionContent style={{ marginTop: 10 }}>
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
                        <Line style={{ marginTop: 30, marginBottom: 15 }} />
                        <Title>Indicador Econômico</Title>
                        <Line style={{ marginTop: 20, marginBottom: 40 }} />
                        <Title style={{ marginBottom: 10 }}>Avaliação da Disponibilidade de Equipamentos Mínimos Obrigatórios</Title>
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
                                    { x: "1", y: parseInt(scoreEco[0]) },
                                    { x: "2", y: parseInt(scoreEco[1]) },
                                    { x: "3", y: parseInt(scoreEco[2]) },
                                    { x: "4", y: parseInt(scoreEco[3]) },
                                    { x: "5", y: parseInt(scoreEco[4]) },
                                    { x: "6", y: parseInt(scoreEco[5]) },
                                    { x: "7", y: parseInt(scoreEco[6]) },
                                    { x: "8", y: parseInt(scoreEco[7]) }
                                ]}
                            />
                        </VictoryChart>

                        <DescriptionContent style={{ marginTop: 0 }}>
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
                        <Title style={{ marginBottom: -10 }}>Avaliação da Inadimplência</Title>
                        <VictoryChart
                            theme={VictoryTheme.material}
                            domainPadding={{ x: 10 }}
                            width={300}
                            height={275}
                            style={{ marginTop: -20 }}
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

                        <Line style={{ marginTop: 50, marginBottom: 15 }} />
                        <Title>Indicador Social</Title>
                        <Line style={{ marginTop: 20, marginBottom: 15 }} />

                        <Title style={{ marginBottom: -20 }}>Avaliação da Disponibilidade de Equipamentos Mínimos Obrigatórios</Title>
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
                                    { x: "1", y: parseInt(scoreSocial[0]) },
                                    { x: "2", y: parseInt(scoreSocial[1]) },
                                    { x: "3", y: parseInt(scoreSocial[2]) },
                                    { x: "4", y: parseInt(scoreSocial[3]) },
                                    { x: "5", y: parseInt(scoreSocial[4]) },
                                    { x: "6", y: parseInt(scoreSocial[5]) },
                                    { x: "7", y: parseInt(scoreSocial[6]) },
                                    { x: "8", y: parseInt(scoreSocial[7]) }
                                ]}
                            />
                        </VictoryChart>

                        <DescriptionContent style={{ marginTop: 10 }}>
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
                        <Line style={{ marginTop: 20, marginBottom: 0 }} />
                        <Title style={{ marginBottom: -20, marginTop: 10 }}>Avaliação da Inadimplência</Title>
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

                        <DescriptionContent style={{ marginTop: 10 }}>
                            <Title>Representação do nível de Inadimplência</Title>
                            <Description>25%: Inadimplência entre 5% e 25%</Description>
                            <Description>50%: Inadimplência entre 25% e 50%</Description>
                            <Description>75%: Inadimplência entre 50% e 75%</Description>
                            <Description>100%: Inadimplência acima de 75%</Description>
                        </DescriptionContent>

                    </Content>
                </ViewShot>

            </ScrollView>
        </ContentCharts>
    )
}

export default GeralDashboard;