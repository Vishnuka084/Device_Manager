import {useState} from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";

interface Props {
    isLogin:Function
}

function LoginView(prop:Props){


    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [isShow, setIsShow] = useState(false)

    const navigate = useNavigate();


    const handleInput = (e:any, type:string):void =>{

        switch(type){
            case 'email':
                setEmail(e.target.value)
                break;
            case 'password':
                setPassword(e.target.value)
                break;    
        }
    }

    function loginAction(){
        
    }


    return(
        <section className={"h-[92vh] bg-[#F5F5F5] flex items-center justify-center"}>

            <div className={"h-[400px] max-w-[400px] w-[92vw] sm:w-[92vw] md:w-[400px] bg-[#EFEFEF] border-2 border-black flex flex-col p-4"}>

                <div className={"mb-auto"}>

                    <div className={"font-sans text-4xl font-[700] text-center"}>
                        WELCOME
                    </div>

                    <div className={"font-sans text-md font-[700] text-center"}>
                        to
                    </div>

                    <div className={"font-Zet text-3xl font-[700] text-center"}>
                        Device Manager 
                    </div>

                </div>

                <div className={"mb-5"}>

                    <div className={"mb-2"}>
                        <Input
                            type={"text"}
                            name={"email"}
                            label={"Email"}
                            optional={true}
                            callBack={handleInput}/>
                    </div>

                    <div className={"mb-4"}>
                        <Input
                            type={`${isShow ? "text" : "password"}`}
                            name={"password"}
                            label={"Password"}
                            optional={true}
                            callBack={handleInput}/>
                    </div>

                    <div className={"flex flex-row items-center my-2 group "}>

                        <input
                            type={"checkbox"}
                            className={"accent-black h-4 w-4 mx-1 group-hover:cursor-pointer"}
                            onClick={() => setIsShow(value => !value)}
                        />
                        <label className={"font-Poppins text-[13px] font-[500] group-hover:cursor-pointer"}>Show
                            Password</label>

                    </div>

                    <div className={"w-full"}>
                        <button
                            className={"w-full h-[40px] mt-2 bg-black text-white cursor-pointer"}
                            onClick={loginAction}>
                            Login
                        </button>

                        <div className={'text-gray-400 my-1 text-center'}>or</div>
                        <div className={'text-gray-400 text-[14px] text-center'}>Do not have an account ?
                            <span className={'text-black underline pl-1 hover:cursor-pointer'}>
                                {/*Sign ip here*/}
                                <Link to={'/signup'}> Sign ip here</Link>
                            </span>
                        </div>

                    </div>

                </div>

            </div>

        </section>
    )

}



export default LoginView