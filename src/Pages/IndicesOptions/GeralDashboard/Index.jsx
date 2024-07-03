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

import { tecnicoInfo, economicoInfo } from '../../../Configs/Fonts/IndicadorInfo';

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

    const viewRef = useRef();
    const exportComponentAsPDF = async (viewRef) => {
        try {
            // Transformar View em imagem
            const uri = await captureRef(viewRef, {
                format: 'png',
                quality: 0.8,
            });

            // Gerar PDF da imagem
            // PDF DE UMA PAGINA
            // const pdf = await Print.printToFileAsync({
            //   html: `<div style="display: flex; flex-direction: column; justify-content: center; align-items: center; width: 210mm; height: 297mm; margin: auto; margin-top: -80; margin-bottom: 0; font-family: Poppins">
            //           <h1 style="font-weight: bold; font-size: 24;">Dashboard ${tipoind} - ${aterroData.Nome} - ${analiseData.DataIni}</h1>    
            //           <img src="${uri}" style="width: 50%; height: 75%;" />
            //          </div>`,
            // });

            const pdf = await Print.printToFileAsync({
                html: `<html>
                    <head>
                    <link href="https://fonts.googleapis.com/css2?family=Medula+One&display=swap" rel="stylesheet">
                    </head>
                    <body>
                    <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; margin: auto; margin-top: -20px; margin-bottom: 0; font-family: 'Poppins', sans-serif;">
                        <h1 style="font-weight: bold; font-size: 36px; margin-bottom: -10px;">Dashboard ${tipoind} - ${analiseData.DataIni}</h1>    
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
            const newFileName = normalizeFilename(`Dashboard-${tipoind}-${analiseData.DataIni}.pdf`);
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

    const loadData = async () => {
        const technicArray = Array(8).fill(0);
        // const economicArray = Array(8).fill(0);
        // const socialArray = Array(15).fill(0);

        let totalScore = 0;

        // Lógica para pegar a pontuação do técnico
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

        setGlobalScore(totalScore)
        setScoreTec(technicArray)

        setFirsttec(genfirstgrouptec)
        setSectec(gensecondgrouptec)
        setThirdtec(genthirdgrouptec)

        // // Lógica para pegar a pontuação do econômico
        // const maxEcoScores = await getMaxScores("Econômico", "Disponibilidade de Equipamentos Mínimos Obrigatórios")
        // const actualEcoScores = await getActualScores("Econômico", "Disponibilidade de Equipamentos Mínimos Obrigatórios", analiseData.CodAnalise)
        // const PercentInadimplencia = await getActualScores("Econômico", "Inadimplência", analiseData.CodAnalise)

        // const nonZeroScores = PercentInadimplencia
        //     .map((item, index) => item.ActualScore < 0 ? index : null)
        //     .filter(index => index !== null);

        // actualEcoScores.map((eachActualScore) => {
        //     // Pega o score máximo e o índice de acordo com o nome da subcategoria
        //     const maxScore = parseInt(maxEcoScores.find(eachScore => eachScore.Titulo === eachActualScore.Titulo).MaxScore)
        //     const index = parseInt(maxEcoScores.findIndex(eachScore => eachScore.Titulo === eachActualScore.Titulo))
        //     const actualScore = parseInt(eachActualScore.ActualScore)
        //     totalScore += actualScore
        //     economicArray[index] = parseInt((100 * (actualScore / maxScore)).toFixed())
        // })

        // switch (nonZeroScores[0]) {
        //     case 0:
        //         setInadimplencia(25);
        //         break;
        //     case 1:
        //         setInadimplencia(50);
        //         break;
        //     case 2:
        //         setInadimplencia(75);
        //         break;
        //     case 3:
        //         setInadimplencia(100);
        //         break;
        // }

        // setGlobalScore(totalScore)
        // setScoreEco(economicArray)
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
                    <Title style={{ marginTop: 10 }}>Indicador Técnico</Title>
                    <Content>
                        <Title>Performance Geral</Title>
                        <Score scored={globalScore} total={tecnicoInfo.details.maxScore} />

                        <Line />
                        <Title>Avaliação Técnica Ambiental</Title>

                        <VictoryChart
                            theme={VictoryTheme.material}
                            domainPadding={{ x: 100 }}
                            height={300}
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

                        <Line style={{ marginTop: 20 }} />
                        <Title style={{ marginVertical: 5 }}>Avaliação da Sub-área</Title>
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
                    <Title style={{ marginVertical: 10 }}>Indicador Econômico</Title>
                    <Content>
                        <Score scored={globalScore} total={economicoInfo.details.maxScore} />
                        <Line style={{ marginTop: 20, marginBottom: 15 }} />
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

                        <DescriptionContent style={{ marginTop: 8 }}>
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
                            height={300}
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

                    </Content>
                    {/* <Title style={{ marginVertical: 10 }}>Indicador Social</Title>
                    <Content>
                        <Score scored={globalScore} total={indicadorDetails.maxScore} />
                        <Line />
                        <Title style={{ marginBottom: -20 }}>Avaliação da Disponibilidade de Equipamentos Mínimos Obrigatórios</Title>
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

                        <DescriptionContent style={{ marginTop: -30 }}>
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
                        <Line style={{ marginTop: 0, marginBottom: 0 }} />
                        <Title style={{ marginBottom: -20 }}>Avaliação da Inadimplência</Title>
                        <VictoryChart
                            theme={VictoryTheme.material}
                            domainPadding={{ x: 10 }}
                            height={300}
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

                    </Content> */}
                </ViewShot>

            </ScrollView>
        </ContentCharts>
    )
}

export default GeralDashboard;