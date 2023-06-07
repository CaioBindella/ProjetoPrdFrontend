// React
import React , { PureComponent, useEffect } from 'react';
import { Dimensions } from 'react-native';

// Native Components
import { Container } from './Style';

import Header from '../../Components/Header/Index';
import { indiceDb } from "../../../Services/SqlTables/sqliteDb";

import { G, Rect, Text, Svg} from "react-native-svg";

import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
  } from "react-native-chart-kit";

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

    const chartConfig = {
        backgroundGradientFrom: "#1E2923",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#08130D",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false // optional
    };

  return (
    <Container>
        <Header title={`Dashboard Técnico - ${aterroData.Nome}`}/>

            <LineChart
        data={{
        labels: ["Caracteristicas", "February", "March", "April", "May", "June"],
        datasets: [
            {
            data: [
                70,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100
            ]
            }
        ]
        }}
        width={Dimensions.get("window").width} // from react-native
        height={220}
        yAxisLabel="$"
        yAxisSuffix="k"
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
        backgroundColor: "#000000",
        backgroundGradientFrom: "#523d24",
        backgroundGradientTo: "#0b0b0a",
        decimalPlaces: 2, // optional, defaults to 2dp
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        style: {
            borderRadius: 16
        },
        propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#ffa726"
        }
        }}
        bezier
        style={{
        marginVertical: 8,
        borderRadius: 16
        }}
    />
    </Container>
);
}

export default Dashboard;