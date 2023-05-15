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

function Indicador({ navigation, route }) {
    const indicadorType = route.params.type

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
            <Header title={indicadorType} />
                
            <Content>

                {indicadorData.map((eachCategory, index) => {
                    return (
                        <CardContainer key={index}>
                            <Title>{eachCategory.category}</Title>
                            {eachCategory.subCategories.map((eachSubCategory, index) => {
                                return (
                                    <Button key={index} onPress={() => navigation.navigate('FormIndicador', {subCategory: eachSubCategory})}>
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