// Dependencies
import dotenv from 'dotenv';
import mysql from 'mysql';
import { Sequelize } from "sequelize";

// interface typing
import { IFoldersAttributes } from './library/folders/folders.types';

// App file
import { folderModelAttributes } from './library/folders/folders.model';
import { createFolder } from './library/folders/folders.methods';

dotenv.config();

const DATABASE: string = process.env.DATABASE;
const USERNAME: string = process.env.USER;
const PASSWORD: string = process.env.PASSWORD;
const HOST: string = process.env.HOST;
const PORT: number = 3306;

export const DbConnection = mysql.createConnection({
    host: HOST,
    user: USERNAME,
    password: PASSWORD,
    database: DATABASE,
    port: PORT,
});

export const sequelize = new Sequelize(DATABASE, USERNAME, PASSWORD, {
    host: HOST,
    dialect: 'mysql',
    logging: false,
});

export const DatabaseConnection = async () => {
    try {
        // direct connection to MySql, should be delete when mindmap builder switch to SEQUELIZE.
        DbConnection.connect((err) => {
            if (err) {
                console.error(`Error direct connection to MySql database : 
                                ${process.env.DATABASE} is ${DbConnection.state}`,
                                err)
            }

            console.log(`${process.env.DATABASE} database is ${DbConnection.state}`);
        });
                    
        // connection to mysql by SEQUELIZE.
        await sequelize.authenticate()
                        .then(() => {
                            console.log('Connection has been established successfully.');
                        })
                        .catch((err) => {
                            console.error(`Connection has NOT established : `, err);
                        });
                        
        // create table if not exists 'Users'
        await FolderModel.sync()
                        .then(() => {
                            //console.log(`create table 'Folder' if not exists`);
                        })
                        .catch((err:any) => {
                            console.error(`Error to create table 'Folder' if not exists `, err);
                        });
    } catch (error) {
        console.error('Unable to connect to the database: ', error);
    };
};

export const CloseDatabase = () => {
    sequelize.close();
};

export const FolderModel = sequelize.define('Folder', folderModelAttributes);

const newFolder: IFoldersAttributes = {
    name_folder: 'nico',
    description_folder: 'test des',
    active: true,
};