import { CustomResponse } from "../dtos/CustomerResponse";
import DeviceModel from "../models/DeviceModel";
import {deviceInterface, UserInterface} from "../type/SchemaTypes";


export const createDevice = async(req: any,  res:any) =>{
    try {

        let deviceModel = new DeviceModel({
            serialNo:req.body.serialNo,
            title:req.body.title,
            type:req.body.Type,
            image:req.body.Image,
            status:req.body.Status
        });

        await deviceModel.save()
            .then( success => {
            res.status(200).send(
                new CustomResponse(200,"Note saved successfully.",success)
            )
        })
            .catch( error => {
                res.status(500).send(
                    new CustomResponse(500,`Something went wrong! : ${error}`)
                )
            })

    }catch (error){
        res.status(500).send(
            new CustomResponse(500,`Error : ${error}`)
        )
    }
}

export const updateDevice = async(req: any, res:any)=>{

}
export const deleteDevice = async(req: any,  res:any) =>{

}

export const viewDevice = async(req: any, res:any)=>{
    
}

export const viewAllDevice = async(req: any, res:any)=>{
    
}