import mysql from 'mysql';
import dotenv from 'dotenv';

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