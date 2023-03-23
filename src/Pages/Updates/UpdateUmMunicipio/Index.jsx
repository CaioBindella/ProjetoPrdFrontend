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

import Header from '../../Components/Header/Index';

import { atualiza } from '../../../Services/Networks/atualiza';

const UpdateUmMunicipio = ({ navigation, route }) => {
	const Item = route.params.item
	const [nome, setNome] = useState(Item.Nome);
	const [tamPop, setTamPop] = useState(String(Item.TamPop));
	const [taxGerPerCap, setTaxGerPerCap] = useState(String(Item.TaxGerPerCap));
	const [precipMedAnual, setPrecipMedAnual] = useState(String(Item.PrecipMedAnual));

    

	async function UpUmMunicipio() {
		const data = {
			Nome: nome,
			Tam_Pop: parseInt(tamPop),
			Taxa_Ger_Per_Cap: parseFloat(taxGerPerCap),
			Precip_Med_Anual: parseFloat(precipMedAnual),
		};

		if (nome && tamPop && taxGerPerCap && precipMedAnual) {
			atualiza(Item.id, 'municipio', data)
			
			navigation.navigate('Home')
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
						<Text>Município</Text>
						<Input
							placeholder='Digite aqui o município do aterro'
							onChangeText={setNome}
							value={nome}
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
						<TextButton>Atualizar</TextButton>
					</Button>
				</ButtonGroup>
			</ScrollView>
		</Container>
	);
};

export default UpdateUmMunicipio;
