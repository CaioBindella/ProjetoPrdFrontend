import aterro from '../SqlTables/aterro';
import municipio from '../SqlTables/municipio'
import organizacao from '../SqlTables/organizacao'
import porte from '../SqlTables/porte'
import analise from '../SqlTables/analise';
import { indiceDb } from '../SqlTables/sqliteDb';
import { Alert } from 'react-native';

import axios from 'axios';
import { localStorage, baseUrl } from '../config';

export const excluir = async (id, table) => {

    const getAnalysis = () => {
        return new Promise((resolve, reject) => {
            indiceDb.then((data) => {
                data.transaction((tx) => {
                    // SQL command
                    tx.executeSql(
                        `SELECT * FROM Analise WHERE CodAterro = ? ORDER BY CAST(SUBSTR(DataIni, 0, 3) AS UNSIGNED);`,
                        [id],
                        (_, { rows }) => resolve(rows._array),
                        (_, error) => reject(error) // internal error in tx.executeSql
                    );
                });
            });
        });
    }

    
    switch (table) {
        case 'aterro':
            if (localStorage) {
                getAnalysis()
                    .then((analyses) => {
                        if (analyses.length > 0) {
                            Alert.alert("Erro", "Não é possível deletar esse aterro pois existem análises cadastradas!");
                        }else {
                            Alert.alert("Sucesso", "Aterro deletado!");
                            return aterro.remove(id) 
                        }
                    })
                    .catch((error) => {
                        console.error("Error fetching analyses:", error);
                    });
            } else {
                axios
                    .post(`${baseUrl}/aterro`, data)
                    .then((response) => {
                        console.log(response);
                    })
                    .catch((error) => console.log(JSON.stringify(error)));
            }
            break;
        case 'municipio':
            if(localStorage){
                return await municipio.remove(id)
            }
            else{
                axios
                	.get(`${baseUrl}/municipio`, data)
                	.then((response) => {
                		console.log(response);
                    Alert.alert("Sucesso", "Município deletado!");
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
