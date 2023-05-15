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

const ItemCard = ({ item, navigation, index }) => (
	<TouchableOpacity>
		<ItemContainer>
			<Feather name='home' size={44} color='black' />
			<Card>
				<Title>Tipo: {item.TipoAnalise}</Title>
				<Title>Data: {item.DataIni}</Title>
			</Card>
		</ItemContainer>
	</TouchableOpacity>
);

const MinhasAnalises = ({ navigation, route }) => {
	const Item = route.params.item
	const codAterro = route.params.item.id
	const [data, setData] = useState([]);

	const createAnalysis = (initialDate) => {    
        return new Promise((resolve, reject) => {
			indiceDb.then((data) => {
				data.transaction((tx) => {
				//comando SQL modificável
				tx.executeSql(
					`
					INSERT INTO Analise (DataIni, TipoAnalise, CodAterro) VALUES (?, ?, ?);
					`,
					[initialDate, "Técnico", codAterro],
					//-----------------------
					(_, { rows }) => resolve(rows._array),
					(_, error) => reject(error) // erro interno em tx.executeSql
				);
				});
			});
		})
    };

	const getAnalysisDate = (initialDate, codAnalise) => {
        return new Promise((resolve, reject) => {
            indiceDb.then((data) => {
                data.transaction((tx) => {
                //comando SQL modificável
                tx.executeSql(
                    `SELECT DataIni FROM Analise
                    WHERE DataIni = '${initialDate}' AND CodAterro = ${codAterro}`
                    ,
                    [initialDate, codAterro],
                    //-----------------------
					(_, { rows }) => resolve(rows._array),
					(_, error) => reject(error) // erro interno em tx.executeSql
				);
				});
			});
		})
    };

	const handleButtonPress = async () => {
        const date = new Date();
        console.log(`${date.getMonth()+1}-${date.getFullYear()}`) 
		const checkDate = await getAnalysisDate(`${date.getMonth()+1}-${date.getFullYear()}`, codAterro)

		if(checkDate.length > 0){
			console.log("existe algo")
		}
		else{
			await createAnalysis(`${date.getMonth()+1}-${date.getFullYear()}`)
		}
    }

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
		loadData()
	}, []);


	return (
		<Container>
			<StatusBar />
			<Header title="Minhas Análises"/>

			<ScrollView>

				{data ?
					data.map((eachData, index) => {
						return(
							<ItemCard
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

			<Button onPress={async () => {
				navigation.navigate('IndicesOptions', {item: Item})
				await handleButtonPress()
			}}>
				<AntDesign name="plus" size={24} color="black" />
				<Text>Incluir nova analise </Text>
			</Button>

		</Container>
	);
};

export default MinhasAnalises;