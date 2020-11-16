// Dependencies
import { DataTypes, } from "sequelize";

// interface typing

// App file

export const fileModelAttributes = {
    name_file: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description_file: {
      type: DataTypes.STRING,
    },
    folder_id: {
        type: DataTypes.INTEGER,
    },
    active: {
      type: DataTypes.BOOLEAN
    },
};