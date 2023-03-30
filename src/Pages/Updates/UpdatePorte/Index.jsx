import React, { useState } from 'react';

import {
    ButtonGroup,
	Button,
	TextButton,
	Title,
	ViewTitle,
	ContainerInputGroup,
	InputGroup,
	Input,
} from './Style'

import { ScrollView, Text } from 'react-native';
import Header from '../../Components/Header/Index';

import { atualiza } from '../../../Services/Networks/atualiza'

function UpdatePorte({navigation, route}) {
	const Item = route.params.item
    const [nomePorte, setPorte] = useState(Item.Nome);

    async function upPorte() {
		const data = {
			Porte: nomePorte,
		};

		if (nomePorte) {
			atualiza(Item.id, 'porte', data)

			navigation.navigate('Home')
		} else {
			alert('Há campos vazios');
		}
	}

    return(
        <ScrollView style={{ width: '100%', backgroundColor: 'white' }}>
			<Header title="Atualizar Porte"/>

			<ContainerInputGroup>
				<InputGroup>
					<Text>Porte do Aterro</Text>
					<Input
						placeholder='Digite aqui o porte do aterro'
						onChangeText={setPorte}
						value={nomePorte}
					/>
				</InputGroup>

			</ContainerInputGroup>

			<ButtonGroup>
				<Button onPress={() => navigation.goBack()}>
					<TextButton>Cancelar</TextButton>
				</Button>
				<Button
					onPress={() => upPorte()}
				>
					<TextButton>Cadastrar</TextButton>
				</Button>
			</ButtonGroup>
		</ScrollView>
    );
};

export default UpdatePorte