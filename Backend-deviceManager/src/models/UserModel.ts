import * as mongoose from "mongoose";
import * as SchemaTypes from '../type/SchemaTypes'
import { Schema } from "mongoose";

let userSchema = 
    new mongoose.Schema<SchemaTypes.UserInterface>({
    name:{type:String, required: true},
    password:{type:String, required:true}
})


let UserModel1 = mongoose.model('user',userSchema);

export default UserModel1;