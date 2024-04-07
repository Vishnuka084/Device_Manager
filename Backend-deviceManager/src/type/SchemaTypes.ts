import * as mongoose from "mongoose";

export interface   LocationInterface extends mongoose.Document{
    name: string,
    address: string,
    phone: string,
    device: string[]

}

export interface  deviceInterface extends mongoose.Document{
    serialNo: string,
    type: string,
    image: string,
    status: string,
    location: string

}

export interface  UserInterface extends mongoose.Document{
    name: string,
    password: string,
}
