import styled from 'styled-components/native'


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

export const Title = styled.Text`
    width: 60%;
	font-weight: 500;
	font-size: 20px;
	margin-right: 10px;
`;

export const ViewTitle = styled.View`
    width: 100%;
	height: 70px;
    /* flex: 1; */
	justify-content: center;
	align-items: center;
	flex-direction: row;
	margin-top: 25px;
    border-bottom-width: 2px;
`;

export const ContainerInputGroup = styled.View`
    background-color: #fff;
	align-items: center;
	justify-content: center;
	margin-top: 25px;
`;

export const InputGroup = styled.View`
    width: 100%;
    /* flex:2; */
	padding: 10px;
	margin-bottom: 10px;
	margin-left: 30px;
`;

export const Input = styled.TextInput`
    width: 90%;
	height: 40px;
	border: 2px solid;
	border-radius: 10px;
	background-color: #e8e8e8;
`;
