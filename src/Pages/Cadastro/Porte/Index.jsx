import React, { useState } from 'react';

import {
    ButtonGroup,
	Button,
	TextButton,
	Title,
	ViewTitle,
	ContainerInputGroup,
	InputGroup,
	Input,
} from './Style'

import { ScrollView, Text } from 'react-native';
import Header from '../../Components/Header/Index';

import porte from '../../../Services/SqlTables/porte';

function Porte({navigation}) {

    const [nomePorte, setPorte] = useState('');

    async function createPorte() {
		const data = {
			Porte: nomePorte,
		};

		if (nomePorte) {
			// await axios
			// 	.post('http://10.0.10.143:3030/organizacao', data)
			// 	.then((response) => {
			// 		console.log(response);
			// 		navigation.navigate('Home');
			// 	})
			// 	.catch((error) => console.log(JSON.stringify(error)));
			
			porte.create(data)
				.then( id => console.log('Porte created with id: '+ id) )
				.catch( err => console.log(err) )
			
			navigation.navigate('Home')
		} else {
			alert('Há campos vazios');
		}
	}

    return(
        <ScrollView style={{ width: '100%', backgroundColor: 'white' }}>
			<Header title="Cadastrar Porte"/>

			<ContainerInputGroup>
				<InputGroup>
					<Text>Porte do Aterro</Text>
					<Input
						placeholder='Digite aqui o porte do aterro'
						onChangeText={setPorte}
						value={nomePorte}
					/>
				</InputGroup>

			</ContainerInputGroup>

			<ButtonGroup>
				<Button onPress={() => navigation.navigate('Porte')}>
					<TextButton>Cancelar</TextButton>
				</Button>
				<Button
					onPress={() => createPorte()}
					// onPress={() => navigation.navigate('Organizacao')}
				>
					<TextButton>Cadastrar</TextButton>
				</Button>
			</ButtonGroup>
		</ScrollView>
    );
};

export default Porte