import React from "react";

import {
	Container,
	Button,
	Content,
	Text,
	Title,
} from './Style'

import { StatusBar, Image, View } from 'react-native';
import Header from "../../Components/Header/Index";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import { useEffect } from "react";

function SelectDate({ navigation, route }) {
    const Item = route.params.item;
    const [date, setDate] = useState(new Date())
    const [showDatePicker, setShowDatePicker] = useState(false)

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

	// useEffect(() => {
	// 	console.log(date, showDatePicker)
	// }, [date, showDatePicker])

    return(
        <Container>
            <Header title={`Índices de ${Item.Nome}`}/>
            <Content>
			
			<Title>Coloque a data referente ao ínicio da Análise</Title>
			<Title>{date.getDate()}</Title>

			{showDatePicker &&(
				<RNDateTimePicker value={date} mode="date" onChange={onChange}/>
				)	
			}

			<Button onPress={() => toogleDatePicker()}>    
				<Text>Selecionar Data</Text>
			</Button>

			</Content>
        </Container>
    );
};

export default SelectDate;