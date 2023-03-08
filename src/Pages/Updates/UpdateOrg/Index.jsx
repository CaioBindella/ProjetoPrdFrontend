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
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import Header from '../../Components/Header/Index';

const UpdateOrg = ({ navigation, route }) => {
    const [nome, setNome] = useState('');
    const [CNPJ, setCNPJ] = useState('');
    const [contato, setContato] = useState('');
    const [licencPrev, setLicencPrev] = useState('');
    const [licencDeOperacao, setLicencDeOperacao] = useState('');

    const index = route.params.index;
	
	useEffect( () => {
	
		const loadData = async () =>{
			const response = await AsyncStorage.getItem('dataOrganizacao')
			const data = response ? JSON.parse(response) : []
			const chosenData = data[index]

			setNome(chosenData.Nome)
			setCNPJ(String(chosenData.CNPJ))
			setContato(String(chosenData.Contato))
			setLicencPrev(String(chosenData.LicenPrev))
			setLicencDeOperacao(String(chosenData.LicencDeOperacao))
		}
	
		loadData()
		
	}, []);

	async function UpOrganizacao() {
		const data = {
			Nome: nome,
			CNPJ: CNPJ,
			Contato: contato,
			LicenPrev: licencPrev,
			LicencDeOperacao: licencDeOperacao,
		};

		const response = await AsyncStorage.getItem('dataOrganizacao')
		const previousData = response ? JSON.parse(response) : [];


		if (nome && CNPJ && contato && licencPrev && licencDeOperacao) {
            previousData.splice(index, 1, data);

			const stringData = JSON.stringify(previousData)

			await AsyncStorage.setItem('dataOrganizacao', stringData)
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

				<InputGroup>
					<Text>Licença Prev</Text>
					<Input
						placeholder='Digite aqui a licença prev '
						onChangeText={setLicencPrev}
						value={licencPrev}
					/>
				</InputGroup>

				<InputGroup>
					<Text>Licença de Operação</Text>
					<Input
						placeholder='Digite aqui a licença de operação '
						onChangeText={setLicencDeOperacao}
						value={licencDeOperacao}
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
