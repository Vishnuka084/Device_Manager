import * as mongoose from "mongoose";
import * as SchemaTypes from '../type/SchemaTypes'
import {Schema} from "mongoose";

let deviceSchema = 
    new mongoose.Schema<SchemaTypes.deviceInterface>({
    serialNo:{type:String, required: true},
    type:{type:String, required: true},
    image:{type:String, required: true},
    status:{type:String, required: true},
    location:{type:String, required: true}

})

let DeviceModel = mongoose.model('device',deviceSchema);

export default DeviceModel;


