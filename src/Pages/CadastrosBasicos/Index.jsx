import React from "react";

import {
    Container,
    ButtonsHome,
    Button,
    Text,
    Content,
} from './Style';

import Header from "../Components/Header/Index";

function CadastrosBasicos({navigation}){
    return(
        <Container>
            <Header title="Cadastros Básicos" />
            <Content>
                <ButtonsHome>

                    <Button onPress={() => navigation.navigate('CadastroMunicipio')}>
                        <Text>Cadastrar Município</Text>
                    </Button>

                    <Button onPress={() => navigation.navigate('Organizacao')}>
                        <Text>Cadastrar Organização</Text>
                    </Button>

                    <Button onPress={() => navigation.navigate('Porte')}>
                        <Text>Cadastrar Porte</Text>
                    </Button>

                </ButtonsHome>
            </Content>  
        </Container>
    );
};

export default CadastrosBasicos