import mysql from 'mysql';
import dotenv from 'dotenv';
//import {getAllCells, getCellsByPropsIdStemCell, newCell,updatePropsCellById} from './cells/cells.methodss';

dotenv.config();

export const DbConnection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: 3306
});



export const DatabaseConnection = async () => {
    DbConnection.connect((err) => {
        if (err) {
            console.log(err.message);
        };
        console.log(`Database ${process.env.DATABASE} is ${DbConnection.state}`);
        //getAllCells();
        //getCellsByPropsIdStemCell(1);
        //newCell('Nico', 'test insert row', 4, 1);
        //updatePropsCellById({id:3,title:'Nicolas',description: 'ttdydc fff',position:4,idStemCell:1})
    })
}

export const UniteTestDbConnection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASETEST,
    port: 3306
});

export const UnitTestDatabaseConnection = async () => {

    UniteTestDbConnection.connect((err) => {
        if (err) {
            console.log(err.message);
        };
        console.log(`Database ${process.env.DATABASETEST} is ${DbConnection.state}`);
    })
    
};