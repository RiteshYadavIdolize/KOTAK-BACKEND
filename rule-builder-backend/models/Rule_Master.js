import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const RuleMaster = sequelize.define('RuleMaster',{
    SL_Conditions_No: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    Checklist_Sr_No: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    Sanction_conditions: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    Rule_Number: {
      type: DataTypes.STRING(50),
      allowNull: true,
      primaryKey: true
    },
    Validation_Rule: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    Source_1: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    Match_Operator: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    Source_2: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    Dummy_Data_Required: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    Rule_Description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    Status: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    Priority: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    Dependency: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    Source_Columns: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    Executable_Script: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    Proprietorship: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    Private_Limited_Company: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    LLP: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    Partnership_Firm: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    Public_Limited_Company: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    Applicable_Facilities: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    Applicable_Schemes: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    Document_Dependency: {
      type: DataTypes.STRING(150),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Rule_Master',
    schema: 'dbo',
    timestamps: false
  });


export default RuleMaster;
