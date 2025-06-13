import { Sequelize } from 'sequelize';
import UserModel from './user.js';
import MunicipalityModel from './municipality.js';
import UserMunicipalityModel from './userMunicipality.js';
import GroupModel from './group.js';
import GroupMemberModel from './groupMember.js';

const sequelize = new Sequelize(process.env.DB_URL); // o config específico

const User = UserModel(sequelize);
const Municipality = MunicipalityModel(sequelize);
const UserMunicipality = UserMunicipalityModel(sequelize);
const Group = GroupModel(sequelize);
const GroupMember = GroupMemberModel(sequelize);

// Relaciones

// Usuarios - Municipios (Many-to-Many) via UserMunicipality
User.belongsToMany(Municipality, { through: UserMunicipality, foreignKey: 'userId' });
Municipality.belongsToMany(User, { through: UserMunicipality, foreignKey: 'municipalityId' });

// Grupos - Usuarios (Many-to-Many) via GroupMember
Group.belongsToMany(User, { through: GroupMember, foreignKey: 'groupId' });
User.belongsToMany(Group, { through: GroupMember, foreignKey: 'userId' });

export {
  sequelize,
  User,
  Municipality,
  UserMunicipality,
  Group,
  GroupMember
};
