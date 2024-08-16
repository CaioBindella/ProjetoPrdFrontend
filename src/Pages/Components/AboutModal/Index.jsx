import React from "react"
import { 
    ModalView, 
    ModalContent, 
    ModalTitle,
	  ModalText,
    ModalButton,
    ModalButtonText,
} from "./Style";

import { Modal } from "react-native-paper";
import { Image } from "react-native";

const AboutModal = ({ modalVisible, setModalVisible}) => {

    return (
      <Modal
        animationType='slide'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
        onDismiss={() => {
          setModalVisible(!modalVisible)
        }}
      >
        <ModalView>
          <ModalContent>
            <Image
              style={{ width: 70, height: 70 }}
              source={require('../../../../assets/heavy-machinery.png')}
            />
            <ModalTitle>ISOAS v1.0.0</ModalTitle>
            <ModalText>ISOAS é um aplicativo de avaliação da qualidade operacional de aterros sanitários. Seu principal objetivo é simplificar a coleta de dados dos aterros, permitindo a atribuição de pontuações com base no grau de conformidade com as normas estabelecidas.</ModalText>
            <ModalText>Projeto desenvolvido em parceria entre a Universidade Veiga de Almeida e a Universidade do Estado do Rio de Janeiro e coordenado pelos professores Carlos Eduardo Canejo e Anderson Namen.</ModalText>
            <ModalText style={{fontWeight: 'bold'}}>Desenvolvedores</ModalText>
            <ModalText>• Caio Nogueira Bindella</ModalText>
            <ModalText>• Carolina Vieira Dornelas</ModalText>
            <ModalText>• Gabriel Luiz Bezerra Ackermann de Souza</ModalText>
            <ModalText>• Gabrielle Ferreira de Oliveira</ModalText>
            <ModalText>• Victor Luis Teixeira Reis</ModalText>
            <ModalButton
              background="#a6a6a6"
              onPress={() => setModalVisible(!modalVisible)}
            >
              <ModalButtonText>Fechar</ModalButtonText>
            </ModalButton>
          </ModalContent>
        </ModalView>
      </Modal>
    )
}

export default AboutModal