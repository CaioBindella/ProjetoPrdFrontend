import React from "react"

import { Feather } from '@expo/vector-icons';

import { Modal, overlay } from "react-native-paper";

import { 
	ModalView, 
	ModalContent, 
	ModalTitle,
	ModalText,
	ModalButtonGroup, 
	ModalButton,
	ModalButtonText,
} from "./Style";

import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';

const ShareModal = ({ modalVisible, setModalVisible, exportType, uri }) => {

	const exportFile = async () => {
		await Sharing.shareAsync(
			FileSystem.documentDirectory + uri, 
			{dialogTitle: 'Compartilhe ou copie seu arquivo via:'}
		).catch(e =>{
			alert(e);
		})
		
		setModalVisible(false)
	}

    return (
        <Modal
			animationType='slide'
			transparent={true}
			visible={modalVisible}
			onRequestClose={() => {
				setModalVisible(!modalVisible);
			}}
			onDismiss={() => {
				setModalVisible(!modalVisible)
			}}
		>
			<ModalView>
				<ModalContent>
					<Feather name='check-circle' size={70} color='green' />
					<ModalTitle>{exportType} exportado com sucesso!</ModalTitle>
					<ModalText>Clique abaixo para compartilhar</ModalText>
					<ModalButtonGroup>
						<ModalButton background="#3f81eb" onPress={() => exportFile()}>
							<ModalButtonText>Compartilhar</ModalButtonText>
						</ModalButton>
						<ModalButton background="#E13F33" onPress={() => setModalVisible(false)}>
							<ModalButtonText>Cancelar</ModalButtonText>
						</ModalButton>
					</ModalButtonGroup>
				</ModalContent>
			</ModalView>
		</Modal>
    )
}

export default ShareModal