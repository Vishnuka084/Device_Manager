import express from "express";
import * as UserController from "../controllers/UserController"
import * as VerifyToken from "../middlewares/verifyToken"

let router = express.Router();

router.post('/save', UserController.createUser)

router.post('/auth', UserController.saveUser)

export default router;
