// Dependencies
import { DataTypes, } from "sequelize";

// interface typing

// App file

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

