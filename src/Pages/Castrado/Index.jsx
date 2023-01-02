import React from 'react';
import { Container, Button, Text } from './Style';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

const Cadastro = () => {
	return (
		<NavigationContainer>{

		<Container>
			<StatusBar />
			<Button>
				<Text>Cadastrar Aterro</Text>
			</Button>
			{/* <Button title='Meus Aterro' /> */}
		</Container>
		}</ NavigationContainer>
	);
};

export default Cadastro;
