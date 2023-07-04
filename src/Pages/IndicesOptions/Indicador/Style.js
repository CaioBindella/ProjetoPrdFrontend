import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
`;

export const Button = styled.TouchableOpacity`
	background: #fff;
	/* height: 40px; */
	padding: 10px 0px;
	border: 1px solid black;
	border-radius: 10px;
	justify-content: space-evenly;
	width: 70%;
	align-items: center;
	margin-bottom: 20px;
	flex-direction: row;
	margin: 3%;
`;
export const Content = styled.View`
	flex: 1;
	align-items: center;
	justify-content: center;
`;


export const Text = styled.Text`
    color: black;
	text-align: center;
`;

export const CardContainer = styled.View`
	margin-top: 3%;
	background-color: #d9d9d9;
	border-radius: 10px;
	border: 1px solid #381704;
`;

export const Title = styled.Text`
	text-align: center;
	margin-bottom: 3%;
	background-color: #381704;
	color: #fff;
	font-weight: bold;
	border-top-right-radius: 10px;
	border-top-left-radius: 10px;
	padding: 3%;
`;

export const DashboardButton = styled.TouchableOpacity`
    margin-top: 10px;
	margin-bottom: 10px;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	
`;

export const TextDashboard = styled.Text`
	padding: 10px;
	border-radius: 5px;
	background-color: #24a0ed;
	text-align: center;
    color: #fff;
    font-weight: bold;
	border: 1px solid white;
`;