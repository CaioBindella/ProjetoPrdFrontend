import React, { useState } from 'react';

import {
    ButtonGroup,
	Button,
	TextButton,
	ContainerInputGroup,
	InputGroup,
	Input,
} from './Style'

import { ScrollView, Text } from 'react-native';
import Header from '../../Components/Header/Index';

import { inclui } from '../../../Services/Networks/inclui';

function Porte({navigation}) {

    const [nomePorte, setPorte] = useState('');

    async function createPorte() {
		const data = {
			Porte: nomePorte,
		};

		if (nomePorte) {
			inclui('porte', data)
				.then(() => navigation.navigate('Home'))
				.catch((e) => alert("Porte já cadastrado"))
		} else {
			alert('Há campos vazios');
		}
	}

    return(
        <ScrollView style={{ width: '100%', backgroundColor: 'white' }}>
			<Header title="Cadastrar Porte"/>

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
					onPress={() => createPorte()}
					// onPress={() => navigation.navigate('Organizacao')}
				>
					<TextButton>Cadastrar</TextButton>
				</Button>
			</ButtonGroup>
		</ScrollView>
    );
};

export default Porte