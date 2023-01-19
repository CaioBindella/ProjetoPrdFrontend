import React, { useState } from 'react';
import {
	Container,
	Header,
	HeaderTitle,
	ContainerInputGroup,
	Title,
	TitleIMG,
	ViewTitle,
	InputGroup,
	Input,
	Button,
	ButtonGroup,
	TextButton,
} from './Style';
import { StatusBar, Image, View, Text } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import axios from 'axios';

const CadastroMunicipio = ({ navigation }) => {
	const [nome, setNome] = useState('');
	const [nome2, setNome2] = useState('');
	const [tamPop, setTamPop] = useState(0);
	const [taxGerPerCap, setTaxGerPerCap] = useState(0);
	const [precipMedAnual, setPrecipMedAnual] = useState(0);

	async function createMunicipio() {
		const data = {
			Nome: nome,
			Nome2: nome2,
			Tam_Pop: parseInt(tamPop),
			Taxa_Ger_Per_Cap: parseFloat(taxGerPerCap),
			Precip_Med_Anual: parseFloat(precipMedAnual),
		};

		if (
			nome &&
			nome2 &&
			tamPop &&
			taxGerPerCap &&
			precipMedAnual
		) {
			await axios
				.post('http://10.0.10.143:3030/municipio', data)
				.then((response) => {
					console.log(response);
					navigation.navigate('Aterro');
				})
				.catch((error) => console.log(JSON.stringify(error)));
		} else {
			alert('Há campos vazios');
		}
	}
	return (
		<Container>
			<StatusBar />
			<Header>
				<HeaderTitle>Cadastrar Aterro</HeaderTitle>
			</Header>

			<ViewTitle>
				<Title>Preencha os dados referente ao Município</Title>
				<FontAwesome5 name='city' size={50} color='black' />
			</ViewTitle>

			<ContainerInputGroup>
				<InputGroup>
					<Text>Município 1 </Text>
					<Input
						placeholder='Digite aqui o município do aterro'
						onChangeText={setNome}
						value={nome}
					/>
				</InputGroup>

				<InputGroup>
					<Text>Município 2 (opcional) </Text>
					<Input
						placeholder='Digite aqui o município do aterro'
						onChangeText={setNome2}
						value={nome2}
					/>
				</InputGroup>

				<InputGroup>
					<Text>Tamanho da População </Text>
					<Input
						placeholder='Digite aqui o Tamanho da população local'
						onChangeText={setTamPop}
						value={tamPop}
					/>
				</InputGroup>

				<InputGroup>
					<Text>Taxa de Geração PerCapita </Text>
					<Input
						placeholder='Digite aqui a taxa de Geração PerCapita'
						onChangeText={setTaxGerPerCap}
						value={taxGerPerCap}
					/>
				</InputGroup>

				<InputGroup>
					<Text>Taxa de Precipitação Anual </Text>
					<Input
						placeholder='Digite aqui a taxa de Precipitação Anual'
						onChangeText={setPrecipMedAnual}
						value={precipMedAnual}
					/>
				</InputGroup>
			</ContainerInputGroup>

			<ButtonGroup>
				<Button onPress={() => navigation.goBack()}>
					<TextButton>Retornar</TextButton>
				</Button>
				<Button
					// onPress={() => navigation.navigate('Aterro')}
					onPress={() => createMunicipio()}
				>
					<TextButton>Avançar</TextButton>
				</Button>
			</ButtonGroup>
		</Container>
	);
};

export default CadastroMunicipio;
