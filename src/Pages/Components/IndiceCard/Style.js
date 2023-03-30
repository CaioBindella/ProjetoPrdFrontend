import styled from 'styled-components/native'

export const Container = styled.View`
    justify-content: center;
    align-items: center;
    margin-top: 10px;
`;

export const ContentTitle = styled.View`
    border: 1px solid black;
    width: 85%;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    justify-content: center;
    align-items: center;
    background-color: #E8E8E8;
`;

export const Description = styled.Text`
    text-align: center;
    padding: 10px;
`;

export const Title = styled.Text`
    font-weight: bold;
    text-align: center;
    margin-top: 4px;
`;

export const ContentOptions = styled.View`
    display: flex;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 1px solid black;
    background-color: #D9D9D9;
    width: 85%;
    justify-content: space-between;
`;

export const InputContainer = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

