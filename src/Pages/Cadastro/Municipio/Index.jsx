import React, { useState } from 'react';
import {
	Container,
	ContainerInputGroup,
	Title,
	ViewTitle,
	InputGroup,
	Input,
	Button,
	ButtonGroup,
	TextButton,
} from './Style';
import { Text, ScrollView } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

import { inclui } from '../../../Services/Networks/inclui';
import Header from '../../Components/Header/Index';

const CadastroMunicipio = ({ navigation }) => {
	const [nome, setNome] = useState('');
	{/*
	const [tamPop, setTamPop] = useState(0);
	const [taxGerPerCap, setTaxGerPerCap] = useState(0);
	const [precipMedAnual, setPrecipMedAnual] = useState(0);
	*/}

	async function createMunicipio() {
	
		const data = {
			Nome: nome,
			/*
			Tam_Pop: parseInt(tamPop),
			Taxa_Ger_Per_Cap: parseFloat(taxGerPerCap),
			Precip_Med_Anual: parseFloat(precipMedAnual),
			*/
		};

		if (nome) {
			inclui('municipio', data)
				
			navigation.navigate('Home');
		} else {
			alert('Há campos vazios');
		}
	}
	return (
		<Container>
			<Header title={"Cadastro Município"}/>

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

					{/*
					<InputGroup>
						<Text>Tamanho da População</Text>
						<Input
							placeholder='Digite aqui o tamanho da população'
							onChangeText={setTamPop}
							value={tamPop}
						/>
					</InputGroup>
					

					<InputGroup>
						<Text>Taxa de Geração PerCap</Text>
						<Input
							placeholder='Digite aqui a taxa de Geração PerCap'
							onChangeText={setTaxGerPerCap}
							value={taxGerPerCap}
						/>
					</InputGroup>
				
					<InputGroup>
						<Text>Precipitação média anual</Text>
						<Input
							placeholder='Digite aqui a precipitação média anual'
							onChangeText={setPrecipMedAnual}
							value={precipMedAnual}
						/>
					</InputGroup>
					*/}
				</ContainerInputGroup>

				<ButtonGroup>
					<Button onPress={() => navigation.navigate('Home')}>
						<TextButton>Cancelar</TextButton>
					</Button>
					<Button
						// onPress={() => navigation.navigate('Aterro')}
						onPress={() => createMunicipio()}>
						<TextButton>Cadastrar</TextButton>
					</Button>
				</ButtonGroup>
			</ScrollView>
		</Container>
	);
};

export default CadastroMunicipio;
