import React, { useState } from "react";

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


function IndicesOptions({ navigation, route }) {
    const aterroData = route.params.aterroData;
	const analiseData = route.params.analiseData;
	const [modalVisible, setModalVisible] = useState(false);

	const deleteData = async () => {
		setModalVisible(!modalVisible);
		await excluir(analiseData.CodAnalise, 'analise')
		alert('Excluido');
		navigation.navigate('Home')
	}

    return(
        <Container>
            <Header title={`Índices de ${aterroData.Nome}`}/>
            <Content>
				<Button onPress={() => navigation.navigate('Indicador', {type: "Técnico", aterroData: aterroData, analiseData: analiseData})}>
					<Text>Cadastrar Indicador Técnico</Text>
				</Button>

				<Button>
					<Text>Cadastrar Indicador Econômico</Text>
				</Button>

				<Button>
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