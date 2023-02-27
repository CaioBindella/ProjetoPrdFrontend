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
									alert('Excluido');
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
