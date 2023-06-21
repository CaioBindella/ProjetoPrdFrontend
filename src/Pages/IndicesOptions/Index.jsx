import React, { useState } from "react";
import { indiceDb } from "../../Services/SqlTables/sqliteDb";
import {
	Container,
	Button,
	Content,
	Text,
	ModalView,
	ModalTitle,
	ModalContent,
	ModalButtonGroup,
	ModalButton,
	ModalButtonText,
} from './Style'

import { Modal } from 'react-native';
import Header from "../Components/Header/Index";
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { excluir } from "../../Services/Networks/excluir";

const deleteAnaliseItem = (codAnalise) => {
	return new Promise((resolve, reject) => {
	  indiceDb.then((data) => {
		data.transaction((tx) => {
		  //comando SQL modificável
		  tx.executeSql(
			  `
			  	DELETE FROM AnaliseItem WHERE CodAnalise=?;"
			  `,
			[codAnalise],
			//-----------------------
			(_, { rows }) => resolve(rows._array),
			(_, error) => reject(error) // erro interno em tx.executeSql
		  );
		});
	  });
	});
  }


function IndicesOptions({ navigation, route }) {
    const aterroData = route.params.aterroData;
	const analiseData = route.params.analiseData;
	const [modalVisible, setModalVisible] = useState(false);

	const tecnicoInfo = {
		details:{
			maxScore: 638,
			firstQuestion: 1,
			lastQuestion: 78,
		},
		data: [
			{
				category: "Características Locacionais",
				subCategories: [
					{name: "Características fisiográficas", maxScore: 71},
					{name: "Interface socioambiental", maxScore: 51},
					{name: "Sistema viário público de acesso", maxScore: 40},
				]
			},
			{
				category: "Infraestrutura Implantada",
				subCategories: [
					{name: "Avaliação da infraestrutura implantada", maxScore: 72},
					{name: "Avaliação do sistema de controle implantado", maxScore: 98}
				]
			},
			{
				category: "Condições Operacionais",
				subCategories: [
					{name: "Caracteristicas operacionais", maxScore: 104},
					{name: "Avaliação da Eficiência dos Sistemas de Controle", maxScore: 125},
					{name: "Documentos básicos e diretrizes operacionais", maxScore: 77},
				]
			}
		]
	}

    const economicoInfo = {
		details:{
			maxScore: 53,
			firstQuestion: 79,
			lastQuestion: 90,
		},
		data: [
			{
				category: "Avaliações",
				subCategories: [
					{name: "Disponibilidade de Equipamentos Mínimos Obrigatórios", maxScore: 53},
					{name: "Inadimplência", maxScore: 54} // Seria 0, mas eu coloquei assim para evitar erros na hora de pegar a pontuação dessa subcategoria
				]
			}
		]
	}

	const socialInfo = {
		details:{
			maxScore: 133,
			firstQuestion: 91,
			lastQuestion: 105,
		},
		data: [
			{
				category: "Avaliação Social",
				subCategories: [
					{name: "Percepção social dos impactos ambientais negativos da atividade", maxScore: 133},
				]
			}
		]
	}

	const deleteData = async () => {
		setModalVisible(!modalVisible);
		await deleteAnaliseItem(analiseData.CodAnalise)
		await excluir(analiseData.CodAnalise, 'analise')
		alert('Excluido');
		navigation.navigate('Home')
	}

    return(
        <Container>
            <Header title={`Índices de ${aterroData.Nome} ${analiseData.DataIni}`}/>
            <Content>
				<Button onPress={() => navigation.navigate('Indicador', {type: "Técnico", aterroData: aterroData, analiseData: analiseData, indicadorData: tecnicoInfo.data, indicadorDetails: tecnicoInfo.details})}>
					<Text>Cadastrar Indicador Técnico</Text>
				</Button>

				<Button onPress={() => navigation.navigate('Indicador', {type: "Econômico", aterroData: aterroData, analiseData: analiseData, indicadorData: economicoInfo.data, indicadorDetails: economicoInfo.details})}>
					<Text>Cadastrar Indicador Econômico</Text>
				</Button>

				<Button onPress={() => navigation.navigate('Indicador', {type: "Social", aterroData: aterroData, analiseData: analiseData, indicadorData: socialInfo.data, indicadorDetails: socialInfo.details})}>
					<Text>Cadastrar Indicador Social</Text>
				</Button>

				<Button onPress={() => setModalVisible(!modalVisible)}>
					<AntDesign name="delete" size={24} color="red" />
					<Text>Excluir Analise {analiseData.DataIni}</Text>
				</Button>
			</Content>
			<Modal
				animationType='slide'
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => {
					Alert.alert('Modal has been closed.');
					setModalVisible(!modalVisible);
				}}>
				<ModalView>
					<ModalContent>
						<Feather name='alert-circle' size={70} color='orange' />
						<ModalTitle>Tem certeza que deseja excluir?</ModalTitle>
						<Text>Se confirmar você não voltará a ver esse dado</Text>
						<ModalButtonGroup>
							<ModalButton
								style={{ backgroundColor: '#a6a6a6' }}
								onPress={() => setModalVisible(!modalVisible)}>
								<ModalButtonText>Cancelar</ModalButtonText>
							</ModalButton>
							<ModalButton
								style={{ backgroundColor: 'red' }}
								onPress={() => deleteData()}>
								<ModalButtonText>Excluir</ModalButtonText>
							</ModalButton>
						</ModalButtonGroup>
					</ModalContent>
				</ModalView>
			</Modal>
        </Container>
    );
};

export default IndicesOptions;