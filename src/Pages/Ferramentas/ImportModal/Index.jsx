import React from "react"
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

import * as DocumentPicker from "expo-document-picker"
import * as FileSystem from 'expo-file-system';
import * as Updates from 'expo-updates';

const ImportModal = ({ modalVisible, setModalVisible }) => {
	const pickDocument = async () => {
		let result = await DocumentPicker.getDocumentAsync({});

		if(result.type === "cancel"){
			return
		}

		// Verifica se o tipo de arquivo é equivalente a .db e se ocorreu tudo certo
		if (result.mimeType === "application/octet-stream"){
			// Deleta o arquivo .db atual
			if ((await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'SQLite/indicesDatabase.db')).exists) {
				await FileSystem.deleteAsync(FileSystem.documentDirectory + "SQLite/indicesDatabase.db")
			}
			
			// Copia o escolhido com o nome de indicesDatabase.db
			await FileSystem.copyAsync({
				from: result.uri,
				to: FileSystem.documentDirectory + 'SQLite/indicesDatabase.db'
			})

			alert("Importação concluída com sucesso!")
			
			// Reinicia o aplicativo em produção
			// Updates.reloadAsync()
		}
		else{
			alert("Escolha um arquivo com a extensão .db")
		}
	};

    return (
        <Modal
			animationType='slide'
			transparent={true}
			visible={modalVisible}
			onRequestClose={() => {
				setModalVisible(!modalVisible);
			}
		}>
			<ModalView>
				<ModalContent>
					<Feather name='alert-circle' size={70} color='orange' />
					<ModalTitle>Tem certeza que deseja importar o banco de dados?</ModalTitle>
					<ModalText>Se confirmar, você perderá seus dados atuais</ModalText>
					<ModalButtonGroup>
						<ModalButton
							style={{ backgroundColor: '#a6a6a6' }}
							onPress={() => setModalVisible(!modalVisible)}>
							<ModalButtonText>Cancelar</ModalButtonText>
						</ModalButton>
						<ModalButton
							style={{ backgroundColor: 'red' }}
							onPress={() => {
								pickDocument()
								setModalVisible(!modalVisible);
							}}>
							<ModalButtonText>Importar</ModalButtonText>
						</ModalButton>
					</ModalButtonGroup>
				</ModalContent>
			</ModalView>
		</Modal>
    )
}

export default ImportModal