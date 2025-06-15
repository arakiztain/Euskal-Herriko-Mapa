import sequelize from '../src/config/sequelize.js';
import Municipality from '../src/models/municipality.js';
import municipios from '../data/municipalities.json' assert { type: 'json' };

export async function seed() {
  try {
    const count = await Municipality.count();

    if (count === 0) {
      const municipiosValidos = municipios.filter(m => !m.name.startsWith('path'));

      for (const municipio of municipiosValidos) {
        await Municipality.findOrCreate({
          where: { name: municipio.name },
          defaults: { province: municipio.province }
        });
      }

      console.log(`✔️ ${municipiosValidos.length} municipios cargados correctamente.`);
    } else {
      console.log('ℹ️ Ya existen municipios en la base, no se ejecuta el seed.');
    }
  } catch (err) {
    console.error('❌ Error al cargar municipios:', err);
    throw err; 
  }
}
