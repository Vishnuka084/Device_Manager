import dotenv from 'dotenv'
dotenv.config()

import express from "express"
import bodyParser from "body-parser";
import cors from "cors"
import * as mongoose from "mongoose";
import * as process from "process";

import UserRoutes from "./routes/UserRoutes";
import DeviceRoutes from "./routes/DeviceRoutes";
import LocationRouters from "./routes/LocationRouters";


let app = express();

app.use(express.static('src/media'))

app.use(cors({
    origin: "*",
    methods:"*"
}))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//------------------------------------------
export let db:any;
mongoose.connect(process.env.MONGO_URL as string).then( r => {
    db=r;
    console.log("DB Connected Successfully")
}).catch( error => {
    console.log(`DB Connection Error : ${error}`)
});




app.use('/user', UserRoutes)
app.use('/device', DeviceRoutes)
app.use('/location', LocationRouters)



app.listen(8082, () => {
    console.log("Server start on port 8082")
})