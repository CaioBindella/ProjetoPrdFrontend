import React, { useEffect, useState } from 'react';
import {
	ContainerAterros,
	Aterro,
	Title,
	Container,
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

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Touchable } from 'react-native';

const Item = ({ Endereco, Latitude, Longitude, Nome,item,navigation }) => (
	<TouchableOpacity onPress={()=> navigation.navigate('UmAterro',{item: item})}>
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
	const [data, setData] = useState();
	useEffect( () => {
		// axios
		// 	.get('http://10.0.10.143:3030/aterros')
		// 	.then((response) => {
		// 		setData(response.data);
		// 	})
		// 	.catch((error) => console.log(JSON.stringify(error)));

		// const dataAterro = await AsyncStorage.getItem('dataAterro')
		// console.log(dataAterro)

		const loadData = async () =>{
			await AsyncStorage.getItem('dataAterro').then((valor) => {
			  setData(JSON.parse(valor))
			})
		  }
	
		loadData()
	}, []);


	return (
		<Container>
			<StatusBar />
			<Header />

			<ScrollView>
				{data ?
					<Item
						Endereco={data.Endereco}
						Nome={data.Nome}
						Latitude={data.Latitude}
						Longitude={data.Longitude}
						item={data}
						navigation={navigation}
					/>
					:
					null
				}
			</ScrollView>

			{/* {data ?
				<FlatList
					data={data}
					renderItem={({ item }) => (
						<Item
							Endereco={item.Endereco}
							Nome={item.Nome}
							Latitude={item.Latitude}
							Longitude={item.Longitude}
							item={item}
							navigation={navigation}
						/>
					)}
					keyExtractor={(item) => item.Nome}
					showsVerticalScrollIndicator={false}
				/>
				:
				null
			} */}
		</Container>
	);
};

export default MeusAterros;
