import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const DocumentChecklistMaster = sequelize.define('Document_Checklist_Master', {
    ID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      primaryKey: true
    },
    Name: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    Description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    Checklist: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    Checklist_Number: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    Keywords: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    Model: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    instance: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    Source_Table_Name: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    priority: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    parser: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    txt_path: {
      type: DataTypes.STRING(300),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Document_Checklist_Master',
    schema: 'dbo',
    timestamps: false
  });

export default DocumentChecklistMaster;
