import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const GroupMember = sequelize.define('GroupMember', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  }
}, {
  tableName: 'group_members',
  timestamps: true,
});


export default GroupMember;
