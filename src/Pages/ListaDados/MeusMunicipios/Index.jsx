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

const Item = ({ Nome, TamPop, TaxGerPerCapita, PrecipMedAnual, item, navigation, index }) => (
	<TouchableOpacity onPress={()=> navigation.navigate('UmAterro',{item: item, index:index})}>
		<ItemContainer>
			<Feather name='home' size={44} color='black' />
			<Card>
				<Title>{Nome}</Title>
				<Text>População: {TamPop}</Text>
				<Text>Geração Per Capita: {TaxGerPerCapita}</Text>
				<Text>Precipitação Média Anual: {PrecipMedAnual}</Text>
			</Card>
		</ItemContainer>
	</TouchableOpacity>
);

const MeusMunicipios = ({ navigation }) => {
	const [data, setData] = useState([]);

	async function loadData () {
		const response = await consulta('municipio')

		setData(response)
	}

	useEffect( () => {
		loadData()
	}, []);


	return (
		<Container>
			<StatusBar />
			<Header title="Meus Municipios"/>

			<ScrollView>

				{data ?
					data.map((eachData, index) => {
						return(
							<Item
								Nome={eachData.Nome}
								TamPop={eachData.TamPop}
								TaxGerPerCapita={eachData.TaxGerPerCapita}
								PrecipMedAnual={eachData.PrecipMedAnual}
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
				<Text>Incluir novo Municipio</Text>
			</Button>

			
		</Container>
	);
};

export default MeusMunicipios;
