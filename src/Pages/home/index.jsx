import React from 'react';
import { Container, Button, Text } from './Style';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

const Home = () => {
	return (
		// <Text>Oi</Text>
		<NavigationContainer>
			{
				<Container>
					<StatusBar />
					<Button onPress={() => navigation.navigate('Cadastro')}>
						<Text>Cadastrar Aterro</Text>
					</Button>
					{/* <Button title='Meus Aterro' /> */}
				</Container>
			}
		</NavigationContainer>
	);
};

export default Home;
