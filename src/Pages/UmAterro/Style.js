import styled from 'styled-components/native';

export const Button = styled.TouchableOpacity`
	background: #e8e8e8;
	height: 40px;
	border: 1px solid black;
	border-radius: 10px;
	justify-content: center;
	width: 70%;
	align-items: center;
	margin-bottom: 20px;
`;

export const Container = styled.View`
	flex: 1;
`;

export const Content = styled.View`
	flex: 1;
	align-items: center;
	justify-content: center;
`;

export const ModalView = styled.View`
	/* background-color: red; */
	flex: 1;
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

export const ModalButtonText = styled.Text`
    color: white;
`;

export const ModalTitle = styled.Text`
    font-weight: bold;

`;