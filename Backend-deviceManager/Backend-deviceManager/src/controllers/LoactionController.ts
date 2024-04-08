import { CustomResponse } from "../dtos/CustomerResponse"
import LocationModel from "../models/LocationModels"
import { LocationInterface } from "../type/SchemaTypes"


export const createLocation = async(req: any,  res:any) =>{
//http://localhost:8082/location/save
    /**
    {
        "name":"Sagara",
        "address":"Galle",
        "phone":"0772056169",
        "device":[]
    }
        */
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
                new CustomResponse(200,"Location saved successfully.",success)
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
//http://localhost:8082/location/update
   /** {
        "_id":"6613a0b4805872da33d40435",
        "name":"Vishnuka",
        "address":"Galle",
        "phone":"0772056169",
        "device":[]
    }
       */
    try {
        let location_data = req.body;

        let location_by_id : LocationInterface | null = await LocationModel.findOne({_id:location_data._id});

        if (location_by_id){

            await LocationModel.findByIdAndUpdate(
                {_id:location_by_id._id},
                {
                    name:location_data.name,
                    address:location_data.address,
                    phone:location_data.phone,
                    device:location_data.device
                }
            )
                .then( success => {

                    res.status(200).send(
                        new CustomResponse(200,"Location successfully updated!")
                    )

                })
                .catch( error => {
                    res.status(500).send(
                        new CustomResponse(500,`Error : ${error}`)
                    )
                })

        }else {
            res.status(404).send(
                new CustomResponse(404,`Location not found!!!`)
            )
        }

    }catch (error){
        res.status(500).send(
            new CustomResponse(500,`Error : ${error}`)
        )
    }

}

export const deleteLocation = async(req: any,  res:any) =>{
//http://localhost:8082/location/delete/6613a0b4805872da33d40435
//http://localhost:8082/location/delete/<_id>
    try {

        let location_by_id : LocationInterface | null = await LocationModel.findOne({_id:req.params.locationId});

        if (location_by_id){

            await LocationModel.deleteOne({_id:req.params.locationId})
                .then( success => {

                    res.status(200).send(
                        new CustomResponse(200, "Location delete successfully")
                    );

                })
                .catch( error => {
                    res.status(500).send(
                        new CustomResponse(500, `Something went wrong : ${error}`)
                    );
                })

        }else {
            res.status(404).send(
                new CustomResponse(404,`Location not found!!!`)
            )
        }

    }catch (error){
        res.status(500).send(
            new CustomResponse(500,`Error : ${error}`)
        )
    }

}

export const viewLocation = async(req: any, res:any)=>{
    try {
//http://localhost:8082/location/get/location?location=Matara
        let query_string :any = req.query;
        let location = query_string.location;

        let location_by_address : LocationInterface | null =
            await LocationModel.findOne({address: location});

        if (location_by_address) {
            res.status(200).send(
                new CustomResponse(200,`Location found!`, location_by_address)
            )
        }else {
            res.status(404).send(
                new CustomResponse(404,`Note found!`)
            )
        }



    }catch (error){
        res.status(500).send(
            new CustomResponse(500,`Error : ${error}`)
        )
    }
}

export const viewAllLocation = async(req: any, res:any)=>{
    //http://localhost:8082/location/get/all
    try {
        let list: LocationInterface[] = await LocationModel.find({user:res.tokenData.user.location});

        res.status(200).send(
            new CustomResponse(
                200,
                "Notes found successfully.",
                list            )
        )

    }catch (error){
        res.status(500).send(
            new CustomResponse(500,`Error : ${error}`)
        )
    }

}