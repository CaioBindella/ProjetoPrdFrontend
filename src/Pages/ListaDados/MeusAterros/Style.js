import styled from 'styled-components/native';

export const Container = styled.View`
	width: 100%;
	flex: 1;
	align-items: center;
	justify-content: center;
`;

export const ItemContainer = styled.View`
	background-color: #d9d9d9;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: row;
	border-radius: 20px;
	border: 1px solid black;
	margin-top: 10px;
	height: 140px;
`;

export const Card = styled.View`
	border-radius: 10px;
	margin-left: 20px;
	padding: 20px;
	width: 60%;
`;

export const Title = styled.Text`
	font-weight: 700;
	font-size: 15px;
`;

export const DescText = styled.Text`
	font-weight: 400;
	font-size: 15px;
`;

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
