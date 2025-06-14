import { DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.js';

const Group = sequelize.define('Group', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
  }
}, {
  tableName: 'groups',
  timestamps: true,
});

export default Group;
