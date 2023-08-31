import styled from 'styled-components/native';

export const HeaderView = styled.View`
	width: 100%;
	display: flex;
	flex-direction: row;
	background-color: #381704;
	align-items: center;
	justify-content: space-around;
	border-bottom-right-radius: 8px;
	border-bottom-left-radius: 8px;
	padding: 40px 0px 10px 0px;
`;

export const HeaderTitle = styled.Text`
    color: white;
	width: 80%;
    font-size: 20px;
	text-align: center;
`;