import React from 'react';
import {
	ButtonGroup,
    Button,
    TextButton,
} from './Style';

import { StatusBar, Image, View, Text } from 'react-native';


const Buttons = ({ navigation }) => {
	return(
        <ButtonGroup>
            <Button onPress={() => navigation.goBack()}>
                <TextButton>Retornar</TextButton>
            </Button>
            <Button onPress={() => navigation.navigate('Aterro')}>
                <TextButton>Avançar</TextButton>
            </Button>
		</ButtonGroup>
    );
};

export default Buttons;