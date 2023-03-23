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
} from './Style';

import { ScrollView, Text } from 'react-native';
import { inclui } from '../../../Services/Networks/inclui';



import { MaterialCommunityIcons } from '@expo/vector-icons';

import Header from '../../Components/Header/Index';
import Buttons from '../Components/Buttons/index';


const Organizacao = ({ navigation }) => {
    const [nome, setNome] = useState('');
    const [CNPJ, setCNPJ] = useState('');
    const [contato, setContato] = useState('');

	async function createOrganizacao() {
		const data = {
			Nome: nome,
			CNPJ: CNPJ,
			Contato: contato,
		};

		if (nome && CNPJ && contato) {
			inclui('organizacao', data)
				.then(() => navigation.navigate('Home'))
				.catch((e) => alert("Organização já cadastrada"))
			
		} else {
			alert('Há campos vazios');
		}
	}
	return (
		<ScrollView style={{ width: '100%', backgroundColor: 'white' }}>
			<Header title="Cadastrar Organização" />

			<ViewTitle>
				<Title>Preencha os dados referente a Organização responsável </Title>
				<MaterialCommunityIcons
					name='relation-only-one-to-only-one'
					size={50}
					color='black'
				/>
			</ViewTitle>

			<ContainerInputGroup>
				<InputGroup>
					<Text>Nome da Organização do Aterro</Text>
					<Input
						placeholder='Digite aqui o nome da Organização'
						onChangeText={setNome}
						value={nome}
					/>
				</InputGroup>

				<InputGroup>
					<Text>Contato da Organização do Aterro</Text>
					<Input
						placeholder='Digite aqui o número'
						onChangeText={setContato}
						value={contato}
					/>
				</InputGroup>

				<InputGroup>
					<Text>CNPJ</Text>
					<Input
						placeholder='Digite aqui o CNPJ'
						onChangeText={setCNPJ}
						value={CNPJ}
					/>
				</InputGroup>

			</ContainerInputGroup>

			<ButtonGroup>
				<Button onPress={() => navigation.navigate('Home')}>
					<TextButton>Cancelar</TextButton>
				</Button>
				<Button
					onPress={() => createOrganizacao()}
					// onPress={() => navigation.navigate('Organizacao')}
				>
					<TextButton>Cadastrar</TextButton>
				</Button>
			</ButtonGroup>
		</ScrollView>
	);
};

export default Organizacao;
