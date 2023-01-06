import React from 'react';
import { Container, Button, Text } from './Style';
import { StatusBar } from 'react-native';
import Cadastro from '../Cadastro/Index';

const Home = () => {
	return (
		<Container>
			<StatusBar />
			<Cadastro />
		</Container>
	);
};

export default Home;
