import {Router} from "express";
import municipalityController from "../controllers/municipalityController.js";

const router = Router();

router.get("/", municipalityController.getAllMunicipalities);


export default router