import React from "react";
import {
  ModalView,
  ModalContent,
  ModalTitle,
  ModalText,
  ModalButton,
  ModalButtonText,
} from "./Style";

import { Feather } from "@expo/vector-icons";
import { Modal, Portal } from "react-native-paper";

const HelpModal = ({ modalVisible, setModalVisible }) => {

  return (
    <Portal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
        onDismiss={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <ModalView>
          <ModalContent>
          <Feather name="help-circle" size={70} color="black"/>
            <ModalTitle>Ajuda para salvar dados de comprovante</ModalTitle>

            <ModalText>Para salvar o link do comprovante: </ModalText>
            <ModalText>1. Clique no botão Link do Comprovante. </ModalText>
            <ModalText>2. Procure o arquivo que desejar e copie seu link do Google Drive. </ModalText>
            <ModalText>3. Volte para o App ISOAS e cole o link na caixa de texto que irá aparecer. </ModalText>
            <ModalText>4. Clique no botão Confirmar. </ModalText>
            <ModalText>5. Em caso de erro, exclua o link atual e refaça o processo acima. </ModalText>

            <ModalButton
                background="#E13F33"
                onPress={() => setModalVisible(!modalVisible)}
              >
              <ModalButtonText>Sair</ModalButtonText>
            </ModalButton>
          </ModalContent>
        </ModalView>
      </Modal>
    </Portal>
  );
};

export default HelpModal;
