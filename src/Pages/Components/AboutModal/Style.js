import styled from "styled-components/native";

export const ModalView = styled.View`
	justify-content: center;
	align-items: center;
`;

export const ModalContent = styled.View`
	background-color: #fff;
	width: 80%;
	border-radius: 10px;
	align-items: center;
	justify-content: center;
    padding: 20px;
`;

export const ModalTitle = styled.Text`
    font-weight: bold;
	text-align: center;
	font-size: 18px;
	padding: 10px;
`;

export const ModalText = styled.Text`
	/* text-align: center; */
	width: 100%;
	padding: 5px;
`;

export const ModalList = styled.View`
	
`;

export const ModalButton = styled.TouchableOpacity`
	background-color: ${({background}) => background};
	border-radius: 5px;
    padding: 10px 0px;
	margin: 10px;
	width: 40%;
`;

export const ModalButtonText = styled.Text`
    color: white;
	text-align: center;
`;




