import Municipality from '../models/municipality.js';
import UserMunicipality from '../models/userMunicipality.js';

async function getAllMunicipalities(req, res) {
  try {
    const municipalities = await Municipality.findAll({ order: [['province'], ['name']] });
    res.json(municipalities);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los municipios' });
  }
}

async function getUserMunicipalities(req, res) {
  try {
    const userId = req.user.id;
    const userMunicipalities = await UserMunicipality.findAll({
      where: { userId },
      include: {
        model: Municipality,
        as: 'municipality'
      }
    });
    res.json(userMunicipalities);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener municipios del usuario' });
  }
}

async function addUserMunicipality(req, res) {
  try {
    const userId = req.user.id;
    const { municipalityName } = req.body;

    // Buscar el municipio por nombre
    const municipality = await Municipality.findOne({ where: { name: municipalityName } });
    console.log(municipality);
    if (!municipality) {
      return res.status(404).json({ message: 'Municipio no encontrado' });
    }

    const municipalityId = municipality.id;

    // Evitar duplicados (findOrCreate)
    const [record, created] = await UserMunicipality.findOrCreate({
      where: { userId, municipalityId }
    });

    if (!created) {
      return res.status(409).json({ message: 'Municipio ya marcado como visitado' });
    }

    res.status(201).json(record);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al añadir municipio visitado' });
  }
}

async function removeUserMunicipality(req, res) {
  try {
    const userId = req.user.id;
    const { municipalityId } = req.params;

    const deleted = await UserMunicipality.destroy({
      where: { userId, municipalityId }
    });

    if (!deleted) {
      return res.status(404).json({ message: 'No encontrado' });
    }

    res.json({ message: 'Municipio desmarcado' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar municipio visitado' });
  }
}

export default{
    getAllMunicipalities,
    getUserMunicipalities,
    addUserMunicipality,
    removeUserMunicipality
};