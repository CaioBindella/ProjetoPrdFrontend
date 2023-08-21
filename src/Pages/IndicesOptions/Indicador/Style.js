import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
`;

export const Button = styled.TouchableOpacity`
	background: #fff;
	/* height: 40px; */
	padding: 10px 5px;
	border: 1px solid black;
	border-radius: 10px;
	justify-content: space-evenly;
	width: 80%;
	align-items: center;
	margin-bottom: 20px;
	flex-direction: row;
	margin: 3%;
`;
export const Content = styled.View`
	flex: 1;
	width: 100%;
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
	width: 80%;
	align-items: center;
	justify-content: center;
`;

export const Title = styled.Text`
	width: 100%;
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
	margin: 10px 0px;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 60%;
	padding: 10px 0px;
	background-color: #24a0ed;
	border-radius: 10px;
`;

export const TextDashboard = styled.Text`
    color: #fff;
    font-weight: bold;
`;