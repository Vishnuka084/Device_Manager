import Input from "../components/input/input.tsx";
import {useEffect, useState} from "react";
import axios from "axios";
import Cookies from "js-cookie";
import {CiCirclePlus, CiEdit, CiSearch, CiTrash} from "react-icons/ci";
import { CgMoveRight } from "react-icons/cg";
import {useNavigate} from "react-router-dom";
import Swal from "sweetalert2";

interface Data{
    _id:string,
    name: string,
    address: string,
    phone: number,
    device: string[]
}

function DashBoardView() {


    const [dataArray, setDataArray] = useState<Data[]>([]);
    const [search, setSearch] = useState("")

    let navigate = useNavigate();

    // let arr=[{_id:"156468874978",name:"Saman",location:"Matara",phone:"0745698562",device:["56487978","8798798798","8798935"]},{_id:"156468874978",name:"Saman",location:"Matara",phone:"0745698562",device:["56487978","8798798798","8798935"]},{_id:"156468874978",name:"Saman",location:"Matara",phone:"0745698562",device:["56487978","8798798798","8798935"]}]

    useEffect(() => {
        // setDataArray(arr)
        getData()
    }, []);

    const handleInput = (e:any, type:string):void => {

        switch (type){
            case 'search':
                setSearch(e.target.value)
                break;

        }
    }

    function getData(){
        const config = {
            headers: {
                'Authorization': Cookies.get('token')
            }
        };


        axios.get('http://localhost:8082/location/get/all',config)
            .then(res => {


                console.log(res.data.data)
                setDataArray(res.data.data)

            })
            .catch(err => {
                console.log(err)
            })
    }

    function clickDeleteBtn(id:string) {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "rgba(0,0,0,0.86)",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                deleteAction(id)

            }
        });
    }

    function deleteAction(id:string){

        const config = {
            headers: {
                'Authorization': Cookies.get('token')
            }
        };

        axios.delete(`http://localhost:8082/location/delete/${id}`,config)
            .then(res => {
                Swal.fire({
                    title: "Deleted!",
                    text: res.data.message,
                    icon: "success"
                });
                getData();
            })
            .catch(err => {
                console.log(err)
                alert(`Something is wrong \n${err?.response?.data?.message}`)
            })

    }

    return (
        <section className={"h-[92vh] flex items-center justify-center"}>

            <main className={"min-h-full w-[70%]"}>

                <div className={"w-full h-max flex items-center justify-center"}>
                    <div
                        className={"bg-white w-[80%] mt-5 sm:w-[80%] md:w-[80%] lg:w-[30rem] h-[50px] drop-shadow-xl " +
                            "rounded-md flex flex-row items-center justify-center"}>
                        <Input
                            type={"text"}
                            name={"search"}
                            label={""}
                            optional={true}
                            callBack={handleInput}
                            placeholder={"Search Location...."
                            }/>

                        <div className={"flex-1 flex items-center justify-center m-2"}>
                            <CiSearch string={40}/>
                        </div>
                    </div>
                </div>

                <div className={"w-full h-max "}>
                    <button
                        onClick={() => navigate('/addLocation')}
                        className={"px-3 py-2 bg-[#4455EF] hover:bg-[#2355FF] text-white font-Euclid" +
                            " flex flex-row items-center cursor-pointer rounded-md ml-auto"}>
                        <CiCirclePlus size={20} className={"mr-2"}/>

                        <span>Add Location</span>
                    </button>
                </div>

                <div className={"mt-5 w-full h-max bg-red-100 border-x border-gray-200 rounded-[5px]"}>


                    <table id={"userTable"}

                           className={"w-full font-Euclid text-[12px] rounded-md bg-gray-100 border-collapse " +
                               "overflow-auto min-w-[503px]"}>

                        <thead className={"w-full bg-amber-200 rounded-t-md  min-h-5 sticky top-0 left-0"}>
                        <tr className={""}>
                            <th className={"py-2 pl-2 text-left"}>LOCATION</th>
                            <th className={"py-2 text-left"}>MANAGER</th>
                            <th className={"py-2 text-left"}>CONTACT</th>
                            <th className={"py-2 text-left"}>DEVICES</th>
                            <th className={"py-2 text-left"}>ACTION</th>
                        </tr>
                        </thead>

                        <tbody className={"mt-3"}>

                        {

                            dataArray.map(value => {

                                return <tr key={value._id}
                                           className={"bg-white"}>
                                    <td className={"border-b"}>
                                        {/*<div>*/}
                                        {/*    <img*/}
                                        {/*        src={"http://localhost:9000/images/" + value.proPic}*/}
                                        {/*        className={"w-11 h-11 object-fill bg-center bg-cover rounded-[100%] mr-3"}*/}
                                        {/*        alt={"user"}*/}
                                        {/*        title={"profile photo"}*/}
                                        {/*    />*/}
                                        {/*</div>*/}
                                        <label className={"font-medium text-[13px]"}>{value.address}</label>
                                    </td>

                                    <td className={"font-medium text-[13px] border-b"}>
                                        {/*<label className={"text-white bg-[#11F033] py-1 px-2 rounded-md"}>Admin</label>*/}
                                        {/*<label*/}
                                        {/*    className={`text-white */}
                                        {/*        ${(value.role === 'admin' || value.role === 'Admin') ?*/}
                                        {/*        "bg-[#11F033]" : "bg-[#DCAE3C]"}*/}
                                        {/*        py-1 px-2 rounded-md`}>*/}
                                        {/*    {value.role}*/}
                                        {/*</label>*/}
                                        <label>{value.name}</label>
                                    </td>

                                    <td className={"font-medium text-[13px] border-b"}>
                                        <label>{value.phone}</label>
                                    </td>

                                    <td className={"font-medium text-[13px] border-b p-1"}>
                                        <ul>
                                            {
                                                value.device.length<=0 ? <li>No Device</li> :
                                                value.device.map(result => {
                                                    return <li
                                                        className={"text-[#7600bc] w-max bg-purple-400/30 py-1 px-4 rounded-full mb-1"}>
                                                        {result}
                                                    </li>
                                                })
                                            }
                                        </ul>

                                    </td>

                                    <td className={" w-[15%] border-b"}>
                                        <button
                                            onClick={() => navigate('/addDevice', {state: {location: value}})}
                                            className={"p-1 border border-black rounded-[6px] group" +
                                                " hover:border-[#39BEC2] mr-3"}>
                                            <CgMoveRight size={18} className={"group-hover:text-[#39BEC2] "}/>
                                        </button>

                                        <button
                                            onClick={() => navigate('/addLocation', {state: {location: value}})}
                                            className={"p-1 border border-black rounded-[6px] group" +
                                                " hover:border-[#2355FF] mr-3"}>
                                            <CiEdit size={18} className={"group-hover:text-[#2355FF] "}/>
                                        </button>

                                        <button
                                            className={"p-1 border rounded-[6px] group border-red-600 hover:bg-[#F4EBEF]"}
                                            onClick={() => clickDeleteBtn(value._id)}>
                                            {/*<CiTrash size={18} className={"group-hover:text-red-600"}/>*/}
                                            <CiTrash size={18} className={"text-red-600"}/>
                                        </button>
                                    </td>
                                </tr>
                            })

                        }


                        </tbody>
                    </table>

                </div>


            </main>

        </section>

    )

}

export default DashBoardView;