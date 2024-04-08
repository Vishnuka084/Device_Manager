import * as mongoose from "mongoose";
import * as SchemaTypes from '../type/SchemaTypes'
import { Schema } from "mongoose";


let locationSchema = 
    new mongoose.Schema<SchemaTypes.LocationInterface>({
    name:{type:String, required: true},
    address:{type:String, required:true},
    phone:{type:String, required: true},
    device:{type:[String], required:false},
})

let LocationModel = mongoose.model('location',locationSchema);

export default LocationModel;

