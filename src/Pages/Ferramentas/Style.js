import styled from 'styled-components/native';

export const Container = styled.View`
	flex: 1;
`;

export const ButtonGroup = styled.View`
	align-items: center;
	justify-content: center;
`;

export const Button = styled.TouchableOpacity`
	background-color: #bcb9c0;
	width: 70%;
	/* height: 40px; */
	padding: 5px 0px;
	border-radius: 10px;
	justify-content: center;
	align-items: center;
	border: 2px solid #736262;
	margin-top: 30px;
`;

export const Text = styled.Text`
	color: #000;
	font-size: 20px;
	text-align: center;
	/* font-family: Inter;
    font-weight: 3300; */
`;