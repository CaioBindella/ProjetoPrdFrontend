import styled from 'styled-components/native'

export const ButtonContainer = styled.View`
    flex-direction: row;
    justify-content: center;
`;

export const ButtonPhoto = styled.TouchableOpacity`
    background-color: #E8E8E8;
    width: 35%;
    padding: 10px;
    align-items: center;
    border-radius: 10px;
    border: 1px solid black;
    margin: 0 20px;
    margin-top: 20px;
`;

export const ButtonCamera = styled.TouchableOpacity`
    margin: 0 50px;
`;

export const ButtonSave = styled.TouchableOpacity`
    background-color: #E8E8E8;
    width: 80%;
    padding: 10px;
    align-items: center;
    border-radius: 10px;
    border: 1px solid black;
    margin-bottom: 20px;
`;

export const CameraContainer = styled.View`
    flex-direction: row;
    margin-top: 135%;
    justify-content: center;
    align-items: center;
`;

export const ModalContainer = styled.View`
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    align-items: center;
`;

export const MContainer = styled.View`
    flex: 1;
    background-color: rgba(0, 0, 0, 0.5);
    align-items: center;
    justify-content: center;
`;

export const ModalText = styled.Text`
    font-size: 18px;
    margin-bottom: 20px;
    text-align: center;
`;

export const ButtonModalContainer = styled.View`
    flex-direction: row;
    justify-content: space-around;
`;


