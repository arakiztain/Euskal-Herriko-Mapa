import { DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.js';

const Municipality = sequelize.define('Municipality', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  municipality: {           
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  province: {           
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  visitDate: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  }
}, {
  tableName: 'user_visits',
  timestamps: true,
});


export default Municipality;
