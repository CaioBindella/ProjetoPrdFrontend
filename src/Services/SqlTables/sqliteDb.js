import * as SQLite from 'expo-sqlite'

const db = SQLite.openDatabase("isoas.db")

export default db