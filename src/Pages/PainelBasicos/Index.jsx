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

import { AntDesign } from '@expo/vector-icons';
import { excluir } from '../../Services/Networks/excluir';
import DeleteModal from '../Components/DeleteModal/Index';

const PainelBasicos = ({ navigation, route }) => {
	const [modalVisible, setModalVisible] = useState(false);
	const Item = route.params.item;
	const table = route.params.table;
	let updateRoute;

	async function deleteData () {
		switch(table){
			case 'organizacao':
				return await excluir(Item.CodOrganizacao, table);
			case 'municipio':
				return await excluir(Item.CodMunicipio, table);

		}
	}

	switch(table){
		case 'organizacao':
			updateRoute = "UpdateOrg";
			break;
		case 'municipio':
			updateRoute = "UpdateUmMunicipio";
			break;

		/* //Função de atualizar portes desabilitada!
			case 'porte':
			updateRoute = "UpdatePorte";
			break;
		*/
	}

	return (
		<Container>
			<StatusBar />
			<Header title={`${Item.Nome}`}/>
			<Content>
				<Button onPress={() => navigation.navigate(updateRoute, {item: Item})}>
					<AntDesign name="reload1" size={24} color="blue" />
					<Text>Atualizar dados</Text>
				</Button>

				<Button onPress={() => setModalVisible(!modalVisible)}>
					<AntDesign name="delete" size={24} color="red" />
					<Text>Excluir {Item.Nome}</Text>
				</Button>
			</Content>

			<DeleteModal modalVisible={modalVisible} setModalVisible={setModalVisible} navigation={navigation} deleteFunction={deleteData}/>
		</Container>
	);
};

export default PainelBasicos;
