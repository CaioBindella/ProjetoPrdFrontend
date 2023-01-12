import React from 'react';
import {
	Container,
	Header,
    HeaderTitle,
	ContainerInputGroup,
	Title,
	TitleIMG,
	ViewTitle,
	InputGroup,
	Input,
	Button,
	ButtonGroup,
	TextButton,
} from './Style';
import { StatusBar, Image, View, Text } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

const CadastroMunicipio = ({ navigation }) => {
	return (
		<Container>
			<StatusBar />
			<Header>
				<HeaderTitle>Cadastrar Aterro</HeaderTitle>
			</Header>

			<ViewTitle>
				<Title>Preencha os dados referente ao Município</Title>
				<FontAwesome5 name='city' size={50} color='black' />
			</ViewTitle>

			<ContainerInputGroup>
				<InputGroup>
					<Text>Município 1 </Text>
					<Input placeholder='Digite aqui o município do aterro' />
				</InputGroup>

				<InputGroup>
					<Text>Município 2 (opcional) </Text>
					<Input placeholder='Digite aqui o município do aterro'/>
				</InputGroup>

				<InputGroup>
					<Text>Tamanho da População </Text>
					<Input placeholder='Digite aqui o Tamanho da população local'/>
				</InputGroup>

				<InputGroup>
					<Text>Taxa de Geração PerCapita </Text>
					<Input placeholder='Digite aqui a taxa de Geração PerCapita'/>
				</InputGroup>
			</ContainerInputGroup>
			
			<ButtonGroup>
				<Button onPress={() => navigation.goBack()}>
					<TextButton>Retornar</TextButton>
				</Button>
				<Button onPress={() => navigation.navigate('Cadastro')}>
					<TextButton>Avançar</TextButton>
				</Button>
			</ButtonGroup>
		</Container>
        
	);
};

export default CadastroMunicipio;
