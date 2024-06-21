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
import Header from '../../Components/Header/Index';
import {
	StatusBar,
	View,
	Text,
	FlatList,
	TouchableOpacity,
	ScrollView,
} from 'react-native';

import { consulta } from '../../../Services/Networks/consulta';

import { Touchable } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const Item = ({ Endereco, Latitude, Longitude, Nome, aterroData, navigation }) => (
	<TouchableOpacity onPress={()=> navigation.navigate('PainelAterro', {aterroData: aterroData})}>
		<ItemContainer>
			<Feather name='home' size={44} color='black' />
			<Card>
				<Title>{Nome}</Title>
				<Title>Endereço: <DescText>{Endereco}</DescText></Title>
				<Title>Latitude: <DescText>{Latitude}</DescText></Title>
				<Title>Longitude: <DescText>{Longitude}</DescText></Title>
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
								Endereco={eachData.Endereco}
								Nome={eachData.Nome}
								Latitude={eachData.Latitude}
								Longitude={eachData.Longitude}
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

			<Button onPress={() => navigation.navigate('Aterro')}>
				<AntDesign name="plus" size={24} color="black" />
				<Text>Incluir novo Aterro</Text>
			</Button>
		</Container>
	);
};

export default MeusAterros;
