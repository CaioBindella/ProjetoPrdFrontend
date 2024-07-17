import styled from 'styled-components/native';

export const Container = styled.View`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
`;

export const Content = styled.View`
    background-color: #d9d9d9;
    border-radius: 10px;
    width: 200px;
    transform: ${({ hasTitle, isDefaultTitle }) =>
        hasTitle && !isDefaultTitle ? 'scale(0.8)' : 'scale(1)'};
`;

export const Title = styled.Text`
    text-align: center;
    font-size: 20px;
    font-weight: bold;
`;

export const Text = styled.Text`
    text-align: center;
    background-color: lightgreen;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    font-size: 20px;
`;
