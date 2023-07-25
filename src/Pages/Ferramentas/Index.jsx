import React, { useState } from 'react';
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
import ImportModal from './ImportModal/Index';
import { consulta } from '../../Services/Networks/consulta';

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

const getAllTable = (table) => {
	return new Promise((resolve, reject) => {
	  indiceDb.then((data) => {
		data.transaction((tx) => {
		  //comando SQL modificável
		  tx.executeSql(
			`
				SELECT * FROM Indicador I
				INNER JOIN AnaliseItem AI ON AI.CodInd = I.CodInd
				INNER JOIN Analise A ON AI.CodAnalise = A.CodAnalise
				INNER JOIN AvaliacaoPeso AP ON AI.CodAvPeso = AP.CodAvPeso
				INNER JOIN Avaliacao AV ON AP.CodAval = AV.CodAval
				INNER JOIN SubCategoria SC ON I.CodSubCat = SC.CodSubCat
				INNER JOIN Categoria C ON SC.CodCat = C.CodCat
				INNER JOIN TipoIndicador TI ON C.CodTipoInd = TI.CodTipo
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

const makeXLSXFileUnified = async () => {
	var wb = XLSX.utils.book_new();
	const tableData = await getAllTable()
	var ws = XLSX.utils.json_to_sheet(tableData)
	XLSX.utils.book_append_sheet(wb,ws,"Unified Data")
	return XLSX.write(wb, {type:'base64', bookType:"xlsx"})
}


const makeXLSXFileSeparate = async () => {
	var wb = XLSX.utils.book_new();
	const tables = ['Analise', 'AnaliseItem', 'Avaliacao', 'AvaliacaoPeso', 'Categoria', 'Indicador', 'SubCategoria', 'TipoIndicador']
	const tables2 = ["aterro", "municipio", "organizacao", "porte"]

	await Promise.all(
		tables.map(async (eachTable) => {
			const tableData = await getTable(eachTable)
			var ws = XLSX.utils.json_to_sheet(tableData)
			XLSX.utils.book_append_sheet(wb,ws,eachTable)
		})
	)

	await Promise.all(
		tables2.map(async (eachTable) => {
			const tableData = await consulta(eachTable)
			var ws = XLSX.utils.json_to_sheet(tableData)
			XLSX.utils.book_append_sheet(wb,ws,eachTable)
		})
	)
	
	return XLSX.write(wb, {type:'base64', bookType:"xlsx"})
}

const Ferramentas = ({ navigation }) => {
	const [modalVisible, setModalVisible] = useState(false);

	const exportXLSX = async (type) => {
		var wbout
		if(type === "separate"){
			wbout = await makeXLSXFileSeparate()
		}
		else{
			wbout = await makeXLSXFileUnified()
		}
		
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
				{dialogTitle: 'Compartilhe ou copie seu arquivo via:'}
			 ).catch(e =>{
				console.log(e);
			 })
		})
		.catch(e => {
			console.log(e)
		})
	}

	const exportDb = async () => {
		await Sharing.shareAsync(
			FileSystem.documentDirectory + 'SQLite/indicesDatabase.db', 
			{dialogTitle: 'Compartilhe ou copie seu arquivo via:'}
		 ).catch(e =>{
			console.log(e);
		 })
	}


	return (
		<Container>
			<Header title="Ferramentas" />

			<ButtonGroup>
				<Button onPress={() => setModalVisible(true)}>
					<Text>Importar Banco de Dados</Text>
				</Button>

				<Button onPress={() => exportDb()}>
					<Text>Exportar Banco de Dados</Text>
				</Button>

				<Button onPress={() => exportXLSX("separate")}>
					<Text>Exportar como XLSX separado</Text>
				</Button>

				<Button onPress={() => exportXLSX("unified")}>
					<Text>Exportar como XLSX unificado</Text>
				</Button>
			</ButtonGroup>

			<ImportModal modalVisible={modalVisible} setModalVisible={setModalVisible} />
		</Container>
	);
};

export default Ferramentas;
