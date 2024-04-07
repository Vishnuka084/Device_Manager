import Input from "../components/input/input.tsx";
import {useState} from "react";
import * as Validator from "../util/validator.ts";
import Swal from "sweetalert2";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function SignUpView() {


    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [rePassword, setRePassword] = useState("")
    const [isShow, setIsShow] = useState(false)

    const [isValidName, setIsValidName] = useState(true)
    const [isValidEmail, setIsValidEmail] = useState(true)
    const [isValidPassword, setIsValidPassword] = useState(true)
    const [isMachedPassword, setIsMachedPassword] = useState(true)

    let navigate = useNavigate();

    const handleInput = (e:any, type:string):void => {

        switch (type){
            case 'name':
                setName(e.target.value)
                setIsValidName(Validator.fullNameValidator(e.target.value))
                break;
            case 'email':
                setEmail(e.target.value)
                setIsValidEmail(Validator.emailValidator(e.target.value))
                break;
            case "password":
                setPassword(e.target.value);
                setIsValidPassword(Validator.passwordValidator(e.target.value))
                break;
            case "rePassword":
                setRePassword(e.target.value)
                setIsMachedPassword(machedPassword(e.target.value))
                break;
        }
    }

    function machedPassword( rePassword: string) :boolean{
        return password === rePassword;
    }

    function checkValues() {

        let name_valid = Validator.fullNameValidator(name);
        let email_valid = Validator.emailValidator(email);
        let password_valid = Validator.passwordValidator(password);
        let mached_password = machedPassword(rePassword);

        setIsValidName(name_valid)
        setIsValidEmail(email_valid)
        setIsValidPassword(password_valid)
        setIsMachedPassword(mached_password)

        return name_valid && email_valid && password_valid && mached_password;
    }

    function userSave(){

        if (checkValues()){

            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "rgba(0,0,0,0.86)",
                cancelButtonColor: "#939393",
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
                'Content-Type': 'application/json'
            }
        };

        let data = JSON.stringify({
            name:name,
            email:email,
            password:password
        });


        axios.post('https://simple-note-app-back-end.onrender.com/user/save',data,config)
            .then(res => {
                Swal.fire({
                    title: "saved!",
                    text: res.data.message,
                    icon: "success"
                });
                navigate('/login')
            })
            .catch(err => {
                console.log(err)

                Swal.fire({
                    title: "Error!",
                    text: "Something went wrong!",
                    icon: "error"
                });
            })
    }

    return(
        <section className={"h-[92vh] max-h-max bg-[#F5F5F5] flex items-center justify-center"}>

            <div
                className={"min-h-[500px] max-h-max max-w-[400px] w-[92vw] sm:w-[92vw] md:w-[400px] bg-[#EFEFEF]" +
                    " border-2 border-black flex flex-col p-4"}>

                <div className={"mb-auto"}>

                    <div className={"font-sans text-4xl font-[700] text-center"}>
                        Create Account
                    </div>

                    <div className={"mt-5"}>

                        <div className={"mb-2"}>
                            <Input
                                type={"text"}
                                name={"name"}
                                label={"Name"}
                                optional={true}
                                callBack={handleInput}/>

                            <label className={`${!isValidName ? "block" : "hidden"} 
                                text-[10px] font-medium ml-1 text-[#F03947]`}>
                                Invalid name!
                            </label>
                        </div>

                        <div className={"mb-2"}>
                            <Input
                                type={"text"}
                                name={"email"}
                                label={"Email"}
                                optional={true}
                                callBack={handleInput}/>

                            <label
                                className={`${!isValidEmail ? "block" : "hidden"} 
                                    text-[10px] font-medium ml-1 text-[#F03947]`}>
                                Invalid Email Address!
                            </label>
                        </div>

                        <div className={"mb-2 mt-5"}>
                            <Input
                                type={`${isShow ? "text" : "password"}`}
                                name={"password"}
                                label={"Password"}
                                optional={true}
                                callBack={handleInput}/>

                            <label
                                className={`${!isValidPassword ? "block" : "hidden"} 
                                text-[10px] font-medium ml-1 text-[#F03947]`}>
                                Password not valid! , At least 8 characters long.
                                Contains a combination of uppercase letters, lowercase letters,
                                numbers, and special characters (such as !, @, #, $, %, etc.).
                            </label>
                        </div>

                        <div className={"mb-2"}>
                            <Input
                                type={`${isShow ? "text" : "password"}`}
                                name={"rePassword"}
                                label={"Conform Password"}
                                optional={true}
                                callBack={handleInput}/>

                            <label className={`${!isMachedPassword ? "block" : "hidden"} text-[10px] font-medium ml-1 text-[#F03947]`}>
                                Password not matched!
                            </label>
                        </div>

                        <div className={"flex flex-row items-center my-2 mt-3 group "}>

                            <input
                                type={"checkbox"}
                                className={"accent-black h-4 w-4 mx-1 group-hover:cursor-pointer"}
                                onClick={() => setIsShow(value => !value)}
                            />
                            <label className={"font-Poppins text-[13px] font-[500] group-hover:cursor-pointer"}>Show
                                Password</label>

                        </div>

                        <button
                            className={"w-full h-[40px] mt-2 bg-black text-white cursor-pointer"}
                            onClick={userSave}>
                            Signup
                        </button>


                    </div>

                </div>

            </div>

        </section>
    )

}

export default SignUpView