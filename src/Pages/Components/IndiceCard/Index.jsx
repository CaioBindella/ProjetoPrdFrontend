import React, {useState, useEffect} from 'react'

import {
    Container,
    Title,
    Description,
    ContentTitle,
    ContentOptions,
    InputContainer,
    Button,
    LinkText,
    ButtonContainer,
} from './Style'

import { Text } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { indiceDb } from '../../../Services/SqlTables/sqliteDb';

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

function IndiceCard ({codInd, title, description, codAvPeso, options, optionValue, codAnalise, data, getScore, setScore}){

    const [checked, setChecked] = useState(null);

    const handleRadioPress = async (value, selectedCod) => {
      setChecked(value)
      await updateAnaliseItemPesos(selectedCod, codInd, codAnalise)

      const score = await getScore(data[0].CodInd, data.length, codAnalise)
      setScore(score[0].Pontuacao)

      const test = await getAllAnaliseItem();
      console.log(`\nTodos os registros de analiseItem:\n`)
      test.map((eachTest) => console.log(eachTest))
    }

    const loadAnswer = async () => {
      const response = await loadPreviousAnswer(codInd, codAnalise)
      setChecked(response[0] ? response[0].Pontuacao : null)
    }

    useEffect(() => {
      loadAnswer()
    },[])
    
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
              <Button>
                <LinkText>Link</LinkText>
              </Button>
            </ButtonContainer>
            

        </Container>
    );
}


export default IndiceCard;