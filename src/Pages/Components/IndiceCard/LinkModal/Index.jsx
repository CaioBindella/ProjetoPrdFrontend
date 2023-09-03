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
import { indiceDb } from "../../../../Services/SqlTables/sqliteDb";
import { Alert } from "react-native";

const updateLink = (link, codInd, codAnalise) => {
  return new Promise((resolve, reject) => {
    indiceDb.then((data) => {
      data.transaction((tx) => {
        //comando SQL modificável
        tx.executeSql(
          `
            UPDATE AnaliseItem SET Link=?
            WHERE CodInd = ? and CodAnalise = ?
          `,
          [link, codInd, codAnalise],
          //-----------------------
          (_, { rows }) => resolve(rows._array),
          (_, error) => reject(error) // erro interno em tx.executeSql
        );
      });
    });
  });
}

const LinkModal = ({ codInd, codAnalise, setLink, modalVisible, setModalVisible }) => {
  const [url, setUrl] = useState("");

  const handleConfirm = async () => {
    try{
      await updateLink(url, codInd, codAnalise)
      setLink(url);
    }
    catch (e){
      Alert.alert("Erro", "Erro ao salvar link.")
    }
    
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
