import Municipality from '../models/municipality.js';

async function getAllMunicipalities(req, res) {
  try {
    const municipalities = await Municipality.findAll({ order: [['province'], ['name']] });
    res.json(municipalities);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los municipios' });
  }
}

export default{
    getAllMunicipalities 
};