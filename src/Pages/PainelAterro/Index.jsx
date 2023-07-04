import React, { useEffect, useState } from 'react';
import {
	ContainerAterros,
	Aterro,
	Title,
	Container,
	Button,
	Content,
	ModalView,
	ModalTitle,
	ModalContent,
	ModalButtonGroup,
	ModalButton,
	ModalButtonText,
} from './Style';
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

import Header from '../Components/Header/Index';
import {
	StatusBar,
	Image,
	View,
	Text,
	Modal,
	TouchableOpacity,
} from 'react-native';

import { AntDesign } from '@expo/vector-icons';
import { excluir } from '../../Services/Networks/excluir';

const PainelAterro = ({ navigation, route }) => {
	const [modalVisible, setModalVisible] = useState(false);
	const aterroData = route.params.aterroData;

	async function deleteData () {
		excluir(aterroData.id, 'aterro')
	}


	return (
		<Container>
			<StatusBar />
			<Header title={`${aterroData.Nome}`}/>
			<Content>
				<Button onPress={() => navigation.navigate('UpdateUmAterro', {aterroData: aterroData})}>
					<AntDesign name="reload1" size={24} color="blue" />
					<Text>Atualizar dados</Text>
				</Button>

				<Button onPress={() => navigation.navigate('MinhasAnalises', {aterroData: aterroData})}>
					<Ionicons name="md-analytics-outline" size={24} color="green" />
					<Text>Cadastrar ISOAS</Text>
				</Button>

				<Button onPress={() => setModalVisible(!modalVisible)}>
					<AntDesign name="delete" size={24} color="red" />
					<Text>Excluir Aterro {aterroData.Nome}</Text>
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
						<ModalTitle>Tem certeza que deseja excluir esse Aterro?</ModalTitle>
						<Text>Se confirmar você não voltará a ver esse Aterro</Text>
						<ModalButtonGroup>
							<ModalButton
								style={{ backgroundColor: '#a6a6a6' }}
								onPress={() => setModalVisible(!modalVisible)}>
								<ModalButtonText>Cancelar</ModalButtonText>
							</ModalButton>
							<ModalButton
								style={{ backgroundColor: 'red' }}
								onPress={() => {
									setModalVisible(!modalVisible);
									deleteData();
									alert('Excluido');
									navigation.navigate('Home')
								}}>
								<ModalButtonText>Excluir</ModalButtonText>
							</ModalButton>
						</ModalButtonGroup>
					</ModalContent>
				</ModalView>
			</Modal>
		</Container>
	);
};

export default PainelAterro;
