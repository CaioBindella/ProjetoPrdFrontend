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

import { Touchable } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import aterro from '../../Services/SqlTables/aterro';

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

	async function loadData () {
		const response = await aterro.all().catch(e => console.log(e))

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

			<Button onPress={() => navigation.navigate('Aterro')}>
				<AntDesign name="plus" size={24} color="black" />
				<Text>Incluir novo Aterro</Text>
			</Button>

			
		</Container>
	);
};

export default MeusAterros;
