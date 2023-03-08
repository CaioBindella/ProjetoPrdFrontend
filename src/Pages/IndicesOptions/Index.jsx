import React from "react";

import {
	Container,
	Button,
	Content,
	Text,
} from './Style'

import { StatusBar, Image, View } from 'react-native';
import Header from "../Components/Header/Index";

function IndicesOptions({ navigation, route }) {

    const Item = route.params.item;

    return(
        <Container>
            <Header title={`Índices de ${Item.Nome}`}/>
            <Content>
				<Button onPress={() => navigation.navigate('IndiceTecnico')}>
					<Text>Cadastrar Indicador Técnico</Text>
				</Button>

				<Button>
					<Text>Cadastrar Indicador Econômico</Text>
				</Button>

				<Button>
					<Text>Cadastrar Indicador Social</Text>
				</Button>

                <Button>
					<Text>Visualizar históricos de Indicadores</Text>
				</Button>
			</Content>
        </Container>
    );
};

export default IndicesOptions;