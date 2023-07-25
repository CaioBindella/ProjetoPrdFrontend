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
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 1px solid black;
    background-color: #D9D9D9;
    width: 85%;
    justify-content: space-between;
    border-bottom-width: 0px;
`;

export const InputContainer = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

export const ButtonContainer = styled.View`
    display: flex;
    justify-content: center;
    align-items: center;
    background: #9ca7ad;
    width: 85%;
    border: 1px solid black;
    border-top: none;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    flex-direction: row;
`;

export const ButtonLink = styled.TouchableOpacity`
    background: #24a0ed;
    width: 40%;
    border-radius: 5px;
    padding: 10px 30px;
    margin-top: 10px;
    margin-bottom: 10px;
`;

export const LinkText = styled.Text`
    text-align: center;
    color: #fff;
    font-weight: bold;
`;

export const ButtonCamera = styled.TouchableOpacity`
    border: 2px solid black;
    border-radius: 10px;
    width: 150px;
    height: 150px;
    margin: 10px;
    justify-content: center;
    align-items: center;
`;

export const Image = styled.Image`
    border-radius: 10px;
    width: 150px;
    height: 150px;
`;

export const ImageContainer = styled.View`
    display: flex;
    align-items: center;
`;

