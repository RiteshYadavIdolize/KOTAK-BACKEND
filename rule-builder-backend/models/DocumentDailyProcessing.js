import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const DocumentDailyProcessing = sequelize.define('DocumentDailyProcessing', {
    Unique_Identification_Number: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    Reference_No: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    Name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    Applicable: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    Available: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    Path: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    Document_Count: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Extraction_Status: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    remarks: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    txt_path: {
      type: DataTypes.STRING(300),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'DocumentDailyProcessing',
    schema: 'dbo',
    timestamps: false
  });


export default DocumentDailyProcessing;
