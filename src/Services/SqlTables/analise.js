import { indiceDb } from "./sqliteDb";

/**
 * CRIAÇÃO DE UM NOVO REGISTRO
 * - Recebe um objeto;
 * - Retorna uma Promise:
 *  - O resultado da Promise é o ID do registro (criado por AUTOINCREMENT)
 *  - Pode retornar erro (reject) caso exista erro no SQL ou nos parâmetros.
 */
const create = (obj) => {    
    return new Promise((resolve, reject) => {
        indiceDb.then((data) => {
            data.transaction((tx) => {
            //comando SQL modificável
            tx.executeSql(
                `
                INSERT INTO Analise (DataIni, CodAterro) VALUES (?, ?);
                `,
                [obj.initialDate, obj.codAterro],
                //-----------------------
                (_, { rows }) => resolve(rows._array),
                (_, error) => reject(error) // erro interno em tx.executeSql
            );
            });
        });
    })
};

/**
 * BUSCA TODOS OS REGISTROS DE UMA DETERMINADA TABELA
 * - Não recebe parâmetros;
 * - Retorna uma Promise:
 *  - O resultado da Promise é uma lista (Array) de objetos;
 *  - Pode retornar erro (reject) caso o ID não exista ou então caso ocorra erro no SQL;
 *  - Pode retornar um array vazio caso não existam registros.
 */
const all = () => {
    return new Promise((resolve, reject) => {
        indiceDb.then((data) => {
            data.transaction((tx) => {
            //comando SQL modificável
            tx.executeSql(
                `
                SELECT * FROM Analise;
                `,
                [],
                //-----------------------
                (_, { rows }) => resolve(rows._array),
                (_, error) => reject(error) // erro interno em tx.executeSql
            );
            });
        });
    })
}

/**
 * REMOVE UM REGISTRO POR MEIO DO ID
 * - Recebe o ID do registro;
 * - Retorna uma Promise:
 *  - O resultado da Promise a quantidade de registros removidos (zero indica que nada foi removido);
 *  - Pode retornar erro (reject) caso o ID não exista ou então caso ocorra erro no SQL.
 */
const remove = (id) => {
    return new Promise((resolve, reject) => {
        indiceDb.then((data) => {
            data.transaction((tx) => {
            //comando SQL modificável
            tx.executeSql(
                `
                DELETE FROM Analise WHERE CodAnalise=?;
                `,
                [id],
                //-----------------------
                (_, { rows }) => resolve(rows._array),
                (_, error) => reject(error) // erro interno em tx.executeSql
            );
            });
        });
    })
}

export default {
  create,
  all,
  remove,
};