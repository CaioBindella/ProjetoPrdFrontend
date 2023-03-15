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
import { StatusBar, Image, View, Text,ScrollView } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import municipio from '../../../Services/SqlTables/municipio';
// import axios from 'axios';

const CadastroMunicipio = ({ navigation }) => {
	const [nome, setNome] = useState('');
	const [tamPop, setTamPop] = useState(0);
	const [taxGerPerCap, setTaxGerPerCap] = useState(0);
	const [precipMedAnual, setPrecipMedAnual] = useState(0);

	async function createMunicipio() {
	
		const data = {
			Nome: nome,
			Tam_Pop: parseInt(tamPop),
			Taxa_Ger_Per_Cap: parseFloat(taxGerPerCap),
			Precip_Med_Anual: parseFloat(precipMedAnual),
		};

		if (nome && tamPop && taxGerPerCap && precipMedAnual) {
			// await axios
			// 	.post('http://10.0.10.143:3030/municipio', data)
			// 	.then((response) => {
			// 		console.log(response);
			// 		navigation.navigate('Aterro');
			// 	})
			// 	.catch((error) => console.log(JSON.stringify(error)));
			
			municipio.create(data)
				.then( id => console.log('Municipio created with id: '+ id) )
				.catch( err => console.log(err) )
				
			navigation.navigate('Home');
		} else {
			alert('Há campos vazios');
		}
	}
	return (
		<Container>
			<StatusBar />
			<Header>
				<HeaderTitle>Cadastrar Município</HeaderTitle>
			</Header>
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
