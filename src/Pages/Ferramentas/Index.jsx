import React, { useState } from "react";
import { Container, Button, Text, ButtonGroup } from "./Style";

import * as FileSystem from "expo-file-system";
import * as XLSX from "xlsx";
import { indiceDb } from "../../Services/SqlTables/sqliteDb";

import Header from "../Components/Header/Index";
import ImportModal from "./ImportModal/Index";
import ShareModal from "./ShareModal/Index";

const getTable = (table) => {
  return new Promise((resolve, reject) => {
    indiceDb.then((data) => {
      data.transaction((tx) => {
        //comando SQL modificável
        tx.executeSql(
          `
			SELECT * FROM ${table};"
			`,
          [],
          //-----------------------
          (_, { rows }) => resolve(rows._array),
          (_, error) => reject(error) // erro interno em tx.executeSql
        );
      });
    });
  });
};

const getAllTable = () => {
  return new Promise((resolve, reject) => {
    indiceDb.then((data) => {
      data.transaction((tx) => {
        //comando SQL modificável
        tx.executeSql(
          `
				SELECT
				AT.Nome AS [Aterro], AT.Endereco, AT.BaciaHidrografica AS [Bacia Hidrografica], AT.RecebimentoBruto AS [Recebimento Bruto], 
				AT.RecebimentoGerado AS [Recebimento Gerado], AT.CondicaoClimatica AS [Condição Climática], AT.Latitude, AT.Longitude,
				AT.LicencaPrevia AS [Licença Prévia], AT.LicencaOperacional AS [Licença Operacional],

				M.Nome AS [Cidade], M.TamPop AS [População], 
				M.TaxGerPerCapita AS [Taxa de Geração Per Capita], M.PrecipMedAnual AS [Precipitação Média Anual],

				O.Nome AS [Organização], O.Cnpj AS [CNPJ], O.Contato AS [Contato Organização],

				P.Nome AS [Porte],

				A.DataIni AS [Data Avaliação], A.Tipo AS [Abordagem], 

				I.Titulo AS [Indicador], I.DescInd AS [Descrição Indicador],

				AV.Desc AS [Opção Escolhida], 

				AP.Pontuacao AS [Pontuação], AP.Maxima AS [É Máxima],

				SC.DescSubCat AS [SubCategoria Avaliação],

				C.DescCat AS [Categoria Avaliação],

				TI.DescTipo AS [Tipo Indicador],

        AI.Link AS [Link Comprovante],
        AI.PhotoUri AS [Link Foto]

				FROM Indicador I
				INNER JOIN AnaliseItem AI ON AI.CodInd = I.CodInd
				INNER JOIN Analise A ON AI.CodAnalise = A.CodAnalise
				INNER JOIN Aterro AT ON AT.CodAterro = A.CodAterro
				INNER JOIN Municipio M ON M.CodMunicipio = AT.CodMunicipio
				INNER JOIN Organizacao O ON O.CodOrganizacao = AT.CodOrganizacao
				INNER JOIN Porte P ON P.CodPorte = AT.CodPorte
				INNER JOIN AvaliacaoPeso AP ON AI.CodAvPeso = AP.CodAvPeso
				INNER JOIN Avaliacao AV ON AP.CodAval = AV.CodAval
				INNER JOIN SubCategoria SC ON I.CodSubCat = SC.CodSubCat
				INNER JOIN Categoria C ON SC.CodCat = C.CodCat
				INNER JOIN TipoIndicador TI ON C.CodTipoInd = TI.CodTipo
			`,
          [],
          //-----------------------
          (_, { rows }) => resolve(rows._array),
          (_, error) => reject(error) // erro interno em tx.executeSql
        );
      });
    });
  });
};

const makeXLSXFileUnified = async () => {
  var wb = XLSX.utils.book_new();
  const tableData = await getAllTable();
  var ws = XLSX.utils.json_to_sheet(tableData);
  XLSX.utils.book_append_sheet(wb, ws, "Log ISOAS");
  return XLSX.write(wb, { type: "base64", bookType: "xlsx" });
};

const makeXLSXFileSeparate = async () => {
  var wb = XLSX.utils.book_new();
  const tables = [
    "Analise",
    "AnaliseItem",
    "Aterro",
    "Avaliacao",
    "AvaliacaoPeso",
    "Categoria",
    "Indicador",
    "Municipio",
    "Organizacao",
    "Porte",
    "SubCategoria",
    "TipoIndicador",
  ];

  await Promise.all(
    tables.map(async (eachTable) => {
      const tableData = await getTable(eachTable);
      var ws = XLSX.utils.json_to_sheet(tableData);
      XLSX.utils.book_append_sheet(wb, ws, eachTable);
    })
  );

  return XLSX.write(wb, { type: "base64", bookType: "xlsx" });
};

const createXLSX = async (type) => {
  var wbout;
  if (type === "separate") {
    wbout = await makeXLSXFileSeparate();
  } else {
    wbout = await makeXLSXFileUnified();
  }

  const uri = FileSystem.documentDirectory + "XLSX/indicesDatabase.xlsx";

  if (
    !(await FileSystem.getInfoAsync(FileSystem.documentDirectory + "XLSX"))
      .exists
  ) {
    await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + "XLSX");
  }

  // Escreve arquivo Excel no armazenamento do celular
  FileSystem.writeAsStringAsync(uri, wbout, {
    encoding: FileSystem.EncodingType.Base64,
  }).catch((e) => {
    alert(e);
  });
};

const Ferramentas = () => {
  const [importModalVisible, setImportModalVisible] = useState(false);
  const [shareModalVisible, setShareModalVisible] = useState(false);
  const [exportType, setExportType] = useState("");
  const [uri, setUri] = useState("");

  const handleExport = (type) => {
    switch (type) {
      case "Banco de dados":
        setUri("SQLite/indicesDatabase.db");
        setExportType(type);
        setShareModalVisible(true);
        break;
      case "XLSX unificado":
        try {
          createXLSX("unified");
          setUri("XLSX/indicesDatabase.xlsx");
          setExportType(type);
          setShareModalVisible(true);
        } catch (e) {
          alert(e);
        }

        break;
      case "XLSX separado":
        try {
          createXLSX("separate");
          setUri("XLSX/indicesDatabase.xlsx");
          setExportType(type);
          setShareModalVisible(true);
        } catch (e) {
          alert(e);
        }
        break;
      default:
        alert("Opção inválida");
        break;
    }
  };

  return (
    <Container>
      <Header title="Ferramentas" />

      <ButtonGroup>
        <Button onPress={() => setImportModalVisible(true)}>
          <Text>Importar Banco de dados</Text>
        </Button>

        <Button onPress={() => handleExport("Banco de dados")}>
          <Text>Exportar Banco de dados</Text>
        </Button>

        <Button onPress={() => handleExport("XLSX separado")}>
          <Text>Exportar como XLSX separado</Text>
        </Button>

        <Button onPress={() => handleExport("XLSX unificado")}>
          <Text>Exportar como XLSX unificado</Text>
        </Button>
      </ButtonGroup>

      <ImportModal
        modalVisible={importModalVisible}
        setModalVisible={setImportModalVisible}
      />
      <ShareModal
        modalVisible={shareModalVisible}
        setModalVisible={setShareModalVisible}
        exportType={exportType}
        uri={uri}
      />
    </Container>
  );
};

export default Ferramentas;
