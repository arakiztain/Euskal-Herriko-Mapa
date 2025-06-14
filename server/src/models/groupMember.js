import { DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.js';

const GroupMember = sequelize.define('GroupMember', {
  id: { 
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true 
  },
  groupId: { 
    type: DataTypes.INTEGER, 
    allowNull: false 
  },
  userId: { 
    type: DataTypes.INTEGER, 
    allowNull: false 
  },
  joinedAt: { 
    type: DataTypes.DATE, 
    defaultValue: DataTypes.NOW 
  }
}, {
  tableName: 'group_members',
  timestamps: false,
});

export default GroupMember;
