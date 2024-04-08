import { CustomResponse } from "../dtos/CustomerResponse";
import DeviceModel from "../models/DeviceModel";
import {deviceInterface, UserInterface} from "../type/SchemaTypes";
import fs from "fs";

//view image
//http://localhost:8082/file-1712564392936-978921094.jpeg
//http://localhost:8082/<image_name>

export const createDevice = async(req: any,  res:any) =>{
//http://localhost:8082/device/save
    /**
     device:{
     "serialNo":"54362796456",
     "type":"POS",
     "status":"active",
     "location":"Matara"
     }
     file:image_file eka
     */

    if (req.fileError){
        res.status(401).send(
            new CustomResponse(401,"Image format not allow")
        )
    } else {
        try {

            let fileName:string = req.file.filename;
            let device_data = JSON.parse(req.body.device);

            let findOne: deviceInterface | null = await DeviceModel.findOne({serialNo:device_data.serialNo});

            console.log(findOne)

            if (findOne!=null) {
                fs.unlinkSync(req.file.path);
                res.status(500).send(
                    new CustomResponse(500,`serialNo all ready used!!`)
                )
            }else {

                let deviceModel = new DeviceModel({
                    serialNo:device_data.serialNo,
                    type:device_data.type,
                    image:fileName,
                    status:device_data.status,
                    location:device_data.location
                });

                await deviceModel.save()
                    .then( success => {
                        res.status(200).send(
                            new CustomResponse(200,"Note saved successfully.",success)
                        )
                    })
                    .catch( error => {
                        fs.unlinkSync(req.file.path);
                        res.status(500).send(
                            new CustomResponse(500,`Something went wrong! : ${error}`)
                        )
                    })

            }



        }catch (error){
            fs.unlinkSync(req.file.path);
            res.status(500).send(
                new CustomResponse(500,`Error : ${error}`)
            )
        }
    }

}

export const updateDevice = async(req: any, res:any)=>{
    try {
//http://localhost:8082/device/update
        /**
         device:{
         "serialNo":"54362796456",
         "type":"POS",
         "status":"active",
         "location":"Matara"
         }
         file:image_file eka
         */
        if (req.fileError){
            res.status(401).send(
                new CustomResponse(401,"Image format not allow")
            )
        } else {

            let fileName:string = req?.file?.filename;
            let device_data = JSON.parse(req.body.device);

            let device_by_id : deviceInterface | null = await DeviceModel.findOne({serialNo:device_data.serialNo});

            console.log(device_by_id)

            if (device_by_id){

                await DeviceModel.updateOne(
                    {serialNo:device_data.serialNo},
                    {
                        serialNo:device_data.serialNo,
                        type:device_data.type,
                        image:fileName ? fileName : device_by_id?.image,
                        status:device_data.status
                    }
                )
                    .then( success => {

                        if (fileName){
                            fs.unlinkSync(`src/media/${device_by_id?.image}`);
                        }

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

        }


    }catch (error){
        res.status(500).send(
            new CustomResponse(500,`Error : ${error}`)
        )
    }

}

export const deleteDevice = async(req: any,  res:any) =>{
    try {
//http://localhost:8082/device/delete/5468796456
//http://localhost:8082/device/delete/<serialNo>
        let device_by_id : deviceInterface | null = await DeviceModel.findOne({serialNo:req.params.serialNo});

        if (device_by_id){

            await DeviceModel.deleteOne({serialNo:req.params.serialNo})
                .then( success => {

                    //delete image
                    fs.unlinkSync(`src/media/${device_by_id?.image}`);

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
    //http://localhost:8082/device/get/device?serialNo=
    //http://localhost:8082/device/get/device?serialNo=54362796456
    try {

        let query_string :any = req.query;
        let serialNo:string = query_string.serialNo;

        let device_by_id:deviceInterface | null = await 
            DeviceModel.findOne({serialNo: serialNo})

        if(device_by_id){
            res.status(200).send(
                new CustomResponse(200,`device found!`, device_by_id)
            )
        }else {
            res.status(404).send(
                new CustomResponse(404,`device not found!`)
            )
        }



       
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


export const viewAllDevice_Location = async(req: any, res:any)=>{

    try{

        let query_string :any = req.query;
        let location:string = query_string.location;

        let list: deviceInterface[] | null = await DeviceModel.find({location:new RegExp(location,"i")});

        res.status(200).send(
            new CustomResponse(
                200,
                "Devices found successfully.",
                list
            )
        )


    }catch(error){
        res.status(500).send(
            new CustomResponse(500,`Error : ${error}`)
        )
    }
}