import React, { useState } from 'react';
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

import { Entypo } from '@expo/vector-icons';

const Cadastro = ({ navigation }) => {
	const [nome, setNome] = useState('');
	const [endereco, setEndereco] = useState('');
	const [baciaHidrografica, setBaciaHidrografica] = useState('');
	const [recebimentoBruto, setRecebimentoBruto] = useState(0);
	const [recebimentoGerado, setRecebimentoGerado] = useState(0);
	const [CondicaoClimatica, setCondicaoClimatica] = useState('');
	const [Latitude, setLatitude] = useState(0);
	const [Longitude, setLongitude] = useState(0);

	function nextPage() {
		const data = {
			Nome: nome,
			Endereco: endereco,
			Bacia_Hidrografica: baciaHidrografica,
			Recebimento_Bruto: parseFloat(recebimentoBruto),
			Recebimento_Gerado: parseFloat(recebimentoGerado),
			Condicao_Climatica: CondicaoClimatica,
			Longitude: parseFloat(Longitude),
			Latitude: parseFloat(Latitude),
		};
		
		if (
			nome &&
			endereco &&
			baciaHidrografica &&
			recebimentoBruto &&
			recebimentoGerado &&
			CondicaoClimatica &&
			Longitude &&
			Latitude
		) {
			navigation.navigate('AterroFinal', {Data: data})
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
					<HeaderTitle>Cadastrar Aterro</HeaderTitle>
				</Header>

				<ViewTitle>
					<Title>Preencha os dados referente ao Aterro</Title>
					<Entypo name='home' size={46} color='black' />
				</ViewTitle>

				<InputGroup>
					<Text>Aterro: </Text>
					<Input
						placeholder='Digite aqui o nome do aterro'
						onChangeText={setNome}
						value={nome}
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
					<Button onPress={() => navigation.navigate('Home')}>
						<TextButton>Cancelar</TextButton>
					</Button>
					<Button
						onPress={() => nextPage()}
					>
						<TextButton>Próximo</TextButton>
					</Button>
				</ButtonGroup>
			</Container>
		</ScrollView>
	);
};

export default Cadastro;
