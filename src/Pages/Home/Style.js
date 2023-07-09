import styled from 'styled-components/native';

export const Container = styled.View`
	flex: 1;
`;

export const Header = styled.View`
	background-color: #381704;
	/* height: 50px; */
	padding: 30px 0px 10px 0px;
	align-items: flex-end;
	justify-content: center;
	border-bottom-right-radius: 8px;
    border-bottom-left-radius: 8px;
`;

export const Main = styled.View`
	flex: 1;
	align-items: center;
	justify-content: center;
`;

export const Button = styled.TouchableOpacity`
	background-color: #bcb9c0;
	width: 70%;
	height: 40px;
	border-radius: 10px;
	border: 3px solid #736262;
	justify-content: center;
	align-items: center;
	border: 2px solid #736262;
	margin-top: 30px;
`;

export const Text = styled.Text`
	color: #000;
	font-size: 20px;
	/* font-family: Inter;
    font-weight: 3300; */
`;

export const Title = styled.Text`
	font-weight: 400;
	font-size: 30px;
	color: #000;
	/* font-family: 'Medula One'; */
`;
export const ButtonsHome = styled.View`
	width: 100%;
	align-items: center;
`;

export const TextView = styled.View`
	width: 100%;
	flex-direction: row;
	align-items: center;
	justify-content: center;
`;

export const SubTitle = styled.View`
	width: 35%;
	border-left-width: 2px;
	padding-left: 7px;
	margin-left: 7px;
`;

export const SubTitleText = styled.Text`
	font-size: 12px;
	color: #908A8A;
`;
