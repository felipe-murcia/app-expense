// App.tsx
import React from 'react';
import { View, Text, Button } from 'react-native';
import { Navigation } from './Navigation';
import { SQLiteDatabase, SQLiteProvider } from "expo-sqlite";
import { StatusBar } from "expo-status-bar";

const createDbIfNeeded = async (db: SQLiteDatabase) => {
  //
  console.log("Creating database");
  try {
    // Create a table
    const response = await db.execAsync(
      `CREATE TABLE IF NOT EXISTS expenses (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        category TEXT NOT NULL,
        amount INTEGER NOT NULL,
        year INTEGER NOT NULL,
        month INTEGER NOT NULL
      );`
    );
    console.log("Database created", response);
  } catch (error) {
    console.error("Error creating database:", error);
  }
};

const App = () => {
  
  return (
    <>
      <SQLiteProvider databaseName="expense1.db" onInit={createDbIfNeeded}>
        <Navigation />
      </SQLiteProvider>
      <StatusBar style="auto" />
    </>
  );
};

export default App;
