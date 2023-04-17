import db from "./sqliteDb";

/**
 * INICIALIZAÇÃO DA TABELA
 * - Executa sempre, mas só cria a tabela caso não exista (primeira execução)
 */
db.transaction((tx) => {
  //<<<<<<<<<<<<<<<<<<<<<<<< USE ISSO APENAS DURANTE OS TESTES!!! >>>>>>>>>>>>>>>>>>>>>>>
  // tx.executeSql("DROP TABLE aterro;");
  //<<<<<<<<<<<<<<<<<<<<<<<< USE ISSO APENAS DURANTE OS TESTES!!! >>>>>>>>>>>>>>>>>>>>>>>

  tx.executeSql(
    "CREATE TABLE IF NOT EXISTS avaliacaoTecnica (id INTEGER PRIMARY KEY AUTOINCREMENT, Nome TEXT, Endereco TEXT, BaciaHidrografica TEXT, RecebimentoBruto FLOAT, RecebimentoGerado FLOAT, CondicaoClimatica TEXT, Latitude FLOAT, Longitude FLOAT, LicencaPrevia TEXT, LicencaOperacional TEXT, Municipio TEXT, Organizacao TEXT, Porte TEXT);"
  );
});

