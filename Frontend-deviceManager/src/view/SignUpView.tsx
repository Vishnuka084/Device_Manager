import {useState} from "react";
import * as Validator from "../util/validator.ts";

import {useNavigate} from "react-router-dom";

function SignUpView(){

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




    const handleInput = (e:any, type:string):void =>{
        switch (type){
            case 'name':
                setName(e.target.value)
                setIsValidName(Validator.fullNameValidator(e.target.value))
                break;
            case 'email':
                setEmail(e.target.value)
                setIsValidEmail(Validator.emailValidator(e.target.value))
                break;
            case 'password':
                setPassword(e.target.value)
                setIsValidPassword(Validator.passwordValidator(e.target.value))
                break;
            case 'rePassword':
                setPassword(e.target.value)
                setIsMachedPassword(machedPassword(e.target.value))
        }

        function machedPassword( rePassword: string) :boolean{
            return password === rePassword;
        }

        function checkValues() {

            let name_valid = Validator.fullNameValidator(name);
            let email_valid= Validator.emailValidator(email);
            let password_valid= Validator.passwordValidator(password);
            let mached_password = machedPassword(rePassword);
        }

    }





}