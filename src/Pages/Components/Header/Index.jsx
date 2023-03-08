import React from 'react';
import { HeaderView, HeaderTitle } from './Style';
import { TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Header = ({title}) => {
    const navigation = useNavigation();
	return (
		<HeaderView>
			<TouchableOpacity onPress={() => navigation.goBack()}>
				<AntDesign name='arrowleft' size={24} color='white' />
			</TouchableOpacity>

			<HeaderTitle>{title}</HeaderTitle>

            <EvilIcons name='gear' size={30} color='white' />
			
		</HeaderView>
	);
};

export default Header;
