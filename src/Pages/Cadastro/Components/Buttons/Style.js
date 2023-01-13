import styled from 'styled-components/native';

export const Button = styled.TouchableOpacity`
	background: #381704;
	height: 40px;
	border: 2px solid #fff;
	width: 35%;
	border-radius: 10px;
    justify-content: center;
`;

export const ButtonGroup = styled.View`
	justify-content: space-around;
	align-items: center;
    flex-direction: row;
	width: 100%;
    height: 100px;
    /* flex: 1; */
    margin-top: 40px;
`;

export const TextButton = styled.Text`
	color: #fff;
	text-align: center;
`;