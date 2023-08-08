import React, { useState } from 'react';
import {
	Container,
	Text,
	InputGroup,
	Input,
	Button,
	Title,
	ViewTitle,
	ButtonGroup,
	TextButton,
} from './Style';

import { ScrollView } from 'react-native';

import { Entypo } from '@expo/vector-icons';
import Header from '../../Components/Header/Index';

const Cadastro = ({ navigation }) => {
	const [nome, setNome] = useState('');
	const [endereco, setEndereco] = useState('');
	const [baciaHidrografica, setBaciaHidrografica] = useState('');
	const [recebimentoBruto, setRecebimentoBruto] = useState(0);
	const [recebimentoGerado, setRecebimentoGerado] = useState(0);
	const [condicaoClimatica, setCondicaoClimatica] = useState('');
	const [latitude, setLatitude] = useState(0);
	const [longitude, setLongitude] = useState(0);
	const [licenPrev, setLicenPrev] = useState(0);
	const [licenOp, setLicenOp] = useState(0);

	function nextPage() {
		const data = {
			Nome: nome,
			Endereco: endereco,
			BaciaHidrografica: baciaHidrografica,
			RecebimentoBruto: parseFloat(recebimentoBruto),
			RecebimentoGerado: parseFloat(recebimentoGerado),
			CondicaoClimatica: condicaoClimatica,
			Longitude: parseFloat(longitude),
			Latitude: parseFloat(latitude),
			LicencaPrevia: licenPrev,
			LicencaOperacional: licenOp
		};
		
		if (
			nome &&
			endereco &&
			baciaHidrografica &&
			recebimentoBruto &&
			recebimentoGerado &&
			condicaoClimatica &&
			longitude &&
			latitude &&
			licenPrev &&
			licenOp
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
				<Header title={"Cadastro Aterro"} />

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
						value={condicaoClimatica}
					/>
				</InputGroup>

				<InputGroup>
					<Text>Longitude: </Text>
					<Input
						placeholder='Digite aqui a longitude'
						onChangeText={setLongitude}
						value={longitude}
					/>
				</InputGroup>

				<InputGroup>
					<Text>Latitude: </Text>
					<Input
						placeholder='Digite aqui a latitude'
						onChangeText={setLatitude}
						value={latitude}
					/>
				</InputGroup>

				<InputGroup>
					<Text>Licença Prévia: </Text>
					<Input
						placeholder='Digite aqui a Licença Prev'
						onChangeText={setLicenPrev}
						value={licenPrev}
					/>
				</InputGroup>

				<InputGroup>
					<Text>Licença de Operação: </Text>
					<Input
						placeholder='Digite aqui a Lecença de Operação'
						onChangeText={setLicenOp}
						value={licenOp}
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
