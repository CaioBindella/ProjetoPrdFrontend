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
import { indiceDb } from '../../../Services/SqlTables/sqliteDb';
import { Touchable } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const ItemCard = ({ aterroData, analiseData, navigation, index }) => (
	<TouchableOpacity onPress={() => navigation.navigate("IndicesOptions", {aterroData: aterroData, analiseData: analiseData})}>
		<ItemContainer>
			<Feather name='home' size={44} color='black' />
			<Card>
				<Title>Data: {analiseData.DataIni}</Title>
			</Card>
		</ItemContainer>
	</TouchableOpacity>
);

const MinhasAnalises = ({ navigation, route }) => {
	const aterroData = route.params.aterroData
	const [data, setData] = useState([]);

	const getAnalysis = () => {
		return new Promise((resolve, reject) => {
			indiceDb.then((data) => {
				data.transaction((tx) => {
				//comando SQL modificável
				tx.executeSql(
					`
					SELECT * FROM Analise;
					`,
					[],
					//-----------------------
					(_, { rows }) => resolve(rows._array),
					(_, error) => reject(error) // erro interno em tx.executeSql
				);
				});
			});
		})
	}

	const loadData = async () => {
		const response = await getAnalysis()
		console.log('estou aqui')
		setData(response)
	}

	useEffect(() => {
		loadData()
	}, []);


	return (
		<Container>
			<StatusBar />
			<Header title={`Análise - ${aterroData.Nome}`}/>

			<ScrollView>

				{data ?
					data.map((eachData, index) => {
						return(
							<ItemCard
								analiseData={eachData}
								aterroData={aterroData}
								key={index}
								navigation={navigation}
							/>
						)
					})
					:
					null
				}
			</ScrollView>

			<Button onPress={async () => navigation.navigate('SelectDate', {aterroData: aterroData})}>
				<AntDesign name="plus" size={24} color="black" />
				<Text>Incluir nova analise </Text>
			</Button>

		</Container>
	);
};

export default MinhasAnalises;