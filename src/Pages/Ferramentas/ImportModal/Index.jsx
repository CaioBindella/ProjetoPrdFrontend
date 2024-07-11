import React, { useState } from "react"
import { 
    ModalView, 
    ModalContent, 
    ModalTitle,
	ModalText,
    ModalButtonGroup, 
    ModalButton,
    ModalButtonText
} from "./Style";

import { Feather } from '@expo/vector-icons';
import { Modal } from "react-native-paper";
import { Alert } from "react-native";

import * as DocumentPicker from "expo-document-picker"
import * as FileSystem from 'expo-file-system';
import * as Updates from 'expo-updates';

const ImportModal = ({ modalVisible, setModalVisible }) => {
	const [firstAlert, setFirstAlert] = useState(true)

	const pickDocument = async () => {
		let result = await DocumentPicker.getDocumentAsync({type: ["application/octet-stream", "application/x-sqlite3"], multiple: false});

		if(result.canceled){
			setFirstAlert(true)
			return
		}

		try {
			// Deleta o arquivo .db atual
			if ((await FileSystem.getInfoAsync(FileSystem.documentDirectory + "SQLite/indicesDatabase.db")).exists) {
				await FileSystem.deleteAsync(FileSystem.documentDirectory + "SQLite/indicesDatabase.db")
			}
			
			// Copia o escolhido com o nome de indicesDatabase.db
			await FileSystem.copyAsync({
				from: result.assets[0].uri,
				to: FileSystem.documentDirectory + 'SQLite/indicesDatabase.db'
			})

			Alert.alert("Sucesso", "Importação concluída com sucesso!")
			
			// Reinicia o aplicativo em produção
			Updates.reloadAsync()
		} catch (error) {
			Alert.alert("Erro", "Erro ao importar banco de dados.")
		}
	};

	const handleImportButton = () => {
		if (firstAlert){
			setFirstAlert(false)
			return
		}

		pickDocument()
		setModalVisible(!modalVisible)
	}

    return (
        <Modal
			animationType='slide'
			transparent={true}
			visible={modalVisible}
			onRequestClose={() => {
				setModalVisible(!modalVisible)
				setFirstAlert(true)
			}}
			onDismiss={() => {
				setModalVisible(!modalVisible)
				setFirstAlert(true)
			}}
		>
			<ModalView>
				<ModalContent>
					<Feather name='alert-circle' size={70} color='orange' />
					{firstAlert ?
						<>
							<ModalTitle>Tem certeza que deseja importar o banco de dados?</ModalTitle>
							<ModalText>Se confirmar, você perderá seus dados atuais</ModalText>
						</>
						:
						<>
							<ModalTitle>Novamente, você tem absoluta certeza? Você perderá seus dados atuais</ModalTitle>
						</>
					}
					<ModalButtonGroup>
						<ModalButton
							background="#3f81eb"
							onPress={() => {
								handleImportButton()
							}}>
							<ModalButtonText>Importar</ModalButtonText>
						</ModalButton>
						<ModalButton
							background="#E13F33"
							onPress={() => {
								setModalVisible(!modalVisible)
								setFirstAlert(true)
							}}>
							<ModalButtonText>Cancelar</ModalButtonText>
						</ModalButton>
					</ModalButtonGroup>
				</ModalContent>
			</ModalView>
		</Modal>
    )
}

export default ImportModal