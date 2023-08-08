import React, { useState, useEffect } from 'react';
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
import { atualiza } from '../../../Services/Networks/atualiza'

import { MaterialCommunityIcons } from '@expo/vector-icons';

import Header from '../../Components/Header/Index';

const UpdateOrg = ({ navigation, route }) => {
	const Item = route.params.item;
    const [nome, setNome] = useState(Item.Nome);
    const [CNPJ, setCNPJ] = useState(String(Item.Cnpj));
    const [contato, setContato] = useState(String(Item.Contato));

	async function UpOrganizacao() {
		const data = {
			Nome: nome,
			CNPJ: CNPJ,
			Contato: contato,
		};

		if (nome && CNPJ && contato) {
			atualiza(Item.CodOrganizacao, 'organizacao', data)
			navigation.navigate('Home')

		} else {
			alert('Há campos vazios');
		}
	}
	return (
		<ScrollView style={{ width: '100%', backgroundColor: 'white' }}>
			<Header title="Atualizar Organização"/>

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
						placeholder='Digite aqui o CNPJ '
						onChangeText={setCNPJ}
						value={CNPJ}
					/>
				</InputGroup>
			</ContainerInputGroup>

			<ButtonGroup>
				<Button onPress={() => navigation.goBack()}>
					<TextButton>Cancelar</TextButton>
				</Button>
				<Button
					onPress={() => {
                        UpOrganizacao()
                        alert('Atualizado')
                    }}
					
				>
					<TextButton>Atualizar</TextButton>
				</Button>
			</ButtonGroup>
		</ScrollView>
	);
};

export default UpdateOrg;
