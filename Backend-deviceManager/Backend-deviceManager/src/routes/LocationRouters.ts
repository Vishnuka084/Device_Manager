import express from "express";
import * as LocationController from "../controllers/LoactionController"
import * as VerifyToken from "../middlewares/verifyToken"


let router = express.Router();

router.post('/save',VerifyToken.verifyToken, LocationController.createLocation) //location /save
router.put('/update',VerifyToken.verifyToken, LocationController.updateLocation) //location /update
router.delete('/delete/:locationId',VerifyToken.verifyToken, LocationController.deleteLocation) //location /delete
router.get('/get/location',VerifyToken.verifyToken, LocationController.viewLocation) //location /get/location?location=
router.get('/get/all', VerifyToken.verifyToken, LocationController.viewAllLocation) // note/get/all


export default router;