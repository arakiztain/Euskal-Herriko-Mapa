import sequelize from '../src/config/sequelize.js';
import Municipality from '../src/models/municipality.js';
import municipios from '../data/municipalities.json' assert { type: 'json' };

export async function seed() {
  try {
    for (const municipio of municipios) {
      await Municipality.findOrCreate({
        where: { name: municipio.name },
        defaults: { province: municipio.province }
      });
    }
    console.log('✔️ Municipios cargados correctamente.');
  } catch (err) {
    console.error('❌ Error al cargar municipios:', err);
    throw err; 
  }
}
