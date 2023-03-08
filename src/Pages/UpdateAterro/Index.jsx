import React from "react";

import Header from '../Components/Header/Index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
	StatusBar,
	Image,
	View,
	Text,
	Modal,
	TouchableOpacity,
} from 'react-native';

import { Container, Content, Button } from "./Style";

import { Entypo } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

const UpdateAterro = ({ navigation, route }) => {

    const index = route.params.index;
    const Item = route.params.item;

    return(
		<Container>
			<Header title="Atualizar Cadastro"/>
            <Content>

                <Button onPress={() => navigation.navigate('UpdateUmAterro', {index:index})}>
                    <Entypo name='home' size={40} color='black' />
                    <Text>Atualizar dados de Aterro</Text>
                </Button>
                <Button onPress={() => navigation.navigate('UpdateUmMunicipio', {index:index})}>
                    <FontAwesome5 name='city' size={30} color='black' />
                    <Text>Atualizar dados de Municipio</Text>
                </Button>
                <Button onPress={() => navigation.navigate('UpdateOrg', {index:index})}>
                    <MaterialCommunityIcons
                        name='relation-only-one-to-only-one'
                        size={50}
                        color='black'
                    />
                    <Text>Atualizar dados de Organização</Text>
                </Button>
                <Button onPress={() => navigation.navigate('UpdateProf', {index:index})}>
                    <Ionicons name='people-sharp' size={40} color='black' />
                    <Text>Atualizar dados de Profissionais</Text>
                </Button>
                
            </Content>
			
		</Container>
    );
};

export default UpdateAterro;
