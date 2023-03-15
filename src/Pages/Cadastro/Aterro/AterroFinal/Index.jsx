import React,{useState, useEffect} from "react";

import {
    Container,
    Content,
} from './Style'

import DropDownPicker from 'react-native-dropdown-picker';
import Header from "../../Components/Header";
import municipio from "../../../../Services/SqlTables/municipio";

function AterroFinal({navigation, route}) {
    const [open, setOpen] = useState(false);
	const [value, setValue] = useState(null);
	const [items, setItems] = useState([]);

    async function loadMunicipio () {
        const listMunicipio = await municipio.all()
        
        listMunicipio.map((eachMunicipio) => {
            setItems([...items, {label: eachMunicipio.nome, value: eachMunicipio.nome}])

        })

        // console.log(listMunicipio)
    }

    useEffect(() => {
        loadMunicipio()
    }, [])

    async function createAterro() {
        // const data = route.params.Data;
		// if (
		// 	nome &&
		// 	endereco &&
		// 	baciaHidrografica &&
		// 	recebimentoBruto &&
		// 	recebimentoGerado &&
		// 	CondicaoClimatica &&
		// 	Longitude &&
		// 	Latitude
		// ) {

		// 	aterro.create(data)
		// 		.then( id => console.log('Aterro created with id: '+ id) )
		// 		.catch( err => console.log(err) )

			
		// 	navigation.navigate('Home')
		// } else {
		// 	alert('Há campos vazios');
		// }
	}
    return(
        <Container>
            <Header title='Cadastrar Aterro'/>

            <Content>
                <DropDownPicker
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                    placeholder="Selecione o município"
                />
            </Content>
        </Container>
    );
};

export default AterroFinal