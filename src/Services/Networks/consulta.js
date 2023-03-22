import aterro from '../SqlTables/aterro';
import municipio from '../SqlTables/municipio'
import organizacao from '../SqlTables/organizacao'
import porte from '../SqlTables/porte'

import axios from 'axios';
import { localStorage, baseUrl } from '../config';

export const consulta = async (table) => {
    switch (table){
        case 'aterro':
            if(localStorage){
                return await aterro.all()
            }
            else{
                axios
                	.get(`${baseUrl}/aterros`)
                	.then((response) => {
                		return response.data;
                	})
                	.catch((error) => console.log(JSON.stringify(error)));
            }
            break
        case 'municipio':
            if(localStorage){
                return await municipio.all()
            }
            else{
                axios
                	.get(`${baseUrl}/municipio`)
                	.then((response) => {
                		return response.data;
                	})
                	.catch((error) => console.log(JSON.stringify(error)));
            }
            break
        case 'organizacao':
            if(localStorage){
                return await organizacao.all()
            }
            else{
                axios
                	.get(`${baseUrl}/organizacao`)
                	.then((response) => {
                		return response.data;
                	})
                	.catch((error) => console.log(JSON.stringify(error)));
            }
            break
        case 'porte': 
            if(localStorage){
                return await porte.all()
            }
            else{
                axios
                	.get(`${baseUrl}/porte`)
                	.then((response) => {
                		return response.data;
                	})
                	.catch((error) => console.log(JSON.stringify(error)));
            }
            break
        default:
            break
    }
}
