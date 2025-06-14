import User from './user.js';
import Municipality from './municipality.js';
import UserMunicipality from './userMunicipality.js';
import Group from './group.js';
import GroupMember from './groupMember.js';

// Relaciones

User.belongsToMany(Municipality, {
  through: UserMunicipality,
  foreignKey: 'userId',
  otherKey: 'municipalityId'
});

Municipality.belongsToMany(User, {
  through: UserMunicipality,
  foreignKey: 'municipalityId',
  otherKey: 'userId'
});

Group.belongsToMany(User, {
  through: GroupMember,
  foreignKey: 'groupId',
  otherKey: 'userId'
});

User.belongsToMany(Group, {
  through: GroupMember,
  foreignKey: 'userId',
  otherKey: 'groupId'
});

export {
  User,
  Municipality,
  UserMunicipality,
  Group,
  GroupMember
};
