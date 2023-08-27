import React, { useState } from "react";
import {
  ModalView,
  ModalContent,
  ModalTitle,
  ModalText,
  ModalButtonGroup,
  ModalButton,
  ModalButtonText,
  Input,
} from "./Style";

import { Entypo } from "@expo/vector-icons";
import { Modal, Portal } from "react-native-paper";

const LinkModal = ({ setLink, modalVisible, setModalVisible }) => {
  const [url, setUrl] = useState("");

  const handleConfirm = () => {
    setLink(url);
    setModalVisible(!modalVisible);
  };

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
            <Entypo name="link" size={70} color="black" />
            <ModalTitle>Insira o link do comprovante</ModalTitle>

            <Input
              value={url}
              onChangeText={(url) => setUrl(url)}
              placeholder={"Entre com o Link do Google Drive"}
            />

            <ModalButtonGroup>
              <ModalButton background="#3f81eb" onPress={() => handleConfirm()}>
                <ModalButtonText>Confirmar</ModalButtonText>
              </ModalButton>
              <ModalButton
                background="#E13F33"
                onPress={() => setModalVisible(!modalVisible)}
              >
                <ModalButtonText>Cancelar</ModalButtonText>
              </ModalButton>
            </ModalButtonGroup>
          </ModalContent>
        </ModalView>
      </Modal>
    </Portal>
  );
};

export default LinkModal;
