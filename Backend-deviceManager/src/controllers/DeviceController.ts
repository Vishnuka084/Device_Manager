import { CustomResponse } from "../dtos/CustomerResponse";
import DeviceModel from "../models/DeviceModel";
import {deviceInterface, UserInterface} from "../type/SchemaTypes";


export const createDevice = async(req: any,  res:any) =>{
    try {

        let fileName:string = req.file.filename;
        let deviceModel = new DeviceModel({
            serialNo:req.body.serialNo,
            title:req.body.title,
            type:req.body.Type,
            image:fileName,
            status:req.body.Status,
            location:req.body.location
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
    try {

        let device_by_id : deviceInterface | null = await DeviceModel.findOne({_id:req.params.deviceId});

        if (device_by_id){

            await DeviceModel.deleteOne({_id:req.params.deviceId})
                .then( success => {

                    res.status(200).send(
                        new CustomResponse(200, "Device delete successfully")
                    );

                })
                .catch( error => {
                    res.status(500).send(
                        new CustomResponse(500, `Something went wrong : ${error}`)
                    );
                })

        }else {
            res.status(404).send(
                new CustomResponse(404,`Device not found!!!`)
            )
        }

    }catch (error){
        res.status(500).send(
            new CustomResponse(500,`Error : ${error}`)
        )
    }
}

export const viewDevice = async(req: any, res:any)=>{
    try {

        let query_string :any = req.query;
        let id:string = query_string._id;

        let device_by_id:deviceInterface | null = await 
            DeviceModel.findOne({serialNo: id})


        res.status(200).send(
            new CustomResponse(200,`device found!`, device_by_id)
        )

       
    }catch (error){
        res.status(500).send(
            new CustomResponse(500,`Error : ${error}`)
        )
    }
}

export const viewAllDevice = async(req: any, res:any)=>{
    try {

        let list: deviceInterface[] = await DeviceModel.find()

        res.status(200).send(
            new CustomResponse(
                200,
                "Device found succesfully.!",
                list
            )
        )

    }catch (error){
        res.status(500).send(
            new CustomResponse(500,`Error : ${error}`)
        )
    }

}