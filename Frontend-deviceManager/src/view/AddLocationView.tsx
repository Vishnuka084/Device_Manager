import axios from "axios";
import Cookies from "js-cookie";
import Input from "../components/input/input.tsx";
import * as Validator from "../util/validator.ts"
import {useState} from "react";
import {IoMdAdd, IoMdClose} from "react-icons/io";
import Swal from 'sweetalert2'
import {useLocation, useNavigate} from "react-router-dom";

function AddLocationView() {

    const location_state = useLocation();
    const value =location_state?.state?.location;

    const [location, setLocation] = useState(value ? value.address:"")
    const [name, setName] = useState(value ? value.name:"")
    const [phone, setPhone] = useState(value ? value.phone:"")

    const [locationValied, setLocationValied] = useState(true)
    const [nameValied, setNameValied] = useState(true)
    const [phoneValied, setPhoneValied] = useState(true)

    let navigate = useNavigate();

    const handleInput = (e:any, type:string):void => {
        switch (type){
            case "location":
                setLocation(e.target.value)
                setLocationValied(Validator.locationValidator(e.target.value))
                break;
            case "name":
                setName(e.target.value)
                setNameValied(Validator.fullNameValidator(e.target.value))
                break;
            case "phone":
                setPhone(e.target.value)
                setPhoneValied(Validator.contactValidator(e.target.value))
                break;
        }
    }

    function checkValues() {

        const name_valid = Validator.fullNameValidator(name);
        const location_valid = Validator.locationValidator(location);
        const phone_valid = Validator.contactValidator(phone);

        setNameValied(name_valid)
        setLocationValied(location_valid)
        setPhoneValied(phone_valid)

        return name_valid && location_valid && phone_valid;
    }

    function saveLocation(){

        if (checkValues()){
            
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#007519",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, save it!"
            }).then((result) => {
                if (result.isConfirmed) {

                    saveAction()

                }
            });   
        }

    }

    function saveAction() {

        const config = {
            headers: {
                'Authorization': Cookies.get('token'),
                'Content-Type': 'application/json'
            }
        };

        if (value){
            const data = JSON.stringify({
                _id:value._id,
                name:name,
                address:location,
                phone:phone,
                device:value.device
            });

            axios.put("http://localhost:8082/location/update",data,config)
                .then(res => {
                    Swal.fire({
                        title: "saved!",
                        text: res.data.message,
                        icon: "success"
                    });
                    navigate('/')
                })
                .catch(err => {
                    console.log(err)
                    alert(`Something is wrong \n${err?.response?.data?.message}`)
                })

        }else {

            const data = JSON.stringify({
                name:name,
                address:location,
                phone:phone,
                device:[]
            });

            axios.post("http://localhost:8082/location/save",data,config)
                .then(res => {
                    Swal.fire({
                        title: "saved!",
                        text: res.data.message,
                        icon: "success"
                    });
                    navigate('/')
                })
                .catch(err => {
                    console.log(err)
                    alert("Something is wrong")
                })
        }







    }

    return(
        <section className={"h-[92vh] flex items-center justify-center"}>

            <main className={"min-h-full w-[70%] pt-5 px-2"}>

                <div className={"w-full h-max"}>
                    <h1 className={"font-Poppins font-2xl text-4xl text-center"}>{value ? "Update Location":"Add Location"}</h1>
                </div>

                <main className={"w-full h-max pt-5 flex items-center justify-center flex-col gap-5"}>
                    <div className={"w-[70%]"}>
                        <Input
                            type={"text"}
                            name={"location"}
                            label={"Location"}
                            optional={false}
                            callBack={handleInput}
                            placeholder={"Eg:- Galle"}
                            value={location}/>

                        <label className={`${!locationValied ? "block" : "hidden"} 
                                text-[10px] font-medium ml-1 text-[#F03947]`}>
                            Invalid Input!
                        </label>
                    </div>

                    <div className={"w-[70%]"}>
                        <Input
                            type={"text"}
                            name={"name"}
                            label={"Manager Name"}
                            optional={false}
                            value={name}
                            callBack={handleInput}
                            placeholder={"Eg:- Saman"}/>

                        <label className={`${!nameValied? "block" : "hidden"} 
                                text-[10px] font-medium ml-1 text-[#F03947]`}>
                            Invalid name!
                        </label>
                    </div>

                    <div className={"w-[70%]"}>
                        <Input
                            type={"text"}
                            name={"phone"}
                            label={"Phone Number"}
                            optional={false}
                            value={phone}
                            callBack={handleInput}
                            placeholder={"Eg:- 0702065982"}/>

                        <label className={`${!phoneValied? "block" : "hidden"} 
                                text-[10px] font-medium ml-1 text-[#F03947]`}>
                            Invalid phone number!
                        </label>
                    </div>

                    {/*<div className={"w-[70%] h-max"}>*/}
                    {/*    <label className={"block text-black text-[15px] font-[500] mb-0.5 ml-1"}>Device's</label>*/}


                    {/*    <button*/}
                    {/*        className={"flex items-center justify-center gap-1 text-[#3CC4AE] text-sm font-Poppins font-[500] px-2 py-1 hover:bg-[#C6EEE8] rounded-[20%]"}>*/}
                    {/*        <IoMdAdd size={15}/> Add*/}
                    {/*    </button>*/}
                    {/*</div>*/}
                    <div className={"w-[70%] h-max"}>

                        <div className={"flex items-center justify-center gap-5"}>
                            <button
                                onClick={saveLocation}
                                className={"flex items-center justify-center gap-1 text-[#3CC4AE] text-sm font-Poppins font-[500] px-2 py-1 hover:bg-[#C6EEE8] rounded-[20%]"}>
                                <IoMdAdd size={15}/> Save
                            </button>

                            <button
                                onClick={() => navigate("/")}
                                className={"flex items-center justify-center gap-1 text-red-600 text-sm font-Poppins font-[500] px-2 py-1 hover:bg-red-300/20 rounded-[20%]"}>
                                <IoMdClose string={15}/> Close
                            </button>
                        </div>

                    </div>
                </main>

            </main>

        </section>
    )

}

export default AddLocationView