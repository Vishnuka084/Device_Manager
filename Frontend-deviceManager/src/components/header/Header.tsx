import { IoLogOut } from "react-icons/io5";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

interface Props {
    log:boolean
    loginFunction:Function
}

function Header(prop:Props) {

    let navigate = useNavigate();

    // const [isLogin, setIsLogin] = useState(false);
    const [isLogin, setIsLogin] = useState(prop.log);

    // useEffect(() => {
    //     // const token = Cookies.get('token');
    //     //
    //     // if (!token) {
    //     //    setIsLogin(false)
    //     // } else {
    //     //     setIsLogin(true)
    //     // }
    // }, []);

    useEffect(() => {
        setIsLogin(prop.log)
    }, [prop.log]);

    function logout() {


        Swal.fire({
            title: "Do you want to logout?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "rgba(0,0,0,0.86)",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, log out me!"
        }).then((result) => {
            if (result.isConfirmed) {

                Cookies.remove('token')
                Cookies.remove('user')

                setIsLogin(false)
                navigate('/login')
            }
        });



    }

    return(
        <header
            className={"h-[8vh] relative bg-[#F5F5F5] " +
                "px-5 py-1 flex flex-row items-center justify-between"}>

            <div className={"h-full"}>

                <img src={"src/assets/image/logo/Logo.jpeg"} className={"h-full"}  alt={"logo"}/>

            </div>

            <div>
                <div
                    className={`${isLogin ? "flex" : "hidden"} w-max p-2 h-full flex flex-row items-center justify-around" +
                        " bg-black text-white hover:cursor-pointer`} onClick={logout}>
                    <IoLogOut size={20}/>
                    <label className={"font-Zet text-sm hidden sm:hidden md:block lg:block xl:block "}>LogOut</label>
                </div>
            </div>

        </header>
    )
}

export default Header;