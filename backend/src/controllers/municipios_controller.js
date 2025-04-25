import { Municipality } from '../models/index.js';

export const getMunicipalitys = async (req, res) => {
  try {
    const Municipalitys = await Municipality.findAll({
      where: { userId: req.userId }
    });
    res.json(Municipalitys);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener Municipalitys' });
  }
};

export const addMunicipality = async (req, res) => {
  try {
    const { nombre } = req.body;
    const Municipality = await Municipality.create({
      nombre,
      userId: req.userId
    });
    res.status(201).json(Municipality);
  } catch (error) {
    res.status(500).json({ error: 'Error al añadir Municipality' });
  }
};

export const deleteMunicipality = async (req, res) => {
  try {
    const { id } = req.params;
    await Municipality.destroy({
      where: { id, userId: req.userId }
    });
    res.json({ message: 'Municipality eliminado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar Municipality' });
  }
};