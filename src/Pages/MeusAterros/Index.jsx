import React, { useEffect, useState } from 'react';
import {
	ContainerAterros,
	Aterro,
	Title,
	Container,
	Button,
} from './Style';
import { Feather } from '@expo/vector-icons';
import Header from '../Components/Header/Index';
import {
	StatusBar,
	View,
	Text,
	FlatList,
	TouchableOpacity,
	ScrollView,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Touchable } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const Item = ({ Endereco, Latitude, Longitude, Nome, item, navigation, index }) => (
	<TouchableOpacity onPress={()=> navigation.navigate('UmAterro',{item: item, index:index})}>
		<ContainerAterros>
			<Feather name='home' size={44} color='black' />
			<Aterro>
				<Title>{Nome}</Title>
				<Text>Endereço: {Endereco}</Text>
				<Text>Latitude: {Latitude}</Text>
				<Text>Longitude: {Longitude}</Text>
			</Aterro>
		</ContainerAterros>
	</TouchableOpacity>
);

const MeusAterros = ({ navigation }) => {
	const [data, setData] = useState([]);
	useEffect( () => {
		const loadData = async () =>{
			const response = await AsyncStorage.getItem('dataAterro')
			const data = response ? JSON.parse(response) : []
			setData(data)
		  }
	
		loadData()
	}, []);

	// console.log(data)


	return (
		<Container>
			<StatusBar />
			<Header title="Meus Aterros"/>

			<ScrollView>

				{	data ?
					data.map((itData, index) => {
						return(
							<Item
								Endereco={itData.Endereco}
								Nome={itData.Nome}
								Latitude={itData.Latitude}
								Longitude={itData.Longitude}
								item={itData}
								key={index}
								navigation={navigation}
								index={index}
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
