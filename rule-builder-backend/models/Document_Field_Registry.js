import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";


const DocumentFieldRegistry = sequelize.define('Document_Field_Registry', {
    Document_ID: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    Field_Name: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    Field_Description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    Field_Column_Name: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    regex: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    extraction_technique: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    Is_MultiRow: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    Child_Mapping_Config: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    basemodel_data_type: {
      type: DataTypes.STRING(200),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Document_Field_Registry',
    schema: 'dbo',
    timestamps: false
  });

export default DocumentFieldRegistry;
