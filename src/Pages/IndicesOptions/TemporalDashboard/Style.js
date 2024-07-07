import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
`;

export const Content = styled.View`
    width: 95%;
    border: 1px;
    margin: 10px;
    border-radius: 10px;
    background-color: #d9d9d9;
    align-items: center;
`;


export const Description = styled.Text`
    font-size: 16px;
    width: 80%;

`;

export const DescriptionContent = styled.View`
    margin: 10px;
    margin-top: 8px;
`;

export const Title = styled.Text`
    font-size: 16px;
    font-weight: bold;
    text-align: center;
    margin-top: 20px;
`;

export const Button = styled.TouchableOpacity`
    margin-top: 10px;
	margin-bottom: 5px;
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
    margin-top: 20px;
    background-color: black;
`;

export const ColorBox = styled.Text`
    color: ${({ color }) => color};
    font-size: 20px;
    margin-right: 10px;
`;
