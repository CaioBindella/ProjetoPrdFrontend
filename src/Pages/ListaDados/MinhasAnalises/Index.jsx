import React, { useEffect, useState } from 'react';
import {
	ItemContainer,
	Card,
	Title,
	Container,
	Button,
	DescText
} from './Style';
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import Header from '../../Components/Header/Index';
import {
	StatusBar,
	View,
	Text,
	FlatList,
	TouchableOpacity,
	ScrollView,
} from 'react-native';

import { indiceDb } from '../../../Services/SqlTables/sqliteDb';
import { AntDesign } from '@expo/vector-icons';

const ItemCard = ({ aterroData, analiseData, navigation, index }) => (
	<TouchableOpacity onPress={() => navigation.navigate("IndicesOptions", {aterroData: aterroData, analiseData: analiseData})}>
		<ItemContainer>
		<Ionicons name="md-analytics-outline" size={44} color="black" />
			<Card>
				<Title>Data: <DescText>{analiseData.DataIni}</DescText></Title>
				<Title>Tipo: <DescText>{analiseData.Tipo}</DescText></Title>
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
		setData(response)
	}

	useEffect(() => {
		// Evita renderizar dados antigos quando voltando para trás na navigation stack
		navigation.addListener('focus', () => {
		  loadData();
		});
	}, [navigation]);


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