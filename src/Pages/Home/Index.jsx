import React, { useState } from 'react';
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
import AboutModal from '../Components/AboutModal/Index';

const Home = ({ navigation }) => {

	const [aboutModalVisible, setAboutModalVisible] = useState(false);
	return (
		<Container>
			<StatusBar />

			<Header>
				{/* <EvilIcons name='gear' size={35} color='white' /> */}
			</Header>

			<Main>
				<Image
					style={{ width: 150, height: 150 }}
					source={require('../../../assets/heavy-machinery.png')}
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

					<Button onPress={() => navigation.navigate('CadastroIsoas')}>
						<Text>Cadastrar ISOAS</Text>
					</Button>

					<Button onPress={() => navigation.navigate('Ferramentas')}>
						<Text>Ferramentas</Text>
					</Button>
				</ButtonsHome>

				<SubTitleText style={{margin: 20, fontSize: 14, textDecorationLine: 'underline'}} onPress={() => setAboutModalVisible(!aboutModalVisible)}>Sobre o ISOAS</SubTitleText>
				
			</Main>

			<AboutModal modalVisible={aboutModalVisible} setModalVisible={setAboutModalVisible}/>
		</Container>
	);
};

export default Home;
