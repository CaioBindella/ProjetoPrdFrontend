import { indiceDb } from "./sqliteDb";
import { Alert } from "react-native";

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
            INSERT INTO Organizacao (Nome, Cnpj, Contato) values (?, ?, ?);
            `,
            [obj.Nome, obj.CNPJ, obj.Contato],
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
            UPDATE Organizacao SET Nome=?, Cnpj=?, Contato=? WHERE CodOrganizacao=?;
            `,
            [obj.Nome, obj.CNPJ, obj.Contato, id],
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
            SELECT * FROM Organizacao WHERE CodOrganizacao=?;
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
          SELECT * FROM Organizacao;
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
// const remove = (id) => {
//   return new Promise((resolve, reject) => {
//     indiceDb.then((data) => {
//         data.transaction((tx) => {
//         //comando SQL modificável
//         tx.executeSql(
//           `
//           DELETE FROM Organizacao WHERE CodOrganizacao=?;
//           `,
//           [id],
//           //-----------------------
//           (_, { rowsAffected }) => {
//             resolve(rowsAffected);
//           },
//           (_, error) => reject(error) // erro interno em tx.executeSql
//         );
//       });
//     });
//   })
// };

const remove = (id) => {
  return new Promise((resolve, reject) => {
    indiceDb.then((data) => {
      data.transaction((tx) => {
        // Primeiro, verificamos se existem aterros cadastrados com a organização especificada
        tx.executeSql(
          `
          SELECT COUNT(*) as count FROM Aterro WHERE CodOrganizacao=?;
          `,
          [id],
          (_, { rows: { _array } }) => {
            const { count } = _array[0];
            if (count > 0) {
              // Se houver aterros cadastrados, rejeitamos a promessa
              reject(new Error(`Existem ${count} aterro(s) cadastrado(s) com a organização ${id}.`));
              Alert.alert("Erro", `Existem ${count} aterro(s) cadastrado(s) com a organização ${id}.`)
            } else {
              // Caso contrário, prosseguimos com a exclusão da organização
              tx.executeSql(
                `
                DELETE FROM Organizacao WHERE CodOrganizacao=?;
                `,
                [id],
                (_, { rowsAffected }) => {
                  resolve(rowsAffected);
                },
                (_, error) => reject(error) // erro interno em tx.executeSql
              );
              Alert.alert("Sucesso", `Organização excluída.`)
            }
          },
          (_, error) => reject(error) // erro interno em tx.executeSql para a verificação
        );
      });
    });
  });
};


export default {
  create,
  update,
  find,
  all,
  remove,
};