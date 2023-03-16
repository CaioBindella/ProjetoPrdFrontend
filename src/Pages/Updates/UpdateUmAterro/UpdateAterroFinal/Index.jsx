import React,{useState, useEffect} from "react";

import {
    Container,
    Content,
    PickerContainer,
    ContentPicker,
    Button,
    ButtonGroup,
    TextButton,
} from './Style'

import DropDownPicker from 'react-native-dropdown-picker';
import Header from "../../../Cadastro/Components/Header";

import aterro from "../../../../Services/SqlTables/aterro";
import municipio from "../../../../Services/SqlTables/municipio";
import organizacao from "../../../../Services/SqlTables/organizacao";
import porte from "../../../../Services/SqlTables/porte";


function UpdateAterroFinal({navigation, route}) {
    const Item = route.params.item
    const [openMunicipio, setOpenMunicipio] = useState(false);
	const [valueMunicipio, setValueMunicipio] = useState(Item.Municipio);
	const [itemsMunicipio, setItemsMunicipio] = useState([]);

    const [openOrganizacao, setOpenOrganizacao] = useState(false);
	const [valueOrganizacao, setValueOrganizacao] = useState(Item.Organizacao);
	const [itemsOrganizacao, setItemsOrganizacao] = useState([]);

    const [openPorte, setOpenPorte] = useState(false);
	const [valuePorte, setValuePorte] = useState(Item.Porte);
	const [itemsPorte, setItemsPorte] = useState([]);

    async function loadDataPicker (dataType, setFunction) {
        const data = await dataType.all()
        let itemModel = []
        
        data.map((eachData) => {
            itemModel = [...itemModel, {label: eachData.nome, value: eachData.nome}]
        })

        setFunction(itemModel)
    }

    useEffect(() => {
        loadDataPicker(municipio, setItemsMunicipio)
        loadDataPicker(organizacao, setItemsOrganizacao)
        loadDataPicker(porte, setItemsPorte)
    }, [])

    async function updateAterro() {
        let data = route.params.data;
		if (
			data && valueMunicipio && valueOrganizacao && valuePorte
		) {
            data = {
                ...data,
                Municipio: valueMunicipio,
                Organizacao: valueOrganizacao,
                Porte: valuePorte
            }

			await aterro.update(Item.id, data)
				.then( id => console.log('Aterro updated with id: '+ id) )
				.catch( err => console.log(err) )

			navigation.navigate('Home')
		} else {
			alert('Há campos vazios');
		}
	}
    return(
        <Container>
            <Header title='Cadastrar Aterro'/>

            <Content>
                <PickerContainer>
                    <ContentPicker>
                        <DropDownPicker
                            open={openMunicipio}
                            value={valueMunicipio}
                            items={itemsMunicipio}
                            setOpen={setOpenMunicipio}
                            setValue={setValueMunicipio}
                            setItems={setItemsMunicipio}
                            placeholder="Selecione o município"
                            zIndex={3000}
                            zIndexInverse={1000}
                        />
                    </ContentPicker>
                    <ContentPicker>
                        <DropDownPicker
                            open={openOrganizacao}
                            value={valueOrganizacao}
                            items={itemsOrganizacao}
                            setOpen={setOpenOrganizacao}
                            setValue={setValueOrganizacao}
                            setItems={setItemsOrganizacao}
                            placeholder="Selecione a Organização"
                            zIndex={2000}
                            zIndexInverse={2000}
                        />
                    </ContentPicker>
                    <ContentPicker>
                        <DropDownPicker
                            open={openPorte}
                            value={valuePorte}
                            items={itemsPorte}
                            setOpen={setOpenPorte}
                            setValue={setValuePorte}
                            setItems={setItemsPorte}
                            placeholder="Selecione o Porte"
                            zIndex={1000}
                            zIndexInverse={3000}
                        />
                    </ContentPicker>
                </PickerContainer>
            </Content>

            <ButtonGroup>
                <Button onPress={() => navigation.goBack()}>
                    <TextButton>Voltar</TextButton>
                </Button>
                <Button
                    onPress={() => {
                        updateAterro()
                        alert('Atualizado'); 
                    }}
                >
                    <TextButton>Atualizar</TextButton>
                </Button>
            </ButtonGroup>
        </Container>
    );
};

export default UpdateAterroFinal