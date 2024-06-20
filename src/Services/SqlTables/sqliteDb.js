import * as FileSystem from 'expo-file-system';
import * as SQLite from 'expo-sqlite/legacy'
import { Asset } from 'expo-asset'

export async function openDatabase() {
  // Código que reseta o banco de dados a cada restart da aplicação
  // if (!(await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'SQLite')).exists) {
  //   await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'SQLite');
  // }

  // await FileSystem.downloadAsync(
  //   Asset.fromModule(require('../../Assets/DatabaseFile/indicesDatabase.db')).uri,
  //   FileSystem.documentDirectory + 'SQLite/indicesDatabase.db'
  // );

  // Código que analisa se já tem um banco instalado e não reseta
  if (!(await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'SQLite/indicesDatabase.db')).exists) {
    if (!(await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'SQLite')).exists) {
      await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'SQLite');
    }

    const asset = await Asset.fromModule(require("../../Assets/DatabaseFile/indicesDatabase.db")).downloadAsync();
    await FileSystem.copyAsync({
      from: asset.localUri,
      to: FileSystem.documentDirectory + 'SQLite/indicesDatabase.db',
    });

  }

  return SQLite.openDatabase('indicesDatabase.db');
}

export const indiceDb = openDatabase().then((response) => {
  response._db.exec(
    [{ sql: 'PRAGMA foreign_keys = ON;', args: [] }],
    false,
    () => console.log('Foreign keys turned on'),
  )
  return response
})

