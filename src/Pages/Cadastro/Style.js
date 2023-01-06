import styled from 'styled-components/native'


export const Container = styled.View`
    background-color: #fff;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
`;


export const Text = styled.Text`
    color: #000;
    font-size: 20px;
`;

export const InputGroup = styled.View`
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    margin-left: 10px;
`;

export const Input = styled.TextInput`
    width: 80%;
    border: 2px solid;
    border-radius: 10px;
    background-color: #E8E8E8;
`;


export const Button = styled.TouchableOpacity`
    background-color: #381704;
    color: #FFFFFF;
    width: 60%;
    height: 30px;
    border-radius: 20px;
    justify-content: center;
    align-items: center;
    
    /* margin-top: 5%; */
`;