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

const Item = ({ Nome, Cnpj, Contato, item, navigation, index }) => (
	<TouchableOpacity onPress={()=> navigation.navigate('UmAterro',{item: item, index:index})}>
		<ItemContainer>
			<Feather name='home' size={44} color='black' />
			<Card>
				<Title>{Nome}</Title>
				<Text>CNPJ: {Cnpj}</Text>
				<Text>Contato: {Contato}</Text>
			</Card>
		</ItemContainer>
	</TouchableOpacity>
);

const MinhasOrganizacoes = ({ navigation }) => {
	const [data, setData] = useState([]);

	async function loadData () {
		const response = await consulta('organizacao')

		setData(response)
	}

	useEffect( () => {
		loadData()
	}, []);


	return (
		<Container>
			<StatusBar />
			<Header title="Minhas Organizações"/>

			<ScrollView>

				{data ?
					data.map((eachData, index) => {
						return(
							<Item
								Nome={eachData.Nome}
								Cnpj={eachData.Cnpj}
								Contato={eachData.Contato}
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

			<Button onPress={() => navigation.navigate('Organizacao')}>
				<AntDesign name="plus" size={24} color="black" />
				<Text>Incluir nova Organização</Text>
			</Button>

			
		</Container>
	);
};

export default MinhasOrganizacoes;
