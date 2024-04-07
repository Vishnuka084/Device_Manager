import Input from "../components/input/input.tsx";
import {useState} from "react";
import Swal from "sweetalert2";
import axios from "axios";
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


}