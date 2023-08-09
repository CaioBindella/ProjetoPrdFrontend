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
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Ionicons } from '@expo/vector-icons';
import Header from '../../Components/Header/Index';


const Profissional = ({ navigation }) => {
	const [nomeGerente, setNomeGerente] = useState('');
	const [emailGerente, setEmailGerente] = useState('');
	const [contatoGerente, setContatoGerente] = useState('');

	const [nomeProjetista, setNomeProjetista] = useState('');
	const [emailProjetista, setEmailProjetista] = useState('');
	const [contatoProjetista, setContatoProjetista] = useState('');

	const [nomeAvaliador, setNomeAvaliador] = useState('');
	const [emailAvaliador, setEmailAvaliador] = useState('');
	const [contatoAvaliador, setContatoAvaliador] = useState('');

	async function createProfissional() {
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

		const newData = [...previousData, data]

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
			// await axios
			// 	.post('http://10.0.10.143:3030/profissional', data)
			// 	.then((response) => {
			// 		console.log(response);
			// 		navigation.navigate('Organizacao');
			// 	})
			// 	.catch((error) => console.log(JSON.stringify(error)));

			const stringData = JSON.stringify(newData)

			await AsyncStorage.setItem('dataProfissionais', stringData)
			navigation.navigate('Organizacao');
		} else {
			alert('Há campos vazios');
		}
	}
	return (
		<ScrollView style={{ width: '100%', backgroundColor: 'white' }}>
			<Header title={"Cadastro Profissional"} />

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
                onPress={() => createProfissional()}
                >
					<TextButton>Avançar</TextButton>
				</Button>
			</ButtonGroup>
		</ScrollView>
	);
};

export default Profissional;
