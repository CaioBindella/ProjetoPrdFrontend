// React
import React , { useEffect } from 'react';
import { View, Text } from 'react-native';

// Native Components
import { Container, Content } from './Style';

import Header from '../../Components/Header/Index';
import { indiceDb } from "../../../Services/SqlTables/sqliteDb";

import BarChart from "../HorizontalBarChart/Index";


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

    const arrayDeObjetos = [
      { nome: "Objeto 1", numero: 10, taxa: 98 },
      { nome: "Objeto 2", numero: 20, taxa: 93 },
      { nome: "Objeto 3", numero: 30, taxa: 60 },
    ];


  return (
    <Container>
        <Header title={`Dashboard Técnico - ${aterroData.Nome}`}/>

        <Content>
          {arrayDeObjetos.map((objeto, index) => (
            <BarChart key={index} name={objeto.nome} number={objeto.numero} taxa={objeto.taxa}/>
        ))}
        </Content>

    </Container>
)
}

export default Dashboard;