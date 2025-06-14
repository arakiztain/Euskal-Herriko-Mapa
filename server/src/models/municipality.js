import { DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.js';

const Municipality = sequelize.define('Municipality', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true
  },
  province: { 
    type: DataTypes.STRING(50),
    allowNull: false 
  }
}, {
  tableName: 'municipalities',
  timestamps: true,
});

export default Municipality;
