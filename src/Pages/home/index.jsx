import React from 'react';
import {
	Container,
	Button,
	Text,
	Title,
	ButtonsHome,
	Header,
	Main,
	TextView,
	SubTitle,
	SubTitleText,
} from './Style';
import { StatusBar, Image, View } from 'react-native';
import { EvilIcons } from '@expo/vector-icons';

const Home = ({ navigation }) => {
	return (
		<Container>
			<StatusBar />

			<Header>
				<EvilIcons name='gear' size={35} color='white' />
			</Header>

			<Main>
				<Image
					style={{ width: 150, height: 150 }}
					source={require('../../Assets/heavy-machinery.png')}
				/>


				<TextView>

					<Title>ISOAS</Title>

					<SubTitle>
						<SubTitleText>
							índice de sustentabilidade operacional de aterros sanitários
						</SubTitleText>
					</SubTitle>

				</TextView>

				<ButtonsHome>

					<Button onPress={() => navigation.navigate('CadastrosBasicos')}>
						<Text>Cadastros Basicos</Text>
					</Button>

					<Button onPress={() => navigation.navigate('MeusAterros')}>
						<Text>Meus Aterros</Text>
					</Button>
				</ButtonsHome>
			</Main>
		</Container>
	);
};

export default Home;
