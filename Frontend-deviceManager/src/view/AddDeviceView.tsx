import {useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import Cookies from "js-cookie";
import axios from "axios";

interface Data {
    serialNo:string,
    type:string,
    image:string,
    status:string,
    location:string
}

function AddDeviceView() {

    const location_state = useLocation();
    const value =location_state?.state?.location;

    const [dataArray, setDataArray] = useState<Data[]>([]);

    useEffect(() => {
        getData()
    }, []);

    function getData(){
        const config = {
            headers: {
                'Authorization': Cookies.get('token')
            }
        };


        axios.get(`http://localhost:8082/device/get/all/location?location=${value.action}`,config)
            .then(res => {
                
                console.log(res.data.data)
                setDataArray(res.data.data)

            })
            .catch(err => {
                console.log(err)
            })
    }

    return(
        <section className={"h-[92vh] flex items-center justify-center"}>

            <main className={"min-h-full w-[60%] pt-5 px-2"}>
                <div className={"w-full h-max"}>

                    <ul className={"w-full h-max flex items-center justify-center gap-5 flex-col"}>

                        <li className={"w-[70%] bg-indigo-400 p-2 flex flex-row gap-1"}>
                            <div className={"h-[100px] mr-2"}>
                                {/*<img src={`http://localhost:8082/images/${props.brandPic}`}*/}
                                <img src={`http://localhost:8082/file-1712566695955-760998927.jpg`}
                                    // width={220} height={168}
                                     title={"product"} alt={"photo"}
                                     className={" transition-all rounded-xl h-full w-[100px]"}
                                />
                            </div>

                            <div className={"flex-1 h-[100px] bg-white"}>

                            </div>

                            <div className={"h-[100px] w-[70px] bg-red-300"}>

                            </div>
                        </li>


                    </ul>

                </div>

            </main>

        </section>
    )

}

export default AddDeviceView;