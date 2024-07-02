import React, { useEffect } from "react";

import {
  Container,
  Button,
  Content,
  Text,
  Title,
  ContentPicker,
} from "./Style";

import { useState } from "react";
import { consulta } from "../../Services/Networks/consulta";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

import Header from "../Components/Header/Index";
import DropDownPicker from "react-native-dropdown-picker";

function CadastroIsoas() {
  const [openPicker, setOpenPicker] = useState(false);
  const [pickerValue, setPickerValue] = useState();
  const [pickerItems, setPickerItems] = useState([]);
  const navigation = useNavigation();

  const fetchAterroData = async () => {
    try {
        const response = await consulta("aterro")

        let pickerItems = []

        response.forEach((eachData) => {
          pickerItems.push({label: eachData.Nome, value: eachData})
        })
        
        setPickerItems(pickerItems)
    } catch (error) {
        Alert.alert("Erro", "Erro ao pegar informações dos aterros")
    }
  }

  const handleButtonPress = () => {
    if (pickerValue){
        navigation.navigate('MinhasAnalises', {aterroData: pickerValue})
    }
    else{
        Alert.alert("Erro", "Informe para qual aterro deseja cadastrar o ISOAS")
    }
  }

  useEffect(() => {
    fetchAterroData()
  }, [])

  return (
    <Container>
      <Header title={`Cadastro de ISOAS`} />
      <Content>
        <Title>Escolha um aterro para continuar</Title>

        <ContentPicker>
          <DropDownPicker
            open={openPicker}
            value={pickerValue}
            items={pickerItems}
            setOpen={setOpenPicker}
            setValue={setPickerValue}
            setItems={setPickerItems}
            placeholder="Selecione o aterro"
            zIndex={3000}
            zIndexInverse={1000}
            itemKey="label"
          />
        </ContentPicker>
        
        <Button onPress={() => handleButtonPress()}>
          <Text>Continuar</Text>
        </Button>
      </Content>
    </Container>
  );
}

export default CadastroIsoas;
