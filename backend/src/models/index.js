import sequelize from '../config/db.js';
import User from './user.js';
import Municipality from './municipality.js';

// Relaciones
User.hasMany(Municipality, { foreignKey: 'userId' });
Municipality.belongsTo(User, { foreignKey: 'userId' });

// Sincronizar modelos con la base de datos
(async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log('Modelos sincronizados con la base de datos');
  } catch (error) {
    console.error('Error al sincronizar modelos:', error);
  }
})();

export { User, Municipality };