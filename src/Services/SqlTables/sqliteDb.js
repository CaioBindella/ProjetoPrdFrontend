import * as FileSystem from 'expo-file-system';
import * as SQLite from 'expo-sqlite'
import { Asset } from 'expo-asset'

// import Indices from "../../Assets/DatabaseFile/indicesDatabase"

export async function openDatabase() {
  // Elimina um erro attempt to write a readonly database de alguma forma
  const database = SQLite.openDatabase("indicesDatabase.db")
  database._db.close()

  if (!(await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'SQLite/indicesDatabase.db')).exists) {
    if (!(await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'SQLite')).exists) {
      await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'SQLite');
    }
  
    await FileSystem.downloadAsync(
      Asset.fromModule(require('../../Assets/DatabaseFile/indicesDatabase.db')).uri,
      FileSystem.documentDirectory + 'SQLite/indicesDatabase.db'
    );
  }

  return SQLite.openDatabase('indicesDatabase.db');
}

export const indiceDb = openDatabase().then((response) => response)

const db = SQLite.openDatabase("isoas.db")

export default db