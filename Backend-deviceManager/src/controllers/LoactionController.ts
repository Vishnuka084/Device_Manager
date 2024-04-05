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

    try {
        let location_data = req.body;

        let location_by_id : LocationInterface | null = await LocationModel.findOne({_id:location_data._id});

        if (location_by_id){

            await LocationModel.findByIdAndUpdate(
                {_id:location_data._id},
                {
                    user:location_data.user,
                    title:location_data.title,
                    description:location_data.description,
                    data:location_data.date
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

    try {

        let location_by_id : LocationInterface | null = await LocationModel.findOne({_id:req.params.noteId});

        if (location_by_id){

            await LocationModel.deleteOne({_id:req.params.noteId})
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

        let query_string :any = req.query;
        let location_title = query_string.title;

        let location_by_title : LocationInterface[] | null =
            await LocationModel.find({title: new RegExp(location_title,'i'),user:res.tokenData.user.email});

        res.status(200).send(
            new CustomResponse(200,`Note found!`, location_by_title)
        )

    }catch (error){
        res.status(500).send(
            new CustomResponse(500,`Error : ${error}`)
        )
    }
}

export const viewAllLocation = async(req: any, res:any)=>{
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