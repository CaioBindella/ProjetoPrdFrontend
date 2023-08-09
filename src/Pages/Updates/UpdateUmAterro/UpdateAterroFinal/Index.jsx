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


import { consulta } from "../../../../Services/Networks/consulta";
import { atualiza } from "../../../../Services/Networks/atualiza";
import Header from "../../../Components/Header/Index";


function UpdateAterroFinal({navigation, route}) {
    const aterroData = route.params.aterroData
    const [openMunicipio, setOpenMunicipio] = useState(false);
	const [valueMunicipio, setValueMunicipio] = useState(aterroData.Municipio);
	const [itemsMunicipio, setItemsMunicipio] = useState([]);

    const [openOrganizacao, setOpenOrganizacao] = useState(false);
	const [valueOrganizacao, setValueOrganizacao] = useState(aterroData.Organizacao);
	const [itemsOrganizacao, setItemsOrganizacao] = useState([]);

    const [openPorte, setOpenPorte] = useState(false);
	const [valuePorte, setValuePorte] = useState(aterroData.Porte);
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

			atualiza(aterroData.CodAterro, 'aterro', data)

			navigation.navigate('Home')
		} else {
			alert('Há campos vazios');
		}
	}
    return(
        <Container>
            <Header title={"Atualizar Aterro"} />

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