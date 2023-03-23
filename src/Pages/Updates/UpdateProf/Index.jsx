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
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import { Ionicons } from '@expo/vector-icons';

import Header from '../../Components/Header/Index';
import Buttons from '../../Cadastro/Components/Buttons';

const UpdateProfissional = ({ navigation, route }) => {
	const [nomeGerente, setNomeGerente] = useState('');
	const [emailGerente, setEmailGerente] = useState('');
	const [contatoGerente, setContatoGerente] = useState('');

	const [nomeProjetista, setNomeProjetista] = useState('');
	const [emailProjetista, setEmailProjetista] = useState('');
	const [contatoProjetista, setContatoProjetista] = useState('');

	const [nomeAvaliador, setNomeAvaliador] = useState('');
	const [emailAvaliador, setEmailAvaliador] = useState('');
	const [contatoAvaliador, setContatoAvaliador] = useState('');

    const index = route.params.index;
	
	useEffect( () => {
	
		const loadData = async () =>{
			const response = await AsyncStorage.getItem('dataProfissionais')
			const data = response ? JSON.parse(response) : []
			const chosenData = data[index]

			setNomeGerente(chosenData.NomeGerente)
			setEmailGerente(chosenData.EmailGerente)
			setContatoGerente(String(chosenData.ContatoGerente))

			setNomeProjetista(chosenData.NomeProjetista)
			setEmailProjetista(chosenData.EmailProjetista)
			setContatoProjetista(String(chosenData.ContatoProjetista))

            setNomeAvaliador(chosenData.NomeAvaliador)
			setEmailAvaliador(chosenData.EmailAvaliador)
			setContatoAvaliador(String(chosenData.ContatoAvaliador))
		}
	
		loadData()
		
	}, []);

	async function UpProfissional() {
		const data = {
			NomeGerente: nomeGerente,
			EmailGerente: emailGerente,
			ContatoGerente: contatoGerente,
			NomeProjetista: nomeProjetista,
			EmailProjetista: emailProjetista,
			ContatoProjetista: contatoProjetista,
			NomeAvaliador: nomeAvaliador,
			EmailAvaliador: emailAvaliador,
			ContatoAvaliador: contatoAvaliador,
		};

		const response = await AsyncStorage.getItem('dataProfissionais')
		const previousData = response ? JSON.parse(response) : [];

		if (
			nomeGerente &&
			emailGerente &&
			contatoGerente &&
			nomeProjetista &&
			emailProjetista &&
			contatoProjetista &&
			nomeAvaliador &&
			emailAvaliador &&
			contatoAvaliador
		) {
			previousData.splice(index, 1, data)
			const stringData = JSON.stringify(previousData)

			await AsyncStorage.setItem('dataProfissionais', stringData)
			navigation.navigate('Home');
		} else {
			alert('Há campos vazios');
		}
	}
	return (
		<ScrollView style={{ width: '100%', backgroundColor: 'white' }}>
			<Header title="Atualizar Profissionais"/>

			<ViewTitle>
				<Title>Preencha os dados referente aos Profissionais</Title>
				<Ionicons name='people-sharp' size={50} color='black' />
			</ViewTitle>

			<ContainerInputGroup>
				<InputGroup>
					<Text>Gerente</Text>
					<Input
						placeholder='Digite aqui o nome do Gerente'
						onChangeText={setNomeGerente}
						value={nomeGerente}
					/>
				</InputGroup>

				<InputGroup>
					<Text>Contato do Gerente</Text>
					<Input
						placeholder='(XX) XXXXX - XXXX'
						onChangeText={setContatoGerente}
						value={contatoGerente}
					/>
				</InputGroup>

				<InputGroup>
					<Text>E-mail do Gerente</Text>
					<Input
						placeholder='Digite aqui o e-mail do gerente'
						onChangeText={setEmailGerente}
						value={emailGerente}
					/>
				</InputGroup>

				<InputGroup>
					<Text>Avaliador ISOAS</Text>
					<Input
						placeholder='Digite aqui o nome do avaliador'
						onChangeText={setNomeAvaliador}
						value={nomeAvaliador}
					/>
				</InputGroup>

				<InputGroup>
					<Text>Contato do Avaliador ISOAS</Text>
					<Input
						placeholder='(XX) XXXXX - XXXX'
						onChangeText={setContatoAvaliador}
						value={contatoAvaliador}
					/>
				</InputGroup>

				<InputGroup>
					<Text>E-mail do Avaliador ISOAS</Text>
					<Input
						placeholder='Digite aqui o e-mail do avaliador'
						onChangeText={setEmailAvaliador}
						value={emailAvaliador}
					/>
				</InputGroup>

				<InputGroup>
					<Text>Projetista Responsável</Text>
					<Input
						placeholder='Digite aqui o nome do projetista responsável'
						onChangeText={setNomeProjetista}
						value={nomeProjetista}
					/>
				</InputGroup>

				<InputGroup>
					<Text>Contato do Projetista Responsável</Text>
					<Input
						placeholder='(XX) XXXXX - XXXX'
						onChangeText={setContatoProjetista}
						value={contatoProjetista}
					/>
				</InputGroup>

				<InputGroup>
					<Text>E-mail do Projetista Responsável</Text>
					<Input
						placeholder='Digite aqui o e-mail'
						onChangeText={setEmailProjetista}
						value={emailProjetista}
					/>
				</InputGroup>
			</ContainerInputGroup>

			<ButtonGroup>
				<Button onPress={() => navigation.goBack()}>
					<TextButton>Retornar</TextButton>
				</Button>
				<Button 
                // onPress={() => navigation.navigate('Organizacao')}
                onPress={() => {
                    UpProfissional()
                    alert('Atualizado');
                }}
                >
					<TextButton>Avançar</TextButton>
				</Button>
			</ButtonGroup>
		</ScrollView>
	);
};

export default UpdateProfissional;
