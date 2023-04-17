import React, { useState, useEffect } from "react";

import {
    Container,
} from './Style'

import { ScrollView } from "react-native";

import Header from "../../../../Components/Header/Index";
import IndiceCard from "../../../../Components/IndiceCard/Index";
import { indiceDb } from "../../../../../Services/SqlTables/sqliteDb";


const getQuestions = () => {
    return new Promise((resolve, reject) => {
    indiceDb.then((data) => {
        data.transaction((tx) => {
        //comando SQL modificável
        tx.executeSql(
            `
                SELECT I.Titulo, I.DescInd
                from Categoria C
                INNER JOIN SubCategoria SC ON SC.CodCat = C.CodCat
                INNER JOIN Indicador I ON I.CodSubCat = SC.CodSubCat
                WHERE SC.DescSubCat = "Características fisiográficas"
            `,
            [],
            //-----------------------
            (_, { rows }) => resolve(rows._array),
            (_, error) => reject(error) // erro interno em tx.executeSql
        );
        });
    });
    })
};


function CaractLocacionais() {
    const [data, setData] = useState([])

    const loadData = async () => {
        const response = await getQuestions()
        setData(response)
    }

    useEffect(() =>{
        loadData()
    }, [])

    return(
        <Container>
            <ScrollView>
            <Header title="Índice Técnico - Características Locacionais" />
                
            {data.map((eachData, index) => {
                console.log(eachData)
                return (<IndiceCard key={index} title={eachData.Titulo} description={eachData.DescInd}/>)
            })}
                
            </ScrollView>
        </Container>
    );
};

export default CaractLocacionais;