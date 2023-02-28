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
import Header from '../Components/Header/Index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
	StatusBar,
	Image,
	View,
	Text,
	Modal,
	TouchableOpacity,
} from 'react-native';

const UmAterro = ({ navigation, route }) => {
	const [modalVisible, setModalVisible] = useState(false);
	const Item = route.params.item;
	const index = route.params.index;

	const deleteAterro = async () => {
		const response = await AsyncStorage.getItem('dataAterro')
		const data = response ? JSON.parse(response) : []
		data.splice(index, 1)
		const stringData = JSON.stringify(data)
		await AsyncStorage.setItem('dataAterro', stringData)

		const response1 = await AsyncStorage.getItem('dataOrganizacao')
		const data1 = response1 ? JSON.parse(response1) : []
		data1.splice(index, 1)
		const stringData1 = JSON.stringify(data1)
		await AsyncStorage.setItem('dataOrganizacao', stringData1)

		const response2 = await AsyncStorage.getItem('dataProfissionais')
		const data2 = response2 ? JSON.parse(response2) : []
		data2.splice(index, 1)
		const stringData2 = JSON.stringify(data2)
		await AsyncStorage.setItem('dataProfissionais', stringData2)

		const response3 = await AsyncStorage.getItem('dataMunicipio')
		const data3 = response3 ? JSON.parse(response3) : []
		data3.splice(index, 1)
		const stringData3 = JSON.stringify(data3)
		await AsyncStorage.setItem('dataMunicipio', stringData3)
	}

	console.log(index)

	return (
		<Container>
			<StatusBar />
			<Header />
			<Content>
				<Button>
					<Text>Atualizar dados do Aterro</Text>
				</Button>

				<Button>
					<Text>Cadastrar Indicadores</Text>
				</Button>

				<Button onPress={() => setModalVisible(!modalVisible)}>
					<Text>Excluir Aterro {Item.Nome}</Text>
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
									deleteAterro();
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

export default UmAterro;
