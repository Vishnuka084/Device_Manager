
import {useEffect, useState} from "react";
import axios from "axios";
import Cookies from "js-cookie";


interface Data{
    _id:string,
    name: string,
    address: string,
    phone: number,
    device: string[]
}




function DashBoardView() {


    const [dataArray, setDataArray] = useState<Data[]>([]);
    //let navigate = useNavigate();

    useEffect(() => {
        getAllUsers()
        // @ts-ignore
        inputRef.current.value=pageNumber
    }, []);

    function getAllUsers(){
        const config = {
            headers: {
                'Authorization': Cookies.get('tk'),
                'Content-Type': 'application/json'
            }
        };

        axios.get(``,config)
            .then(response => {
                console.log(response.data)
                setDataArray(response.data.data)
            }).catch(error => {
            console.log(error)
        })
    }

    /*function handleDeleteUser(){
        // alert("Delete "+deleteId)

        const config = {
            headers: {
                'Authorization': Cookies.get('tk')
            }
        };

        axios.delete(``,config)
            .then(response => {
                alert(response.data.message)

            })
            .catch(error => {
                alert(error)
            })

    }*/

/*    function clickDeleteBtn(id:string){
        setDeleteId(id)
        setOpen(true)
    }*/

    return (
        <section className={"w-full min-h-[100%] bg-white flex flex-col items-center rounded-md"}>
            <table id={"userTable"}
                   className={"w-full font-Euclid text-[12px] rounded-md bg-gray-100 border-collapse " +
                       "overflow-auto min-w-[503px]"}>

                <thead className={"w-full bg-amber-200 rounded-t-md  min-h-5 sticky top-0 left-0"}>
                <tr className={""}>
                    <th className={"py-2 pl-2 text-left uppercase "}>name</th>
                    <th className={"py-2 text-left "}>address</th>
                    <th className={"py-2 text-left uppercase "}>phone</th>
                    <th className={"py-2 text-center uppercase "}>device</th>
                    <th className={"py-2 text-left uppercase"}>action</th>
                </tr>
                </thead>

                <tbody className={"mt-3 "}>


                {
                    dataArray.map(value => {

                        return <tr className={"bg-white"}>
                            <td className={`flex flex-row items-center border-b `}>
                                <label htmlFor="">xxxx</label>
                            </td>

                            <td className={"font-medium text-[13px] border-b text-left"}>
                                {value._id}
                            </td>
                            <td className={"font-medium text-[13px] border-b text-left max-w-[300px]"}>
                                {value.name}
                            </td>

                            <td className={"font-medium text-[13px] border-b"}>
                                <label>{value.address}</label>
                            </td>

                            <td className={"font-medium text-[13px] border-b"}>
                                <label>{value.phone}</label>
                            </td>

                            <td className={"font-medium text-[13px] border-b"}>
                                <label>{value.device}</label>
                            </td>

                            {/*<td className={"font-medium text-[13px] border-b text-center"}>
                                {
                                    brandList.map(brand => {
                                        if (brand.name == value.brand) {
                                            return <img
                                                src={`http://localhost:9000/images/${brand.image}`}
                                                title={brand.name}
                                                className={`w-[100px]`}
                                                alt={"brand_icon"}/>
                                        }
                                    })
                                }
                            </td>*/}
                            {/*<td className={" w-[10%] border-b text-center"}>
                                <button
                                    onClick={() => navigate('/admin/add-item', {state:{item:value, list:list}})}
                                    className={"p-1 border border-black rounded-[6px] group" +
                                        " hover:border-[#2355FF] mr-3"}>
                                    <CiEdit size={18} className={"group-hover:text-[#2355FF] "}/>
                                </button>

                                <button
                                    className={"p-1 border rounded-[6px] group border-red-600 hover:bg-[#F4EBEF]"}
                                    onClick={() => clickDeleteBtn(value._id)}
                                >

                                    <CiTrash size={18} className={"text-red-600"}/>
                                </button>
                            </td>*/}
                        </tr>

                    })
                }

                </tbody>

            </table>
        </section>

    )

}

export default DashBoardView;