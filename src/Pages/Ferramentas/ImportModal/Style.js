import styled from "styled-components/native";

export const ModalView = styled.View`
	justify-content: center;
	align-items: center;
`;

export const ModalContent = styled.View`
	background-color: #d1d1d1;
	width: 80%;
	border: 1px solid black;
	border-radius: 10px;
	align-items: center;
	justify-content: center;
    padding: 20px;
`;

export const ModalTitle = styled.Text`
    font-weight: bold;
	text-align: center;
`;

export const ModalText = styled.Text`
	text-align: center;
	width: 100%;
`;

export const ModalButtonText = styled.Text`
    color: white;
	text-align: center;
`;

export const ModalButton = styled.TouchableOpacity`
	background-color: white;
    border: 1px solid black;
	border-radius: 5px;
    padding: 5px;
`;

export const ModalButtonGroup = styled.View`
	width: 100%;
	flex-direction: row;
	margin: 20px;
    justify-content: space-around;
`;



