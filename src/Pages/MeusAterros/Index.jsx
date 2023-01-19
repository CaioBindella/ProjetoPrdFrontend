import React, { useEffect, useState } from 'react';
import { ContainerAterros, Aterro, Title, Container } from './Style';
import { Feather } from '@expo/vector-icons';
import Header from '../Components/Header/Index';
import {
	StatusBar,
	Image,
	View,
	Text,
	FlatList,
	ScrollView,
} from 'react-native';
import axios from 'axios';

const Item = ({ Endereco, Latitude, Longitude, Nome }) => (
	<ContainerAterros>
		<Feather name='home' size={44} color='black' />
		<Aterro>
			<Title>{Nome}</Title>
			<Text>Endereço: {Endereco}</Text>
			<Text>Latitude: {Latitude}</Text>
			<Text>Longitude: {Longitude}</Text>
		</Aterro>
	</ContainerAterros>
);

const MeusAterros = ({ navigation }) => {
	const [data, setData] = useState();
	useEffect(() => {
		axios
			.get('http://10.0.10.143:3030/aterros')
			.then((response) => {
				setData(response.data);
			})
			.catch((error) => console.log(JSON.stringify(error)));
	}, []);

	return (
		<Container>
			<StatusBar />
			<Header />
			<FlatList
				data={data}
				renderItem={({ item }) => (
					<Item
						Endereco={item.Endereco}
						Nome={item.Nome}
						Latitude={item.Latitude}
						Longitude={item.Longitude}
					/>
				)}
				keyExtractor={(item) => item.Cod_Aterro}
				showsVerticalScrollIndicator={false}
			/>
		</Container>
	);
};

export default MeusAterros;
