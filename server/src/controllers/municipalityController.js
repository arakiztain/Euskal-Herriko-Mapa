import { Op } from 'sequelize';
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
        as: 'municipality',
        attributes: ['id', 'name', 'province']
      }
    });

    const result = userMunicipalities.map(item => ({
      name: item.municipality.name,
      province: item.municipality.province
    }));


    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener municipios del usuario' });
  }
}

async function addUserMunicipality(req, res) {
  try {
    const userId = req.user.id;
    const { municipalityName } = req.body;
 
    const municipality = await Municipality.findOne({ where: { name: municipalityName } });
    
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

const searchMunicipalities = async (req, res) => {
  const { name } = req.query;
  try {
    const municipalities = await Municipality.findAll({
      where: {
        name: {
          [Op.like]: `%${name}%`,  // Uso LIKE en vez de ILIKE
        },
      },
      order: [['province', 'ASC'], ['name', 'ASC']],
    });
    res.json(municipalities);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

async function removeUserMunicipality(req, res) {
  try {
    const userId = req.user.id;
    const { municipalityName } = req.params;
    console.log(municipalityName);
    const municipality = await Municipality.findOne({
      where: { name: municipalityName }
    });
    console.log(municipality);
    if (!municipality) {
      return res.status(404).json({ message: 'Municipio no encontrado' });
    }

    const deleted = await UserMunicipality.destroy({
      where: {
        userId,
        municipalityId: municipality.id
      }
    });

    if (!deleted) {
      return res.status(404).json({ message: 'No encontrado en UserMunicipality' });
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
    searchMunicipalities,
    removeUserMunicipality
};