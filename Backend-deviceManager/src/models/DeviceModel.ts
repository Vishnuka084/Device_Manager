import * as mongoose from "mongoose";
import * as SchemaTypes from '../type/SchemaTypes'
import {Schema} from "mongoose";

let deviceSchema = 
    new mongoose.Schema<SchemaTypes.deviceInterface>({
    serialNo:{type:String, required: true},
    Type:{type:String, required: true},
    Image:{type:String, required: true},
    Status:{type:String, required: true},

})

let DeviceModel = mongoose.model('device',deviceSchema);

export default DeviceModel;


