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
import { indiceDb } from "../../../Services/SqlTables/sqliteDb";

function IndicadorTecnico({navigation}) {

    const [currentDate, setCurrentDate] = useState('');

    const indicadorData = [
        {
            category: "Características Locacionais",
            subCategories: [
                "Características fisiográficas",
                "Interface socioambiental",
                "Sistema viário público de acesso"
            ]
        },
        {
            category: "Infraestrutura Implantada",
            subCategories: [
                "Avaliação da infraestrutura implantada",
                "Avaliação do sistema de controle implantado"
            ]
        },
        {
            category: "Condições Operacionais",
            subCategories: [
                "Caracteristicas operacionais",
                "Avaliação da Eficiência dos Sistemas de Controle",
                "Documentos básicos e diretrizes operacionais"
            ]
        }
    ]

    const createAnalysis = (initialDate) => {
        return new Promise((resolve, reject) => {
        indiceDb.then((data) => {
            data.transaction((tx) => {
            //comando SQL modificável
            tx.executeSql(
                `
                INSERT INTO Analise (DataIni) VALUES (?);
                `,
                [initialDate],
                //-----------------------
                (_, { rows }) => resolve(rows._array),
                (_, error) => reject(error) // erro interno em tx.executeSql
            );
            });
        });
        })
    };

    useEffect(() => {
        // const handleButtonPress = async () => {
        //     const date = new Date();
        //     await createAnalysis(date.toLocaleString())
        //     // setCurrentDate(date.toLocaleString());   
        // }


    })

    return(
        <Container>
            <ScrollView>
            <Header title="Índice Técnico" />
                
            <Content>

                {indicadorData.map((eachCategory, index) => {
                    return (
                        <CardContainer key={index}>
                            <Title>{eachCategory.category}</Title>
                            {eachCategory.subCategories.map((eachSubCategory, index) => {
                                return (
                                    <Button key={index} onPress={() => navigation.navigate('FormIndicador', {subCategory: eachSubCategory})}>
                                        <Text>{eachSubCategory}</Text>
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

export default IndicadorTecnico;