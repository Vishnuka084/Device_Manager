import { CustomResponse } from "../dtos/CustomerResponse"
import LocationModel from "../models/LocationModels"
import { LocationInterface } from "../type/SchemaTypes"


export const createLocation = async(req: any,  res:any) =>{

    try{

        let locationModel = new LocationModel({
            name:req.body.name,
            address:req.body.address,
            phone:req.body.phone,
            device:req.body.device
        });

        await locationModel.save()
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



    }catch(error){
        res.status(500).send(
            new CustomResponse(500,`Error : ${error}`)
        )
    }
}

export const updateLocation = async(req: any, res:any)=>{

}
export const deleteLocation = async(req: any,  res:any) =>{

}

export const viewLocation = async(req: any, res:any)=>{
    
}

export const viewAllLocation = async(req: any, res:any)=>{
    
}