import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Modal } from 'react-native';
import * as Sharing from 'expo-sharing';

import {
  ButtonContainer,
  ButtonPhoto,
  ButtonCamera,
  CameraContainer,
  ModalContainer,
  MContainer,
  ModalText, 
  ButtonSave,
  ButtonModalContainer
} from "./style"

const ImageSettings = ({ visible, onDelete, onClose, onSave, photo }) => {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  if (!visible) {
    return null;
  }

  const sharePhoto = async () => {
    if (photo) {
      await Sharing.shareAsync(photo.uri);
    }
  };
 

  const deletePhoto = () => {
    setShowDeleteConfirmation(true);
  };

  const confirmDeletePhoto = () => {
    onDelete();
    setShowDeleteConfirmation(false);
  };
  

  const cancelDeletePhoto = () => {
    setShowDeleteConfirmation(false);
  };

  const handleSavePhoto = () => {
    onSave(); 
    onClose();
  };

    return (
      <Modal visible={visible} animationType="slide">
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Image source={{ uri: photo }} style={{ width: '80%', height: '80%', resizeMode: 'contain', borderRadius: 10 }} />
            <ButtonContainer>
              <ButtonPhoto onPress={sharePhoto}>
                <Text>Compartilhar</Text>
              </ButtonPhoto>
              <ButtonPhoto onPress={deletePhoto}>
                <Text>Excluir</Text>
              </ButtonPhoto>
            </ButtonContainer>
          </View>
          <Modal visible={showDeleteConfirmation} transparent animationType="fade">
          <MContainer>
            <ModalContainer>
              <ModalText>Tem certeza que deseja excluir a imagem?</ModalText>
              <ButtonModalContainer>
                <ButtonPhoto onPress={confirmDeletePhoto}>
                  <Text>Excluir</Text>
                </ButtonPhoto>
                <ButtonPhoto onPress={cancelDeletePhoto}>
                  <Text>Cancelar</Text>
                </ButtonPhoto>
              </ButtonModalContainer>
            </ModalContainer>
          </MContainer>
          </Modal>
        </View>
        <ButtonContainer>
          <ButtonSave title="Salvar Foto" onPress={handleSavePhoto}>
            <Text>Salvar</Text>
          </ButtonSave>
        </ButtonContainer>
      </Modal>
    );
}

export default ImageSettings;