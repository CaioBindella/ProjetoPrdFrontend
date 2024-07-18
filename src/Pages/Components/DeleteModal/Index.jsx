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

const DeleteModal = ({ modalVisible, setModalVisible, deleteFunction, navigation }) => {

    const handleDelete = async () => {
        const result = await deleteFunction();
        console.log(result);
        if (result == 0) {
          Alert.alert('Erro', 'Falha ao excluir o dado. Verifique se não há registros dependentes desse item.');
        } else {
          Alert.alert('Sucesso', 'Dado excluído com sucesso.');
        }
        setModalVisible(false);
        navigation.navigate('Home');
    };

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
            <Feather name='alert-circle' size={70} color='orange' />
            <ModalTitle>Tem certeza que deseja excluir?</ModalTitle>
            <ModalText>Se confirmar, você perderá esse dado.</ModalText>
            <ModalButtonGroup>
             <ModalButton
                background="#E13F33"
                onPress={() => {
                  setModalVisible(!modalVisible);
									deleteFunction();
                  navigation.navigate('Home')
									
                }}
              >
                <ModalButtonText>Excluir</ModalButtonText>
              </ModalButton>
              <ModalButton
                background="#a6a6a6"
                onPress={() => setModalVisible(!modalVisible)}
              >
                <ModalButtonText>Cancelar</ModalButtonText>
              </ModalButton>
              
            </ModalButtonGroup>
          </ModalContent>
        </ModalView>
      </Modal>
    )
}

export default DeleteModal