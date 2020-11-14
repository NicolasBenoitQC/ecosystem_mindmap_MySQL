// Dependencies
import { DataTypes, } from "sequelize";

// interface typing

// App file
//import { sequelize } from '../../database';

export const folderModelAttributes = {
    name_folder: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description_folder: {
      type: DataTypes.STRING,
    },
    active: {
      type: DataTypes.BOOLEAN
    }
};

//export const FolderModel = sequelize.define('User', folderAttributes);
