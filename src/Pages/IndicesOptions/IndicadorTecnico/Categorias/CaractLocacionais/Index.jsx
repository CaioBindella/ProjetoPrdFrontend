import React, { useState, useEffect } from "react";

import {
    Container,
} from './Style'

import { ScrollView } from "react-native";

import Header from "../../../../Components/Header/Index";
import IndiceCard from "../../../../Components/IndiceCard/Index";
import { indiceDb } from "../../../../../Services/SqlTables/sqliteDb";


const getQuestions = (subcat) => {
    return new Promise((resolve, reject) => {
    indiceDb.then((data) => {
        data.transaction((tx) => {
        //comando SQL modificável
        tx.executeSql(
            `
                SELECT I.Titulo, I.DescInd, A.Desc
                from Categoria C
                INNER JOIN SubCategoria SC ON SC.CodCat = C.CodCat
                INNER JOIN Indicador I ON I.CodSubCat = SC.CodSubCat
                INNER JOIN AvaliacaoPeso AP ON AP.CodInd = I.CodInd
                INNER JOIN Avaliacao A ON A.CodAval = AP.CodAval
                WHERE SC.DescSubCat = "${subcat}"
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
        const response = await getQuestions("Características fisiográficas")

        const differentDescriptions = {};

        for (let i = 0; i < response.length; i++) {
            const { Titulo, DescInd, Desc} = response[i];
            
            if (differentDescriptions[Titulo]) {
                if (!differentDescriptions[Titulo].Desc.includes(Desc)) {
                    differentDescriptions[Titulo].Desc.push(Desc);
                }
            } else {
                differentDescriptions[Titulo] = {
                    Titulo: Titulo,
                    DescInd: DescInd,
                    Desc: [Desc],
                };
            }
        }

        setData(Object.values(differentDescriptions))
    }

    useEffect(() =>{
        loadData()
    }, [])

    return(
        <Container>
            <ScrollView>
            <Header title="Índice Técnico - Características Locacionais" />
                
            {data.map((eachData, index) => {
                return (<IndiceCard key={index} title={eachData.Titulo} description={eachData.DescInd} options={eachData.Desc} optionValue={[1, 2, 3]}/>)
            })}
                
            </ScrollView>
        </Container>
    );
};

export default CaractLocacionais;