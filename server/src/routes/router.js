import { Router } from "express";
import { isLoggedInAPI } from "../middlewares/authMiddleware";
import authRouter from "./authRouter.js";
import municipalityRouter from "./municipalityRouter.js";
import groupRouter from "./groupRouter.js";
import groupMenberRouter from "./groupMenberRouter.js";

const router = Router();

router.get("/",(req,res)=>{
    res.send("mapa")
})

router.use("/", isLoggedInAPI, authRouter);
router.use("/municipality", isLoggedInAPI, municipalityRouter);
router.use("/group", isLoggedInAPI, groupRouter);
router.use("/groupMenber", isLoggedInAPI, groupMenberRouter);

export default router