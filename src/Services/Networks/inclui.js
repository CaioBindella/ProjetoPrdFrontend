import aterro from '../SqlTables/aterro';
import municipio from '../SqlTables/municipio'
import organizacao from '../SqlTables/organizacao'
import porte from '../SqlTables/porte'

import axios from 'axios';
import { localStorage, baseUrl } from '../config';

export const inclui = async (table, data) => {
    switch (table){
        case 'aterro':
            if(localStorage){
                return await aterro.create(data)
            }
            else{
                axios
            	.post(`${baseUrl}/aterro`, data)
                	.then((response) => {
                		console.log(response);
                	})
                	.catch((error) => console.log(JSON.stringify(error)));
            }
            break
        case 'municipio':
            if(localStorage){
                return await municipio.create(data)
            }
            else{
                axios
                	.get(`${baseUrl}/municipio`, data)
                	.then((response) => {
                		console.log(response);
                	})
                	.catch((error) => console.log(JSON.stringify(error)));
            }
            break
        case 'organizacao':
            if(localStorage){
                return await organizacao.create(data)
            }
            else{
                axios
                	.get(`${baseUrl}/organizacao`, data)
                	.then((response) => {
                		console.log(response);
                	})
                	.catch((error) => console.log(JSON.stringify(error)));
            }
            break
        case 'porte': 
            if(localStorage){
                return await porte.create(data)
            }
            else{
                axios
                	.get(`${baseUrl}/porte`, data)
                	.then((response) => {
                		console.log(response);
                	})
                	.catch((error) => console.log(JSON.stringify(error)));
            }
            break
        default:
            break
    }
}
