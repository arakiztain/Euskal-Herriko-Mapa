import sequelize from "../config/sequelize.js";
import User from "./user.js";
import Group from "./group.js";
import Municipality from "./municipality.js";
import GroupMember from "./groupMember.js";

// Relación usuarios <-> grupos (a través de group_members)
User.belongsToMany(Group, { through: GroupMember });
Group.belongsToMany(User, { through: GroupMember });

// Relación usuario <-> municipios
User.hasMany(Municipality);
Municipality.belongsTo(User);

export {
  sequelize,
  User,
  Group,
  Municipality,
  GroupMember,
};
