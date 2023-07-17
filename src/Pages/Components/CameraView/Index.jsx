import React, { useState, useEffect, useRef } from 'react';
import { Button, View, StyleSheet, Text, Modal, Image, Platform } from 'react-native';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import * as Sharing from 'expo-sharing';
import * as ImageManipulator from 'expo-image-manipulator';

const CameraComponent = ({ visible, onClose }) => {
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

  const saveToGallery = async () => {
    if (photo) {
      if (Platform.OS === 'ios') {
        await MediaLibrary.requestPermissionsAsync();
      }

      const asset = await MediaLibrary.createAssetAsync(photo.uri);
      await MediaLibrary.createAlbumAsync('Expo', asset, false);
    }
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

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>Acesso negado!</Text>;
  }

  return (
    <Modal visible={visible} onRequestClose={handleClose} animationType="slide">
      <View style={styles.container}>
        {showPreview ? (
          <View style={styles.photoContainer}>
            <Image source={{ uri: photo.uri }} style={styles.photo} />
            <View style={styles.buttonContainer}>
              <Button title="Salvar na galeria" onPress={saveToGallery} />
              <Button title="Compartilhar" onPress={sharePhoto} />
              <Button title="Apagar" onPress={deletePhoto} />
            </View>
          </View>
        ) : (
          <Camera
            style={styles.camera}
            type={type}
            ref={(ref) => setCamera(ref)}
            onCameraReady={onCameraReady}
          >
            <View style={styles.buttonContainer}>
              <Button title="Tirar foto" onPress={takePicture} />
              <Button title="Fechar" onPress={handleClose} />
              <Button title="Virar Camera" onPress={flipCamera} />
            </View>
          </Camera>
        )}
        <Modal visible={showDeleteConfirmation} transparent animationType="fade">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>Tem certeza que deseja excluir a imagem?</Text>
              <View style={styles.modalButtonContainer}>
                <Button title="Excluir" onPress={confirmDeletePhoto} />
                <Button title="Cancelar" onPress={cancelDeletePhoto} />
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  photoContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  photo: {
    width: '80%',
    height: '80%',
    resizeMode: 'contain',
    borderRadius: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
});

export default CameraComponent;
