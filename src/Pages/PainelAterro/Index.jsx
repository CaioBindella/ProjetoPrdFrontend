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
import DeleteModal from '../Components/DeleteModal/Index';

const PainelAterro = ({ navigation, route }) => {
	const [modalVisible, setModalVisible] = useState(false);
	const aterroData = route.params.aterroData;

	async function deleteData () {
		return await excluir(aterroData.CodAterro, 'aterro')
	}

	return (
		<Container>
			<StatusBar />
			<Header title={`${aterroData.Nome}`}/>
			<Content>
				<Button onPress={() => navigation.navigate('CadastroAterro', {aterroData: aterroData, isUpdate: true})}>
					<AntDesign name="reload1" size={24} color="blue" />
					<Text>Atualizar dados</Text>
				</Button>

				<Button onPress={() => setModalVisible(!modalVisible)}>
					<AntDesign name="delete" size={24} color="red" />
					<Text>Excluir {aterroData.Nome}</Text>
				</Button>
			</Content>

			<DeleteModal modalVisible={modalVisible} setModalVisible={setModalVisible} navigation={navigation} deleteFunction={deleteData}/>
		</Container>
	);
};

export default PainelAterro;
