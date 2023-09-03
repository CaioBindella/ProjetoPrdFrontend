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
									Alert.alert("Sucesso", "Dado exluído com sucesso.")
									
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