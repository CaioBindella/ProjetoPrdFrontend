import styled from 'styled-components/native';

export const Button = styled.TouchableOpacity`
	background: #e8e8e8;
	height: 40px;
	border: 1px solid black;
	border-radius: 10px;
	justify-content: space-evenly;
	width: 70%;
	align-items: center;
	margin-bottom: 20px;
	flex-direction: row;
`;

export const Container = styled.View`
	flex: 1;
`;

export const Content = styled.View`
	flex: 1;
	align-items: center;
	justify-content: center;
`;



export const Text = styled.Text`
    color: black;
`;

export const Title = styled.Text`
	color: black;
	font-weight: bold;
`;

