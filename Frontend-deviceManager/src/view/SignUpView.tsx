import {useState} from "react";

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

        }
    }





}