import React, { useState, useEffect } from "react";

import {
  Container,
  Title,
  Description,
  ContentTitle,
  ContentOptions,
  InputContainer,
  ButtonLink,
  LinkText,
  ButtonContainer,
  ButtonCamera,
  Image,
  UpdateContainer,
} from "./Style";

import { Text, StyleSheet, Alert } from "react-native";
import { RadioButton } from "react-native-paper";
import { indiceDb } from "../../../Services/SqlTables/sqliteDb";

import {
  MaterialCommunityIcons,
  Feather,
  Ionicons,
  AntDesign,
} from "@expo/vector-icons";

import * as Linking from "expo-linking";
import LinkModal from "./LinkModal/Index";
import HelpModal from "./HelpModal/Index";
import CameraComponent from "./CameraView/Index";

const updateAnaliseItemPesos = (codAvPeso, codInd, codAnalise) => {
  return new Promise((resolve, reject) => {
    indiceDb.then((data) => {
      data.transaction((tx) => {
        //comando SQL modificável
        tx.executeSql(
          `
              UPDATE AnaliseItem 
              SET CodAvPeso=? 
              WHERE CodInd=? AND CodAnalise=?;
              `,
          [codAvPeso, codInd, codAnalise],
          //-----------------------
          (_, { rows }) => resolve(rows._array),
          (_, error) => reject(error) // erro interno em tx.executeSql
        );
      });
    });
  });
};

const loadPreviousAnswer = (codInd, codAnalise) => {
  return new Promise((resolve, reject) => {
    indiceDb.then((data) => {
      data.transaction((tx) => {
        //comando SQL modificável
        tx.executeSql(
          `
              SELECT Pontuacao from AvaliacaoPeso AP
              WHERE AP.CodAvPeso = (SELECT CodAvPeso FROM AnaliseItem WHERE CodInd=? AND CodAnalise=?);"
          `,
          [codInd, codAnalise],
          //-----------------------
          (_, { rows }) => resolve(rows._array),
          (_, error) => reject(error) // erro interno em tx.executeSql
        );
      });
    });
  });
};

const loadPreviousLink = (codInd, codAnalise) => {
  return new Promise((resolve, reject) => {
    indiceDb.then((data) => {
      data.transaction((tx) => {
        //comando SQL modificável
        tx.executeSql(
          `
            SELECT Link FROM AnaliseItem AI
            WHERE AI.CodInd = ? and AI.CodAnalise = ?
          `,
          [codInd, codAnalise],
          //-----------------------
          (_, { rows }) => resolve(rows._array),
          (_, error) => reject(error) // erro interno em tx.executeSql
        );
      });
    });
  });
}

const loadPreviousPhoto = (codInd, codAnalise) => {
  return new Promise((resolve, reject) => {
    indiceDb.then((data) => {
      data.transaction((tx) => {
        //comando SQL modificável
        tx.executeSql(
          `
            SELECT PhotoUri FROM AnaliseItem AI
            WHERE AI.CodInd = ? and AI.CodAnalise = ?
          `,
          [codInd, codAnalise],
          //-----------------------
          (_, { rows }) => resolve(rows._array),
          (_, error) => reject(error) // erro interno em tx.executeSql
        );
      });
    });
  });
}

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

