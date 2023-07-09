import React from 'react';
import {
	Container,
	Button,
	Text,
	ButtonGroup,
} from './Style';

import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import * as XLSX from 'xlsx'
import { indiceDb } from '../../Services/SqlTables/sqliteDb';

import Header from '../Components/Header/Index';

const getTable = (table) => {
	return new Promise((resolve, reject) => {
	  indiceDb.then((data) => {
		data.transaction((tx) => {
		  //comando SQL modificável
		  tx.executeSql(
			`
			SELECT * FROM ${table};"
			`,
			[],
			//-----------------------
			(_, { rows }) => resolve(rows._array),
			(_, error) => reject(error) // erro interno em tx.executeSql
		  );
		});
	  });
	});
}


const makeXLSXFile = async () => {
	var wb = XLSX.utils.book_new();
	const tables = ['Analise', 'AnaliseItem', 'Avaliacao', 'AvaliacaoPeso', 'Categoria', 'Indicador', 'SubCategoria', 'TipoIndicador']

	await Promise.all(
		tables.map(async (eachTable) => {
			const tableData = await getTable(eachTable)
			var ws = XLSX.utils.json_to_sheet(tableData)
			XLSX.utils.book_append_sheet(wb,ws,eachTable)
		})
	)
	
	return XLSX.write(wb, {type:'base64', bookType:"xlsx"})
	
}

const Ferramentas = ({ navigation }) => {
	const exportXLSX = async () => {
		const wbout = await makeXLSXFile()
		
		const uri = FileSystem.documentDirectory + "XLSX/indicesDatabase.xlsx"

		if (!(await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'XLSX')).exists) {
			await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'XLSX');
		}

		// Write generated excel to Storage and Share
		FileSystem.writeAsStringAsync(uri, wbout, {
			encoding: FileSystem.EncodingType.Base64
		})
		.then(async () => {
			await Sharing.shareAsync(
				uri, 
				{dialogTitle: 'share or copy your XLSX file via'}
			 ).catch(error =>{
				console.log(error);
			 })
		})
		.catch((error) => {
			console.log(error)
		})
	}

	const exportDb = async () => {
		await Sharing.shareAsync(
			FileSystem.documentDirectory + 'SQLite/indicesDatabase.db', 
			{dialogTitle: 'share or copy your DB via'}
		 ).catch(error =>{
			console.log(error);
		 })
	}
	return (
		<Container>
			<Header title="Ferramentas" />

			<ButtonGroup>
				<Button onPress={() => navigation.navigate('CadastrosBasicos')}>
					<Text>Importar Banco de Dados</Text>
				</Button>

				<Button onPress={() => exportDb()}>
					<Text>Exportar Banco de Dados</Text>
				</Button>

				<Button onPress={() => exportXLSX()}>
					<Text>Exportar como XLSX</Text>
				</Button>
			</ButtonGroup>
		</Container>
	);
};

export default Ferramentas;
