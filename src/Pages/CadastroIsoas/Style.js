import styled from 'styled-components/native';

export const Button = styled.TouchableOpacity`
	background: #e8e8e8;
	height: 40px;
	border: 1px solid black;
	border-radius: 10px;
	justify-content: space-evenly;
	width: 100%;
	align-items: center;
	margin-bottom: 20px;
	flex-direction: row;
`;

export const ContentPicker = styled.View`
    width: 100%;
	margin-bottom: 20px;
`;

export const Container = styled.View`
	flex: 1;
	align-items: center;
`;

export const Content = styled.View`
	flex: 1;
	align-items: center;
	justify-content: center;
	width: 70%;
`;

export const Text = styled.Text`
    color: black;
`;

export const Title = styled.Text`
	color: black;
	/* text-align: center; */
	font-size: 16px;
	margin: 0px;
	margin-bottom: 10px;
	font-weight: bold;
	width: 100%;
`;

