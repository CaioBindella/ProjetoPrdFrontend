import React, { useState, useEffect } from 'react';
import {
	Container,
	Text,
	InputGroup,
	Input,
	Button,
	Title,
	ViewTitle,
	ButtonGroup,
	TextButton,
	Picker,
	PickerContainer
} from './Style';

import { Alert, ScrollView } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { consulta } from '../../../Services/Networks/consulta';
import { inclui } from '../../../Services/Networks/inclui';

import Header from '../../Components/Header/Index';
import { atualiza } from '../../../Services/Networks/atualiza';

const CadastroAterro = ({ navigation, route }) => {
	const aterroData = route.params.aterroData;
	const isUpdate = route.params.isUpdate;

	const [nome, setNome] = useState(isUpdate ? aterroData.Nome : "");
	const [endereco, setEndereco] = useState(isUpdate ? aterroData.Endereco : "");
	const [recebimentoBruto, setRecebimentoBruto] = useState(isUpdate ? String(aterroData.RecebimentoBruto) : "");
	
	const [openMunicipio, setOpenMunicipio] = useState(false);
	const [valueMunicipio, setValueMunicipio] = useState(isUpdate ? aterroData.CodMunicipio : null);
	const [itemsMunicipio, setItemsMunicipio] = useState([]);

    const [openOrganizacao, setOpenOrganizacao] = useState(false);
	const [valueOrganizacao, setValueOrganizacao] = useState(isUpdate ? aterroData.CodOrganizacao : null);
	const [itemsOrganizacao, setItemsOrganizacao] = useState([]);

    const [openPorte, setOpenPorte] = useState(false);
	const [valuePorte, setValuePorte] = useState(isUpdate ? aterroData.CodPorte : null);
	const [itemsPorte, setItemsPorte] = useState([]);

    async function loadDataPicker (table, setFunction) {

        const data = await consulta(table)
        let itemModel = []
        
        data.map((eachData) => {
            itemModel = [...itemModel, {label: eachData.Nome, value: eachData.CodMunicipio || eachData.CodPorte || eachData.CodOrganizacao}]
        })

        setFunction(itemModel)
    }

    useEffect(() => {
        loadDataPicker('municipio', setItemsMunicipio)
        loadDataPicker('organizacao', setItemsOrganizacao)
        loadDataPicker('porte', setItemsPorte)
    }, [])

	async function createAterro() {		
		if (
			nome &&
			endereco &&
			recebimentoBruto &&
			valueMunicipio &&
			valueOrganizacao &&
			valuePorte
		) {
			const data = {
				Nome: nome,
				Endereco: endereco,
				RecebimentoBruto: parseFloat(recebimentoBruto),
				CodMunicipio: valueMunicipio,
				CodOrganizacao: valueOrganizacao,
				CodPorte: valuePorte,
				// As informações abaixo não são mais usadas, 
				// para não mudar o banco de dados por enquanto estou deixando com valores padrão.
				RecebimentoGerado: 0.0,
				BaciaHidrografica: "",
				CondicaoClimatica: "",
				Longitude: 0.0,
				Latitude: 0.0,
				LicencaPrevia: "",
				LicencaOperacional: "",
			};
			
			if (isUpdate){
				atualiza(aterroData.CodAterro, 'aterro', data);
				Alert.alert("Sucesso", "Aterro atualizado com sucesso.");
			}
			else{
				inclui('aterro', data);
				Alert.alert("Sucesso", "Aterro criado com sucesso.")
			}

			navigation.navigate('Home');
		} else {
			Alert.alert("Erro", "Preencha todos os campos.");
		}
	}

	

	return (
		<ScrollView
			style={{
				width: '100%',
			}}
		>
			<Container>
				<Header title={isUpdate ? `Atualizar ${aterroData.Nome}` : `Cadastro Aterro`} />

				<ViewTitle>
					<Title>Preencha os dados referente ao Aterro</Title>
					<Entypo name='home' size={46} color='black' />
				</ViewTitle>

				<InputGroup>
					<Text>Aterro: </Text>
					<Input
						placeholder='Digite aqui o nome do aterro'
						onChangeText={setNome}
						value={nome}
					/>
				</InputGroup>

				<InputGroup>
					<Text>Endereço: </Text>
					<Input
						placeholder='Digite aqui o endereço do aterro'
						onChangeText={setEndereco}
						value={endereco}
					/>
				</InputGroup>

				<InputGroup>
					<Text>Recebimento Bruto (t/dia): </Text>
					<Input
						placeholder='Digite aqui o recebimento bruto'
						onChangeText={setRecebimentoBruto}
						value={recebimentoBruto}
						keyboardType='numeric'
					/>
				</InputGroup>

				<InputGroup style={{ zIndex: 5000 }}>
					<Text>Município do Aterro:</Text>
					<PickerContainer style={{ zIndex: 5000 }}>
						<Picker
							open={openMunicipio}
							value={valueMunicipio}
							items={itemsMunicipio}
							setOpen={setOpenMunicipio}
							setValue={setValueMunicipio}
							setItems={setItemsMunicipio}
							placeholder="Selecione o município"
							zIndex={5000}
							zIndexInverse={3000}
							listMode='SCROLLVIEW'
							usePortal={true}
						/>
					</PickerContainer>
				</InputGroup>
				<InputGroup style={{ zIndex: 4000 }}>
					<Text>Organização do Aterro:</Text>
					<PickerContainer style={{ zIndex: 4000 }}>
						<Picker
							open={openOrganizacao}
							value={valueOrganizacao}
							items={itemsOrganizacao}
							setOpen={setOpenOrganizacao}
							setValue={setValueOrganizacao}
							setItems={setItemsOrganizacao}
							placeholder="Selecione a Organização"
							zIndex={4000}
							zIndexInverse={5000}
							listMode='SCROLLVIEW'
							usePortal={true}
						/>
					</PickerContainer>
				</InputGroup>
				<InputGroup style={{ zIndex: 3000 }}>
					<Text>Porte do Aterro:</Text>
					<PickerContainer style={{ zIndex: 3000 }}>
						<Picker
							open={openPorte}
							value={valuePorte}
							items={itemsPorte}
							setOpen={setOpenPorte}
							setValue={setValuePorte}
							setItems={setItemsPorte}
							placeholder="Selecione o Porte"
							zIndex={3000}
							zIndexInverse={5000}
							listMode='SCROLLVIEW'
							usePortal={true}
						/>
					</PickerContainer>
				</InputGroup>

				<ButtonGroup>
					<Button onPress={() => navigation.goBack()}>
						<TextButton>Cancelar</TextButton>
					</Button>
					<Button
						onPress={() => createAterro()}
					>
						<TextButton>{isUpdate ? "Atualizar" : "Cadastrar"}</TextButton>
					</Button>
				</ButtonGroup>
			</Container>
		</ScrollView>
	);
};

export default CadastroAterro;
