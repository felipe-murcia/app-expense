

import React, { createContext, useContext, useEffect, useState } from 'react';
import * as SQLite from 'expo-sqlite';
import { IDate } from '../interface/IDate';
import { IExpense } from '../interface/IExpense';

export const useSQLite = ({ month = 0 , year = 0 }:IDate) => {

    const database = SQLite.useSQLiteContext();

    const [ data, setData ] = useState<any>([]);
    // const [ loading, setLoading ] = useState<boolean>(true);

    useEffect(() => {
        loadData({ month, year});
    }, [ month, year ]);

    const loadData = async (data: IDate) => {
        try {          
            console.log('carga inical ', data);
            const result = await database.getAllAsync<IExpense[]>(`SELECT * FROM expenses WHERE month = ? AND year = ?; `, [ data.month, data.year]);
            console.log('result', result);
            setData(result);
        } catch (error) {
            console.log('Error loading data', error);
        }
    };

    const deleteService = async (id: number) => {
        try {          
            console.log('init delete ', data);
            const result = await database.runAsync(`DELETE FROM expenses WHERE id = ?; `, [id]);
            console.log('result', result?.changes!);
            loadData({ month, year})
        } catch (error) {
            console.log('Error delete data', error);
        }
    };

    const createData = async (data:IExpense) => {
        try {

            const response = await database.runAsync(
                `INSERT INTO expenses (name, category, amount, year, month) VALUES ( ?, ?, ?, ?, ?)`,
                [
                    data.name,
                    data.category,
                    data.amount,
                    data.year,
                    data.month
                ]
              );
            //loadData({ month, year});
            console.log("Item saved successfully:",  response?.changes!);
            return response?.changes!;
        } catch (error) {
            console.log('Error creating table', error);
            return false;
        }
    };

    return { data, loadData, createData, deleteService };
}
