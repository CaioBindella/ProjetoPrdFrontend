import React, {useState, useEffect} from 'react'

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
    Image
} from './Style'

import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { indiceDb } from '../../../Services/SqlTables/sqliteDb';
import CameraComponent from '../CameraView/Index'
import { MaterialCommunityIcons } from '@expo/vector-icons';

import * as DocumentPicker from "expo-document-picker"
import * as FileSystem from 'expo-file-system';
import * as Updates from 'expo-updates';

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

const getAllAnaliseItem = () => {
  return new Promise((resolve, reject) => {
    indiceDb.then((data) => {
      data.transaction((tx) => {
        //comando SQL modificável
        tx.executeSql(
          `
                SELECT * from AnaliseItem;"
                `,
          [],
          //-----------------------
          (_, { rows }) => resolve(rows._array),
          (_, error) => reject(error) // erro interno em tx.executeSql
        );
      });
    });
  });
};

const loadPreviousAnswer = (codInd, codAnalise) =>{
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
}

function IndiceCard ({codInd, title, description, codAvPeso, options, optionValue, codAnalise, data, getScore, setScore, scoreData, setScoreData, index}){

    const [checked, setChecked] = useState(null);
    const [cameraVisible, setCameraVisible] = useState(false);
    const [capturedPhoto, setCapturedPhoto] = useState(null);

    const handleRadioPress = async (value, selectedCod) => {
      setChecked(value)
      await updateAnaliseItemPesos(selectedCod, codInd, codAnalise)

      const score = await getScore(data[0].CodInd, data.length, codAnalise)
      setScore(score[0].Pontuacao)

      // const test = await getAllAnaliseItem();
      // console.log(`\nTodos os registros de analiseItem:\n`)
      // test.map((eachTest) => console.log(eachTest))
    }

    const loadAnswer = async () => {
      const response = await loadPreviousAnswer(codInd, codAnalise)
      setChecked(response[0] ? response[0].Pontuacao : null)
    }

    const pickDocument = async () => {
      let result = await DocumentPicker.getDocumentAsync({});
  
      if(result.type === "cancel"){
        return
      }
  
      console.log(result)
    };

    useEffect(() => {
      loadAnswer()
    },[])
    
    const handleOpenCamera = () => {
      setCameraVisible(true);
    };
  
    const handleCloseCamera = () => {
      setCameraVisible(false);
    };
  
    const handlePhotoTaken = (photoUri) => {
      setCapturedPhoto(photoUri);
    };

    return(
        <Container>
            <ContentTitle>
                <Title>{title}</Title>
                <Description>{description}</Description>
            </ContentTitle> 

            <ContentOptions style={{borderTopWidth:0}}>
                {options.map((eachOption, index) => {
                    return(
                        <InputContainer key={index}>
                            <RadioButton
                                value={optionValue[index]}
                                status={ checked === optionValue[index] ? 'checked' : 'unchecked' }
                                onPress={() => handleRadioPress(optionValue[index], codAvPeso[index])}
                                color="blue"
                            />
                            <Text>{eachOption}</Text>
                        </InputContainer>
                    )
                })}
            </ContentOptions>

            <ButtonContainer>
              <ButtonLink onPress={() => pickDocument()}>
                <LinkText>Link</LinkText>
              </ButtonLink>

              {capturedPhoto && (
                <ButtonCamera onPress={() => setCapturedPhoto(null)}>
                  <Image
                    source={{ uri: capturedPhoto }}
                    resizeMode="contain"
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

              <CameraComponent
                visible={cameraVisible}
                onClose={handleCloseCamera}
                onPhotoTaken={handlePhotoTaken}
              />       
            </ButtonContainer>

        </Container>
    );
}

const styles = StyleSheet.create({
  closeIcon: {
      position: 'absolute',
      top:5,
      right: 5,
  },
});

export default IndiceCard;