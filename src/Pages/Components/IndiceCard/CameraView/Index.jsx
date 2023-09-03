import React, { useState, useEffect, useRef } from 'react';
import { View, TouchableOpacity, Image, Text, Modal, Button } from 'react-native';
import { Camera } from 'expo-camera';
import * as Sharing from 'expo-sharing';
import * as ImageManipulator from 'expo-image-manipulator';
import { FontAwesome } from '@expo/vector-icons';
import { Entypo, Fontisto, Ionicons } from '@expo/vector-icons';

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

const CameraComponent = ({ visible, onClose, onPhotoTaken }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const previousType = useRef(type);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (camera) {
      const photoData = await camera.takePictureAsync();
      const compressedPhoto = await compressImage(photoData);
      setPhoto(compressedPhoto);
      setShowPreview(true);
    }
  };

  const compressImage = async (photoData) => {
    const manipResult = await ImageManipulator.manipulateAsync(
      photoData.uri,
      [{ resize: { width: 800 } }],
      { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }
    );
    return manipResult;
  };

  const sharePhoto = async () => {
    if (photo) {
      await Sharing.shareAsync(photo.uri);
    }
  };

  const deletePhoto = () => {
    setShowDeleteConfirmation(true);
  };

  const confirmDeletePhoto = () => {
    setPhoto(null);
    setShowPreview(false);
    setShowDeleteConfirmation(false);
  };

  const cancelDeletePhoto = () => {
    setShowDeleteConfirmation(false);
  };

  const flipCamera = () => {
    setType(
      type === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  const onCameraReady = () => {
    if (previousType.current !== type) {
      previousType.current = type;
      setPhoto(null);
      setShowPreview(false);
    }
  };

  const handleClose = async () => {
    if (camera && camera.status === 'READY') {
      if (camera.isRecording) {
        camera.stopRecording();
      }
      await camera.unloadAsync();
      setCamera(null);
    }
    onClose();
  };

  const handleSavePhoto = () => {
    if (photo) {
      onPhotoTaken(photo.uri);
      handleClose();
    }
  };


  if (hasPermission === null) {
    return <View />;
  }  if (hasPermission === false) {
    return <Text>Acesso negado!</Text>;
  }

  return (
    <Modal visible={visible} onRequestClose={handleClose} animationType="slide">
      <View style={{ flex: 1 }}>
        {showPreview ? (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Image source={{ uri: photo.uri }} style={{ width: '80%', height: '80%', resizeMode: 'contain', borderRadius: 10 }} />
            <ButtonContainer>
              <ButtonPhoto onPress={sharePhoto}>
                <Text>Compartilhar</Text>
              </ButtonPhoto>
              <ButtonPhoto onPress={deletePhoto}>
                <Text>Excluir</Text>
              </ButtonPhoto>
            </ButtonContainer>
          </View>
        ) : (
          <Camera
            style={{ flex: 1 }}
            type={type}
            ref={(ref) => setCamera(ref)}
            onCameraReady={onCameraReady}
          >
            <CameraContainer>
              <ButtonCamera onPress={handleClose}>
                <Ionicons name="close" size={40} color="white" />              
              </ButtonCamera>
              <ButtonCamera onPress={takePicture}>
                <FontAwesome name="dot-circle-o" size={80} color="white" />
              </ButtonCamera>
              <ButtonCamera style={{marginBottom: 15}} onPress={flipCamera}>
                <Fontisto name="arrow-return-right" size={30} color="white" />              
              </ButtonCamera>
            </CameraContainer>
            
          </Camera>
        )}
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
      {showPreview && (
        <ButtonContainer>
          <ButtonSave title="Salvar Foto" onPress={handleSavePhoto}>
            <Text>Salvar</Text>
          </ButtonSave>
        </ButtonContainer>
      )}
    </Modal>
  );
};

export default CameraComponent;