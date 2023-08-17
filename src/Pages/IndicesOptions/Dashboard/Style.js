import styled from 'styled-components/native';

export const Container = styled.View`
`;

export const Content = styled.View`
    width: 95%;
    border: 1px;
    margin: 10px;
    border-radius: 10px;
    background-color: #d9d9d9;
    align-items: center;
`;

export const ContentCharts = styled.View`
    width: 100%;
`;

export const Description = styled.Text`
    font-size: 16px;
`;

export const DescriptionContent =styled.View`
    margin: 10px;
    margin-top: 0px;
`;

export const Title = styled.Text`
    font-size: 16px;
    font-weight: bold;
    text-align: center;
    padding: 5px;
`;

export const Button = styled.TouchableOpacity`
    margin-top: 10px;
	margin-bottom: 10px;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
`;

export const TextButton = styled.Text`
    padding: 10px;
	border-radius: 5px;
	background-color: #24a0ed;
	text-align: center;
    color: #fff;
    font-weight: bold;
	border: 1px solid white;
`;

export const Line = styled.View`
    width: 80%;
    height: 2px;
    border: 1px solid black;
    margin-top: 30px;
    background-color: black;
`;
