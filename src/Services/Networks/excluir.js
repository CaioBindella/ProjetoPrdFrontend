import aterro from '../SqlTables/aterro';
import municipio from '../SqlTables/municipio'
import organizacao from '../SqlTables/organizacao'
import porte from '../SqlTables/porte'
import analise from '../SqlTables/analise';

import axios from 'axios';
import { localStorage, baseUrl } from '../config';

export const excluir = async (id, table) => {
    switch (table){
        case 'aterro':
            if(localStorage){
                return await aterro.remove(id)
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
                return await municipio.remove(id)
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
                return await organizacao.remove(id)
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
                return await porte.remove(id)
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
        case 'analise': 
            if(localStorage){
                return await analise.remove(id)
            }
            else{
                // Fazer depois quando for em nuvem
                // axios
                // 	.get(`${baseUrl}/porte`, data)
                // 	.then((response) => {
                // 		console.log(response);
                // 	})
                // 	.catch((error) => console.log(JSON.stringify(error)));
            }
            break
        default:
            break
    }
}