function IndiceCard({
  navigation,
  codInd,
  title,
  description,
  codAvPeso,
  options,
  optionValue,
  codAnalise,
  data,
  getScore,
  setScore,
  scoreData,
  setScoreData,
  index,
}) {
  const [checked, setChecked] = useState(null);
  const [link, setLink] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [helpModalVisible, setHelpModalVisible] = useState(false)
  const [cameraVisible, setCameraVisible] = useState(false);
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [showImageSettings, setShowImageSettings] = useState(false);

  const handleRadioPress = async (value, selectedCod) => {
    setChecked(value);
    await updateAnaliseItemPesos(selectedCod, codInd, codAnalise);

    const score = await getScore(data[0].CodInd, data.length, codAnalise);
    setScore(score[0].Pontuacao);

    // const test = await getAllAnaliseItem();
    // console.log(`\nTodos os registros de analiseItem:\n`)
    // test.map((eachTest) => console.log(eachTest))
  };

  const loadAnswer = async () => {
    const response = await loadPreviousAnswer(codInd, codAnalise);
    const linkResponse = await loadPreviousLink(codInd, codAnalise)
    const photoResponse = await loadPreviousPhoto(codInd, codAnalise)
    setLink(linkResponse[0] ? linkResponse[0].Link : "")
    setCapturedPhoto(photoResponse[0] ? photoResponse[0].PhotoUri : null)
    setChecked(response[0] ? response[0].Pontuacao : null);
  };

  const pickDocument = async () => {
    try {
      Linking.openURL("http://drive.google.com");
      setModalVisible(true);
    } catch (e) {
      Alert.alert("Erro", "Erro ao abrir o Drive")
    }
  };

  useEffect(() => {
		loadAnswer();
	}, []);

  const handleHelp = () => {
    setHelpModalVisible(!helpModalVisible)
  }

  const handleLinkDelete = async () => {
    try{
      await updateLink(null, codInd, codAnalise)
      setLink("")
    }
    catch (e){
      Alert.alert("Erro", "Erro ao excluir link!")
    }
  }

  const handleOpenCamera = () => {
    setCameraVisible(true);
  };

  const handleCloseCamera = () => {
    setCameraVisible(false);
  };

  const handlePhotoTaken = (photoUri) => {
    setCapturedPhoto(photoUri);
  };


  return (
    <Container>
      <ContentTitle>
        <Title>{title}</Title>
        <Description>{description}</Description>
      </ContentTitle>

      <ContentOptions style={{ borderTopWidth: 0 }}>
        {options.map((eachOption, index) => {
          return (
            <InputContainer key={index}>
              <RadioButton
                value={optionValue[index]}
                status={
                  checked === optionValue[index] ? "checked" : "unchecked"
                }
                onPress={() =>
                  handleRadioPress(optionValue[index], codAvPeso[index])
                }
                color="blue"
              />
              <Text>{eachOption}</Text>
            </InputContainer>
          );
        })}
      </ContentOptions>

      <ButtonContainer>
        <UpdateContainer>
          {!link ? (
            <ButtonLink onPress={() => pickDocument()}>
              <Feather name="upload" size={24} color="white" />
              <LinkText>Link do Comprovante</LinkText>
            </ButtonLink>
          ) : (
            <ButtonLink uploaded={true} onPress={() => Linking.openURL(link)}>
              <Ionicons name="document-outline" size={24} color="tomato" />
              <LinkText uploaded={true}>{link.slice(0, 20) + "..."}</LinkText>
              <AntDesign
                onPress={() => handleLinkDelete()}
                name="close"
                size={24}
                color="black"
              />
            </ButtonLink>
          )}

          <Feather name="help-circle" size={24} color="black" onPress={() => handleHelp()}/>
        </UpdateContainer>

        {capturedPhoto && (
          <ButtonCamera onPress={handleOpenCamera}>
            <Image
              source={{ uri: capturedPhoto }}
              resizeMode="contain"
              style={{ width: '100%', height: '100%' }} // Ajuste conforme necessário
            />
            <MaterialCommunityIcons
              name="dots-horizontal-circle"
              size={20}
              color="red"
              style={styles.closeIcon}
            />
          </ButtonCamera>
        )}
        {!capturedPhoto && (
          <ButtonCamera onPress={handleOpenCamera}>
            <MaterialCommunityIcons name="camera-plus-outline" size={50} color="black" />
          </ButtonCamera>
        )}

        {/* <CameraComponent
          visible={cameraVisible}
          onClose={handleCloseCamera}
          onPhotoTaken={handlePhotoTaken}
          capturedPhoto={capturedPhoto}
          codInd={codInd}
          codAnalise={codAnalise}
        /> */}
      </ButtonContainer>

      <LinkModal
        codInd={codInd}
        codAnalise={codAnalise}
        setLink={setLink}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />

      <HelpModal 
        modalVisible={helpModalVisible}
        setModalVisible={setHelpModalVisible}
      />
    </Container>
  );
}

const styles = StyleSheet.create({
  closeIcon: {
    position: "absolute",
    top: 5,
    right: 5,
  },
});

export default IndiceCard;