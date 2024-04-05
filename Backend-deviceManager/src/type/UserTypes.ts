import * as mongoose from "mongoose";

export interface   UserInterface extends mongoose.Document{
    name: string,
    password: string,
}
