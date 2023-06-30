import React from "react";

import {
	Container,
	Button,
	Content,
	Text,
	Title,
} from './Style'

import Header from "../../Components/Header/Index";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import { indiceDb } from "../../../Services/SqlTables/sqliteDb";
import { inclui } from "../../../Services/Networks/inclui";

function SelectDate({ navigation, route }) {
    const aterroData = route.params.aterroData;
    const [date, setDate] = useState(new Date())
    const [showDatePicker, setShowDatePicker] = useState(false)

	const getPreviousAnalysis = (initialDate, codAterro) => {
        return new Promise((resolve, reject) => {
            indiceDb.then((data) => {
                data.transaction((tx) => {
                //comando SQL modificável
                tx.executeSql(
                    `SELECT * FROM Analise
                    WHERE DataIni = '${initialDate}' AND CodAterro = ${codAterro}`
                    ,
                    [],
                    //-----------------------
					(_, { rows }) => resolve(rows._array),
					(_, error) => reject(error) // erro interno em tx.executeSql
				);
				});
			});
		})
    };

	const handleButtonPress = async () => {
		const initialDate = `${date.getMonth()+1}-${date.getFullYear()}`
		const result = await getPreviousAnalysis(initialDate, aterroData.id)

		if(result.length === 0){
			const data = {
				initialDate: initialDate, 
				codAterro: aterroData.id
			}
			try{
				await inclui("analise", data)
				const analiseData = await getPreviousAnalysis(initialDate, aterroData.id)
				navigation.navigate('IndicesOptions', {aterroData: aterroData, analiseData: analiseData[0]})
			}catch (e) {
				console.log(e)
				alert("Ocorreu um erro ao criar análise")
			}
		}
		else{
			alert("Já existe uma análise nesse mês, entre com outro período")
		}		
	}

	const toogleDatePicker = () => {
		setShowDatePicker(!showDatePicker)
	}

	const onChange = ({ type }, selectedDate) => {
		if(type == 'set'){
			const currentDate = selectedDate
			setDate(currentDate)
			toogleDatePicker()
		}
		else{
			toogleDatePicker()
		}
	  };

    return(
        <Container>
            <Header title={`Índices de ${aterroData.Nome}`}/>
            <Content>
			
			<Title>Coloque a data referente ao ínicio da Análise</Title>
			<Text>Data: {`${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`}</Text>

			{showDatePicker &&(
				<RNDateTimePicker value={date} mode="date" onChange={onChange}/>
				)	
			}

			<Button onPress={() => toogleDatePicker()}>    
				<Text>Selecionar Data</Text>
			</Button>

			
			<Button onPress={() => handleButtonPress()}>    
				<Text>Continuar</Text>
			</Button>

			</Content>
        </Container>
    );
};

export default SelectDate;