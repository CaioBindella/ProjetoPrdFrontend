import styled from "styled-components/native";

export const ModalView = styled.View`
  justify-content: center;
  align-items: center;
`;

export const ModalContent = styled.View`
  background-color: #d1d1d1;
  width: 80%;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

export const ModalTitle = styled.Text`
  font-weight: bold;
  text-align: left;
  font-size: 18px;
  padding: 10px 0px;
  width: 100%;
`;

export const ModalText = styled.Text`
  text-align: center;
  width: 100%;
  padding: 10px;
`;

export const ModalButtonGroup = styled.View`
  width: 100%;
  flex-direction: row-reverse;
  justify-content: space-between;
  margin: 10px 0px;
`;

export const ModalButton = styled.TouchableOpacity`
  background-color: ${({ background }) => background};
  border-radius: 5px;
  padding: 10px 0px;
  width: 40%;
`;

export const ModalButtonText = styled.Text`
  color: white;
  text-align: center;
`;

export const Input = styled.TextInput`
  border: 1px solid #a6a6a6;
  margin: 10px 0px;
  padding: 10px 10px;
  width: 100%;
`;
