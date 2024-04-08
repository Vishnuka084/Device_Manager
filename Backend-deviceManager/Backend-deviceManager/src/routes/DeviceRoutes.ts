import express from "express";
import * as DeviceController from "../controllers/DeviceController"
import * as VerifyToken from "../middlewares/verifyToken"
import {upload, uploadPic} from "../middlewares/imageUpLoader"

let router = express.Router();

router.post('/save',VerifyToken.verifyToken, uploadPic.single('file'), DeviceController.createDevice) //device /save
router.put('/update',VerifyToken.verifyToken, uploadPic.single('file'), DeviceController.updateDevice) //device /update
router.delete('/delete/:serialNo', VerifyToken.verifyToken, DeviceController.deleteDevice) //device/delete
router.get('/get/device', VerifyToken.verifyToken, DeviceController.viewDevice) //device /get/device?id=
router.get('/get/all', VerifyToken.verifyToken, DeviceController.viewAllDevice) // device/get/all
router.get('/get/all/location', VerifyToken.verifyToken, DeviceController.viewAllDevice_Location) // device/get/all/location?location=


export default router;