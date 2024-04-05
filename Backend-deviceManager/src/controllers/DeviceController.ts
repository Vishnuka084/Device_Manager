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
    try {
        let device_data = req.body;

        let device_by_id : deviceInterface | null = await DeviceModel.findOne({_id:device_data._id});

        if (device_by_id){

            await DeviceModel.findByIdAndUpdate(
                {_id:device_data._id},
                {
                    serialNo:device_data.serialNo,
                    type:device_data.type,
                    image:device_data.image,
                    status:device_data.status
                }
            )
                .then( success => {

                    res.status(200).send(
                        new CustomResponse(200,"Device successfully updated!")
                    )

                })
                .catch( error => {
                    res.status(500).send(
                        new CustomResponse(500,`Error : ${error}`)
                    )
                })

        }else {
            res.status(404).send(
                new CustomResponse(404,`Note not found!!!`)
            )
        }


    }catch (error){
        res.status(500).send(
            new CustomResponse(500,`Error : ${error}`)
        )
    }

}
export const deleteDevice = async(req: any,  res:any) =>{

}

export const viewDevice = async(req: any, res:any)=>{
    
}

export const viewAllDevice = async(req: any, res:any)=>{
    
}