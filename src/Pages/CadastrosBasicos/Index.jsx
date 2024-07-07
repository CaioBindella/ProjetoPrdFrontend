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

                    <Button onPress={() => navigation.navigate('MeusMunicipios')}>
                        <Text>Cadastrar Município</Text>
                    </Button>

                    <Button onPress={() => navigation.navigate('MinhasOrganizacoes')}>
                        <Text>Cadastrar Organização</Text>
                    </Button>

                    {/* Botão para acessar portes desabilitado*/}
                    {/*
                    <Button onPress={() => navigation.navigate('MeusPortes')}>
                        <Text>Cadastrar Porte</Text>
                    </Button>
                    */}

                </ButtonsHome>
            </Content>  
        </Container>
    );
};

export default CadastrosBasicos