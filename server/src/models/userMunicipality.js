import { DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.js';

const UserMunicipality = sequelize.define('UserMunicipality', {
  id: { 
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true 
},
  userId: { 
    type: DataTypes.INTEGER,
    allowNull: false 
},
  municipalityId: { 
    type: DataTypes.STRING(10),
    allowNull: false 
},
  visitedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW 
}
}, {
  tableName: 'user_municipalities',
  timestamps: false,
});

export default UserMunicipality;
