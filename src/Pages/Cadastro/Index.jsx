import React, { useState } from 'react';
import { Container, Text, InputGroup, Input, Button } from './Style';
import { ScrollView } from 'react-native';
import axios from 'axios';

const Cadastro = () => {
	const [aterro, setAterro] = useState('nsei');
	const [endereco, setEndereco] = useState('nseis');
	const [baciaHidrografica, setBaciaHidrografica] = useState('teste');
	const [recebimentoBruto, setRecebimentoBruto] = useState(50);
	const [recebimentoGerado, setRecebimentoGerado] = useState(50);
	const [CondicaoClimatica, setCondicaoClimatica] = useState('chuvoso');
	const [Latitude, setLatitude] = useState(40);
	const [Longitude, setLongitude] = useState(40);

	function enviaAterro() {
		const DadosAterro = {
			Nome: aterro,
			Endereco: endereco,
			Bacia_Hidrografica: baciaHidrografica,
			Recebimento_Bruto: recebimentoBruto,
			Recebimento_Gerado: recebimentoGerado,
			Condicao_Climatica: CondicaoClimatica,
			Longitude: Longitude,
			Latitude: Latitude,
		};
		// console.log(DadosAterro);
		// .get('http://10.0.10.143:3030/aterros')
		axios
			.post('http://10.0.10.143:3030/aterro', DadosAterro,
			// {headers:{
			// 	"Access-Control-Allow-Origin": "*",
			// 	"Access-Control-Allow-Headers": "Authorization",
			// 	"Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE" ,
			// 	// "Content-Type": "application/json;charset=UTF-8"
			// 	'Content-Type': 'application/x-www-form-urlencoded',
			// }},
			)
			.then((response) => console.log(response))
			.catch(error => console.log(JSON.stringify(error)));
	}
	return (
		<ScrollView style={{ width: '100%', marginBottom: 100 }}>
			<Container>
				<InputGroup>
					<Text>Aterro: </Text>
					<Input onChangeText={setAterro} value={aterro} />
				</InputGroup>

				<InputGroup>
					<Text>Endereço: </Text>
					<Input onChangeText={setEndereco} value={endereco} />
				</InputGroup>

				<InputGroup>
					<Text>Bacia Hidrografica: </Text>
					<Input
						onChangeText={setBaciaHidrografica}
						value={baciaHidrografica}
					/>
				</InputGroup>

				<InputGroup>
					<Text>Recebimento Bruto: </Text>
					<Input onChangeText={setRecebimentoBruto} value={recebimentoBruto} />
				</InputGroup>

				<InputGroup>
					<Text>Recebimento Gerado: </Text>
					<Input
						onChangeText={setRecebimentoGerado}
						value={recebimentoGerado}
					/>
				</InputGroup>

				<InputGroup>
					<Text>Condição Climática: </Text>
					<Input
						onChangeText={setCondicaoClimatica}
						value={CondicaoClimatica}
					/>
				</InputGroup>

				<InputGroup>
					<Text>Longitude: </Text>
					<Input onChangeText={setLongitude} value={Longitude} />
				</InputGroup>

				<InputGroup>
					<Text>Latitude: </Text>
					<Input onChangeText={setLatitude} value={Latitude} />
				</InputGroup>
				<Button>
					<Text onPress={() => enviaAterro()}>Enviar</Text>
				</Button>
			</Container>
		</ScrollView>
	);
};

export default Cadastro;
