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
import Header from '../../Components/Header/Index';
import { Entypo } from '@expo/vector-icons';

const UpdateUmAterro = ({ navigation, route }) => {
	const aterroData = route.params.aterroData;
	const [aterro, setAterro] = useState(aterroData.Nome);
	const [endereco, setEndereco] = useState(aterroData.Endereco);
	const [baciaHidrografica, setBaciaHidrografica] = useState(aterroData.BaciaHidrografica);
	const [recebimentoBruto, setRecebimentoBruto] = useState(String(aterroData.RecebimentoBruto));
	const [recebimentoGerado, setRecebimentoGerado] = useState(String(aterroData.RecebimentoGerado));
	const [condicaoClimatica, setCondicaoClimatica] = useState(aterroData.CondicaoClimatica);
	const [latitude, setLatitude] = useState(String(aterroData.Latitude));
	const [longitude, setLongitude] = useState(String(aterroData.Longitude));
	const [licenPrev, setLicenPrev] = useState(String(aterroData.LicencaPrevia));
	const [licenOp, setLicenOp] = useState(String(aterroData.LicencaOperacional));

	async function nextPage() {
		const data = {
			Nome: aterro,
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
			aterro &&
			endereco &&
			baciaHidrografica &&
			recebimentoBruto &&
			recebimentoGerado &&
			condicaoClimatica &&
			longitude &&
			latitude &&
			licenOp &&
			licenPrev
		) {
			navigation.navigate('UpdateAterroFinal', {data: data, aterroData: aterroData})
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
				<Header title="Atualizar Aterro"/>

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
						placeholder='Digite aqui a Licença Prévia'
						onChangeText={setLicenPrev}
						value={licenPrev}
					/>
				</InputGroup>

				<InputGroup>
					<Text>Licença de Operação: </Text>
					<Input
						placeholder='Digite aqui a Licença de Operação'
						onChangeText={setLicenOp}
						value={licenOp}
					/>
				</InputGroup>

				<ButtonGroup>
					<Button onPress={() => navigation.goBack()}>
						<TextButton>Cancelar</TextButton>
					</Button>
					<Button
						onPress={() => nextPage()}
						
					>
						<TextButton>Proximo</TextButton>
					</Button>
				</ButtonGroup>
			</Container>
		</ScrollView>
	);
};

export default UpdateUmAterro;
