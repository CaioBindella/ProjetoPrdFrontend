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

	async function enviaAterro() {
		const DadosAterro = {
			Nome: aterro,
			Endereco: endereco,
			Bacia_Hidrografica: baciaHidrografica,
			Recebimento_Bruto: parseFloat(recebimentoBruto),
			Recebimento_Gerado: parseFloat(recebimentoGerado),
			Condicao_Climatica: CondicaoClimatica,
			Longitude: parseFloat(Longitude),
			Latitude: parseFloat(Latitude),
		};

		if (
			Nome &&
			Endereco &&
			Bacia_Hidrografica &&
			Recebimento_Bruto &&
			Recebimento_Gerado &&
			Condicao_Climatica &&
			Longitude &&
			Latitude
		) {
			await axios
				.post('http://10.0.10.143:3030/aterro', DadosAterro)
				.then((response) => console.log(response))
				.catch((error) => console.log(JSON.stringify(error)));
		} else {
			alert('Há campos vazios');
		}
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
