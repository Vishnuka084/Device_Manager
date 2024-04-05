import express from "express";
import { CustomResponse } from "../dtos/CustomerResponse";
import jwt, {Secret} from "jsonwebtoken";
import * as process from "process";

export const verifyToken = async (req: express.Request, res:any ,  next: express.NextFunction ) => {

    try{

    } catch (error){
        return res.status(401).json(
            new CustomResponse(401, "Inavalid Token")
        )
    }
    
}