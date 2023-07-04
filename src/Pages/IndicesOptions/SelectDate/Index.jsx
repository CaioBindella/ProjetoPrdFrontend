import React from "react";

import {
	Container,
	Button,
	Content,
	Text,
	Title,
	ContentPicker
} from './Style'

import Header from "../../Components/Header/Index";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import { indiceDb } from "../../../Services/SqlTables/sqliteDb";
import { inclui } from "../../../Services/Networks/inclui";
import DropDownPicker from "react-native-dropdown-picker";

function SelectDate({ navigation, route }) {
    const aterroData = route.params.aterroData;
    const [date, setDate] = useState(new Date())
    const [showDatePicker, setShowDatePicker] = useState(false)

	const [openTypeAnalysis, setOpenTypeAnalysis] = useState(false);
	const [valueTypeAnalysis, setValueTypeAnalysis] = useState(null);
	const [itemsTypeAnalysis, setItemsTypeAnalysis] = useState([
		{label: 'Análise por Entrevista', value: 'Análise por Entrevista'},
		{label: 'Análise de Risco', value: 'Análise de Risco'}
	]);

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
			if(date && valueTypeAnalysis){
				const data = {
					initialDate: initialDate, 
					codAterro: aterroData.id,
					typeAnalysis: valueTypeAnalysis
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
				alert("Preencha a abordagem da análise")
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
			

			{showDatePicker &&(
				<RNDateTimePicker value={date} mode="date" onChange={onChange}/>
				)	
			}

			<Button onPress={() => toogleDatePicker()}>    
				<Text>Data: {`${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`}</Text>
			</Button>

			<Title>Selecione abordagem da análise:</Title>
			<ContentPicker>
				<DropDownPicker
					open={openTypeAnalysis}
					value={valueTypeAnalysis}
					items={itemsTypeAnalysis}
					setOpen={setOpenTypeAnalysis}
					setValue={setValueTypeAnalysis}
					setItems={setItemsTypeAnalysis}
					placeholder="Selecione o tipo de abordagem"
					zIndex={3000}
					zIndexInverse={1000}
				/>
			</ContentPicker>

			
			<Button onPress={() => handleButtonPress()}>    
				<Text>Continuar</Text>
			</Button>

			</Content>
        </Container>
    );
};

export default SelectDate;