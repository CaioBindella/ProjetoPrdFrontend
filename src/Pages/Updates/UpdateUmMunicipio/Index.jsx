import React, { useState, useEffect } from 'react';
import {
	Container,
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
import { StatusBar, Image, View, Text,ScrollView } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Header from '../../Components/Header/Index';

const UpdateUmMunicipio = ({ navigation, route }) => {
	const [nome, setNome] = useState('');
	const [nome2, setNome2] = useState('');
	const [tamPop, setTamPop] = useState(0);
	const [taxGerPerCap, setTaxGerPerCap] = useState(0);
	const [precipMedAnual, setPrecipMedAnual] = useState(0);

    const index = route.params.index;

    useEffect( () => {
	
		const loadData = async () =>{
			const response = await AsyncStorage.getItem('dataMunicipio')
			const data = response ? JSON.parse(response) : []
			const chosenData = data[index]

			setNome(chosenData.Nome)
			setNome2(chosenData.Nome2)
			setTamPop(String(chosenData.Tam_Pop))
			setTaxGerPerCap(String(chosenData.Taxa_Ger_Per_Cap))
			setPrecipMedAnual(String(chosenData.Precip_Med_Anual))
		}
	
		loadData()
		
	}, []);


	async function UpUmMunicipio() {
		
		const data = {
			Nome: nome,
			Nome2: nome2,
			Tam_Pop: parseInt(tamPop),
			Taxa_Ger_Per_Cap: parseFloat(taxGerPerCap),
			Precip_Med_Anual: parseFloat(precipMedAnual),
		};

		const response = await AsyncStorage.getItem('dataMunicipio')
		const previousData = response ? JSON.parse(response) : [];

		if (nome && nome2 && tamPop && taxGerPerCap && precipMedAnual) {
            previousData.splice(index, 1, data);
			const stringData = JSON.stringify(previousData)

			await AsyncStorage.setItem('dataMunicipio', stringData)
			navigation.navigate('Home');
		} else {
			alert('Há campos vazios');
		}
	}
	return (
		<Container>
			<StatusBar />
			<Header title="Atualizar Município" />
			<ScrollView>
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
						<TextButton>Cancelar</TextButton>
					</Button>
					<Button
						// onPress={() => navigation.navigate('Aterro')}
						onPress={() => {
                            UpUmMunicipio()
                            alert('Atualizado');
                        }}>
						<TextButton>Avançar</TextButton>
					</Button>
				</ButtonGroup>
			</ScrollView>
		</Container>
	);
};

export default UpdateUmMunicipio;
