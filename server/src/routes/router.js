import { Router } from "express";
import { isLoggedInAPI } from "../middlewares/authMiddleware.js";
import authRouter from "./authRouter.js";
// import municipalityRouter from "./municipalityRouter.js";
// import groupRouter from "./groupRouter.js";

const router = Router();

router.get("/",(req,res)=>{
    res.send("mapa")
})

router.use("/", authRouter);
// router.use("/municipality", isLoggedInAPI, municipalityRouter);
// router.use("/group", isLoggedInAPI, groupRouter);

export default router