import {Router} from "express";
import municipalityController from "../controllers/municipalityController.js";

const router = Router();

router.get("/", municipalityController.getAllMunicipalities);
router.get("/user", municipalityController.getUserMunicipalities);
router.post("/", municipalityController.addUserMunicipality);
router.get("/search", municipalityController.searchMunicipalities);
router.delete("/:municipalityId", municipalityController.removeUserMunicipality);


export default router