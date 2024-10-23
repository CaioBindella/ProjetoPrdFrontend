import DropDownPicker from 'react-native-dropdown-picker';
import styled from 'styled-components/native'

export const Container = styled.View`
    background-color: #fff;
    width: 100%;
    flex: 1;
    align-items: center;
    justify-content: center;
    z-index: 1;
`;

export const Title = styled.Text`
    width: 70%;
	font-weight: bold;
	font-size: 20px;
`;

export const ViewTitle = styled.View`
    width: 100%;
	justify-content: center;
	align-items: center;
	flex-direction: row;
    padding: 20px;
    border-bottom-width: 1px;
`;

export const Text = styled.Text`
    color: #000;
    font-size: 20px;
`;

export const InputGroup = styled.View`
    display: flex;
    flex-direction: column;
    width: 90%;
	padding: 10px;
    gap: 5px;
    z-index: 1;
`;

export const Input = styled.TextInput`
    width: 100%;
	padding: 10px 20px;
	border: 1px solid;
	border-radius: 10px;
	background-color: #e8e8e8;
`;

export const ButtonGroup = styled.View`
    justify-content: space-around;
	align-items: center;
    flex-direction: row;
	width: 100%;
    padding: 10px 0px;
`;

export const TextButton = styled.Text`
    color: #fff;
	text-align: center;
    font-weight: bold;
`;

export const Button = styled.TouchableOpacity`
    background: #381704;
	padding: 10px;
	width: 35%;
	border-radius: 10px;
    z-index: 1;
`;

export const PickerContainer = styled.View`
    z-index: 3000;
`;

export const Picker = styled(DropDownPicker)`
    width: 100%;
	padding: 10px 20px;
	border: 1px solid;
	border-radius: 10px;
	background-color: #e8e8e8;
`;
