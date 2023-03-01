import React, { useState, useEffect } from 'react';

import {
	Container,
	Text,
	InputGroup,
	Input,
	Button,
	Header,
	HeaderTitle,
	Title,
	ViewTitle,
	ButtonGroup,
	TextButton,
} from './Style';

import { ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from "react-native-uuid"

import { Entypo } from '@expo/vector-icons';

const UpdateUmAterro = ({ navigation, route }) => {
	const [aterro, setAterro] = useState('');
	const [endereco, setEndereco] = useState('');
	const [baciaHidrografica, setBaciaHidrografica] = useState('');
	const [recebimentoBruto, setRecebimentoBruto] = useState('');
	const [recebimentoGerado, setRecebimentoGerado] = useState('');
	const [CondicaoClimatica, setCondicaoClimatica] = useState('');
	const [Latitude, setLatitude] = useState('');
	const [Longitude, setLongitude] = useState('');

	const index = route.params.index;
	
	useEffect( () => {
	
		const loadData = async () =>{
			const response = await AsyncStorage.getItem('dataAterro')
			const data = response ? JSON.parse(response) : []
			const chosenData = data[index]

			setAterro(chosenData.Nome)
			setEndereco(chosenData.Endereco)
			setBaciaHidrografica(chosenData.Bacia_Hidrografica)
			setRecebimentoBruto(String(chosenData.Recebimento_Bruto))
			setRecebimentoGerado(String(chosenData.Recebimento_Gerado))
			setCondicaoClimatica(chosenData.Condicao_Climatica)
			setLatitude(String(chosenData.Latitude))
			setLongitude(String(chosenData.Longitude))
		}
	
		loadData()
		
	}, []);

	

	async function UpAterro() {

		const id = uuid.v4()
		const data = {
			Id: id,
			Nome: aterro,
			Endereco: endereco,
			Bacia_Hidrografica: baciaHidrografica,
			Recebimento_Bruto: parseFloat(recebimentoBruto),
			Recebimento_Gerado: parseFloat(recebimentoGerado),
			Condicao_Climatica: CondicaoClimatica,
			Longitude: parseFloat(Longitude),
			Latitude: parseFloat(Latitude),
		};
		const response = await AsyncStorage.getItem('dataAterro')
		const previousData = response ? JSON.parse(response) : [];

		if (
			aterro &&
			endereco &&
			baciaHidrografica &&
			recebimentoBruto &&
			recebimentoGerado &&
			CondicaoClimatica &&
			Longitude &&
			Latitude
		) {
			previousData.splice(index, 1, data)
			const stringData = JSON.stringify(previousData)

			await AsyncStorage.setItem('dataAterro', stringData)
			navigation.navigate('Home')
		} else {
			alert('Há campos vazios');
		}
	}

	return (
		<ScrollView
			style={{
				width: '100%',
			}}>
			<Container>
				<Header>
					<HeaderTitle>Atualizar Aterro</HeaderTitle>
				</Header>

				<ViewTitle>
					<Title>Preencha os dados referente a Atualização Aterro</Title>
					<Entypo name='home' size={46} color='black' />
				</ViewTitle>

				<InputGroup>
					<Text>Aterro: </Text>
					<Input
						placeholder='Digite aqui o nome do aterro'
						onChangeText={setAterro}
						value={aterro}
					/>
				</InputGroup>

				<InputGroup>
					<Text>Endereço: </Text>
					<Input
						placeholder='Digite aqui o endereço do aterro'
						onChangeText={setEndereco}
						value={endereco}
					/>
				</InputGroup>

				<InputGroup>
					<Text>Bacia Hidrografica: </Text>
					<Input
						placeholder='Digite aqui a bacia hidrográfica'
						onChangeText={setBaciaHidrografica}
						value={baciaHidrografica}
					/>
				</InputGroup>

				<InputGroup>
					<Text>Recebimento Bruto: </Text>
					<Input
						placeholder='Digite aqui o recebimento bruto'
						onChangeText={setRecebimentoBruto}
						value={recebimentoBruto}
					/>
				</InputGroup>

				<InputGroup>
					<Text>Recebimento Gerado: </Text>
					<Input
						placeholder='Digite aqui o recebimento gerado'
						onChangeText={setRecebimentoGerado}
						value={recebimentoGerado}
					/>
				</InputGroup>

				<InputGroup>
					<Text>Condição Climática: </Text>
					<Input
						placeholder='Digite aqui a condição climática'
						onChangeText={setCondicaoClimatica}
						value={CondicaoClimatica}
					/>
				</InputGroup>

				<InputGroup>
					<Text>Longitude: </Text>
					<Input
						placeholder='Digite aqui a longitude'
						onChangeText={setLongitude}
						value={Longitude}
					/>
				</InputGroup>

				<InputGroup>
					<Text>Latitude: </Text>
					<Input
						placeholder='Digite aqui a latitude'
						onChangeText={setLatitude}
						value={Latitude}
					/>
				</InputGroup>

				<ButtonGroup>
					<Button
						// onPress={() => navigation.navigate('Profissional')}
						onPress={() => {
							UpAterro()
							alert('Atualizado'); }
						}
						
					>
						<TextButton>Atualizar</TextButton>
					</Button>
				</ButtonGroup>
			</Container>
		</ScrollView>
	);
};

export default UpdateUmAterro;
