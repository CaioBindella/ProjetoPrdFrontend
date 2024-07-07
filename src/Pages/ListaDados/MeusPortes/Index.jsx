import React, { useEffect, useState } from 'react';
import {
	ItemContainer,
	Card,
	Title,
	Container,
	Button,
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

const Item = ({ Nome, item, navigation, index }) => (
	<TouchableOpacity onPress={()=> navigation.navigate('PainelBasicos', {item: item, table: 'porte'})}>
		<ItemContainer>
			<Feather name='home' size={44} color='black' />
			<Card>
				<Title>{Nome}</Title>
			</Card>
		</ItemContainer>
	</TouchableOpacity>
);

const MeusPortes = ({ navigation }) => {
	const [data, setData] = useState([]);

	async function loadData () {
		const response = await consulta('porte')

		setData(response)
	}

	useEffect( () => {
		loadData()
	}, []);


	return (
		<Container>
			<StatusBar />
			<Header title="Meus Portes"/>

			<ScrollView>

				{data ?
					data.map((eachData, index) => {
						return(
							<Item
								Nome={eachData.Nome}
								item={eachData}
								key={index}
								navigation={navigation}
							/>
						)
					})
					:
					null
				}
			</ScrollView>

			{/*	Botão para criar novo porte desabilitado */}
			{/*
			<Button onPress={() => navigation.navigate('Porte')}>
				<AntDesign name="plus" size={24} color="black" />
				<Text>Incluir novo Porte </Text>
			</Button>
			*/}
		</Container>
	);
};

export default MeusPortes;
