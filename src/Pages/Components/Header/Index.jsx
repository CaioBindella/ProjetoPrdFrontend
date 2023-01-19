import React from 'react';
import {
	HeaderView,
    HeaderTitle,
} from './Style';
import { TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';


const Header = ({navigation}) => {
	return(
        <HeaderView>
            <TouchableOpacity
                onPress={navigation.goBack()}
            ><AntDesign name="arrowleft" size={24} color="black" /></TouchableOpacity>

            <HeaderTitle>Meus Aterros</HeaderTitle>
        </HeaderView>
    );
};

export default Header;