import React from "react";

import {
    Container,
} from './Style'

import { ScrollView } from "react-native";

import Header from "../../Components/Header/Index";
import IndiceCard from "../../Components/IndiceCard/Index";

import { TecCategoria2Grupo2 } from "../../../Services/frontEndData/IndiceTecnico/Categoria2/Grupo2";

function IndicadorTecnico() {
    return(
        <Container>
            <ScrollView>
            <Header title="Índice Técnico" />
                {TecCategoria2Grupo2.map((eachData, index) => {
                    return(<IndiceCard key={index} title={eachData.title} description={eachData.description} options={eachData.options} optionValue={eachData.valuesOptions}/>)
                })}
            </ScrollView>
        </Container>
    );
};

export default IndicadorTecnico;