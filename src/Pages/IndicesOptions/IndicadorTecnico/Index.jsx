import React from "react";

import {
    Container,
} from './Style'

import Header from "../../Components/Header/Index";
import IndiceCard from "../../Components/IndiceCard/Index";

import { indiceTecnicoData } from "../../../Services/indiceTecnicoData";

function IndicadorTecnico() {
    return(
        <Container>
            <Header title="Índice Técnico" />

            {indiceTecnicoData.map((eachData, index) => {
                return(<IndiceCard key={index} title={eachData.title} description={eachData.description} options={eachData.options} optionValue={eachData.valuesOptions}/>)
            })}

        </Container>
    );
};

export default IndicadorTecnico;