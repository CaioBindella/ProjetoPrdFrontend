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
            INSERT INTO Aterro (Nome, Endereco, BaciaHidrografica, RecebimentoBruto, RecebimentoGerado, CondicaoClimatica, Latitude, Longitude, LicencaPrevia, LicencaOperacional, CodMunicipio, CodOrganizacao, CodPorte) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
            `,
            [obj.Nome, obj.Endereco, obj.BaciaHidrografica, obj.RecebimentoBruto, obj.RecebimentoGerado, obj.CondicaoClimatica, obj.Latitude, obj.Longitude, obj.LicencaPrevia, obj.LicencaOperacional, obj.CodMunicipio, obj.CodOrganizacao, obj.CodPorte],
            //-----------------------
            (_, { rowsAffected, insertId }) => {
              if (rowsAffected > 0) resolve(insertId);
              else reject("Error inserting obj: " + JSON.stringify(obj)); // insert falhou
            },
            (_, error) => reject(error) // erro interno em tx.executeSql
        );
        });
    });
  })
};

/**
 * ATUALIZA UM REGISTRO JÁ EXISTENTE
 * - Recebe o ID do registro e um OBJETO com valores atualizados;
 * - Retorna uma Promise:
 *  - O resultado da Promise é a quantidade de registros atualizados;
 *  - Pode retornar erro (reject) caso o ID não exista ou então caso ocorra erro no SQL.
 */
const update = (id, obj) => {
  return new Promise((resolve, reject) => {
    indiceDb.then((data) => {
        data.transaction((tx) => {
        //comando SQL modificável
        tx.executeSql(
            `
            UPDATE Aterro SET Nome=?, Endereco=?, BaciaHidrografica=?, RecebimentoBruto=?, RecebimentoGerado=?, CondicaoClimatica=?, Latitude=?, Longitude=?, LicencaPrevia=?, LicencaOperacional=?, CodMunicipio=?, CodOrganizacao=?, CodPorte=? WHERE CodAterro=?;
            `,
            [obj.Nome, obj.Endereco, obj.BaciaHidrografica, obj.RecebimentoBruto, obj.RecebimentoGerado, obj.CondicaoClimatica, obj.Latitude, obj.Longitude, obj.LicencaPrevia, obj.LicencaOperacional, obj.CodMunicipio, obj.CodOrganizacao, obj.CodPorte, id],
            //-----------------------
            (_, { rowsAffected, insertId }) => {
              if (rowsAffected > 0) resolve(insertId);
              else reject("Error updating obj: id=" + id); // nenhum registro alterado
            },
            (_, error) => reject(error) // erro interno em tx.executeSql
        );
        });
    });
  })
};

/**
 * BUSCA UM REGISTRO POR MEIO DO ID
 * - Recebe o ID do registro;
 * - Retorna uma Promise:
 *  - O resultado da Promise é o objeto (caso exista);
 *  - Pode retornar erro (reject) caso o ID não exista ou então caso ocorra erro no SQL.
 */
const find = (id) => {
  return new Promise((resolve, reject) => {
    indiceDb.then((data) => {
        data.transaction((tx) => {
        //comando SQL modificável
        tx.executeSql(
            `
            SELECT * FROM Aterro WHERE CodAterro=?;
            `,
            [id],
            //-----------------------
            (_, { rows }) => {
              if (rows.length > 0) resolve(rows._array[0]);
              else reject("Obj not found: id=" + id); // nenhum registro encontrado
            },
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
          SELECT * FROM Aterro;
          `,
          [],
          //-----------------------
          (_, { rows }) => resolve(rows._array),
          (_, error) => reject(error) // erro interno em tx.executeSql
        );
        });
    });
  })
};

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
          DELETE FROM aterro WHERE CodAterro=?;
          `,
          [id],
          //-----------------------
          (_, { rowsAffected }) => {
            resolve(rowsAffected);
          },
          (_, error) => reject(error) // erro interno em tx.executeSql
        );
      });
    });
  })
};

export default {
  create,
  update,
  find,
  all,
  remove,
};