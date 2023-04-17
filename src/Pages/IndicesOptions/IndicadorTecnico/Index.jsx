import React from "react";

import {
    Container,
    Button,
    Text,
    Content,
} from './Style'

import { ScrollView } from "react-native";

import Header from "../../Components/Header/Index";

function IndicadorTecnico({navigation}) {
    return(
        <Container>
            <ScrollView>
            <Header title="Índice Técnico" />
                
            <Content>
                <Button onPress={() => navigation.navigate('CaractLocacionais')}>
                    <Text>Cadastrar Características Locacionais</Text>
                </Button>

                <Button>
                    <Text>Cadastrar Infraestrutura Implantada</Text>
                </Button>

                <Button>
                    <Text>Cadastrar Condições Operacionais</Text>
                </Button>
            </Content>

            </ScrollView>
        </Container>
    );
};

export default IndicadorTecnico;