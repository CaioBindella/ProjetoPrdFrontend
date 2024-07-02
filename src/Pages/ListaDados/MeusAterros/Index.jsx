import React, { useEffect, useState } from 'react';
import {
	ItemContainer,
	Card,
	Title,
	Container,
	Button,
	DescText,
} from './Style';
import { Feather } from '@expo/vector-icons';

import {
	StatusBar,
	Text,
	TouchableOpacity,
	ScrollView,
} from 'react-native';

import { consulta } from '../../../Services/Networks/consulta';
import { AntDesign } from '@expo/vector-icons';

import Header from '../../Components/Header/Index';

const Item = ({ aterroData, navigation }) => (
	<TouchableOpacity onPress={()=> navigation.navigate('PainelAterro', {aterroData: aterroData})}>
		<ItemContainer>
			<Feather name='home' size={44} color='black' />
			<Card>
				<Title>{aterroData.Nome}</Title>
				<Title>Endereço: <DescText>{aterroData.Endereco}</DescText></Title>
				<Title>Recebimento Bruto: <DescText>{aterroData.RecebimentoBruto}</DescText></Title>
			</Card>
		</ItemContainer>
	</TouchableOpacity>
);

const MeusAterros = ({ navigation }) => {
	const [data, setData] = useState([]);

	async function loadData () {
		const response = await consulta('aterro')

		setData(response)
	}

	useEffect( () => {
		loadData()
	}, []);


	return (
		<Container>
			<StatusBar />
			<Header title="Meus Aterros"/>

			<ScrollView>

				{data ?
					data.map((eachData, index) => {
						return(
							<Item
								aterroData={eachData}
								key={index}
								navigation={navigation}
							/>
						)
					})
					:
					null
				}
			</ScrollView>

			<Button onPress={() => navigation.navigate('CadastroAterro', {aterroData: {}, isUpdate: false})}>
				<AntDesign name="plus" size={24} color="black" />
				<Text>Incluir novo Aterro</Text>
			</Button>
		</Container>
	);
};

export default MeusAterros;
