// function to get all data kereta\
import { getServerCookie } from "@/helper/server-cookie";
import { KeretaType } from "../types";
import axiosInstance from "@/helper/api";
import Train from "./Train";
import AddKereta from "./addKereta";

const getKereta = async (): Promise<KeretaType[]> => {
    try {
        /** get token from cookie */
        const TOKEN =
            await getServerCookie(`token`)
        const url = `/train`
        /** hit endpoint */
        const response: any = await axiosInstance.get(url, {headers: {authorization: `Bearer ${TOKEN}`}})
        if(response.data.success == true){
            return response.data.data
        }
        return []
    } catch (error) {
        console.log(error);
        return []
    }
}

const KeretaPage = async() => {
    /** call function to load data kereta from backend */
    const dataKereta = await getKereta()
    return (
        <div className="w-full p-5 bg-white">
            <h1 className="text-xl font-semibold">
                Data Kereta
            </h1>
            <span className="text-sm">
                Halaman ini memuat daftar kereta api yang tersedia
            </span>

            <div className="my-3">
                <AddKereta />
                {/* mapping data kereta */}
                {
                    dataKereta.map((kereta, index) => (
                        <Train
                            item={kereta}
                            key={`kereta-${index}`}
                        />
                    ))
                }
            </div>
        </div>
    )
}
export default KeretaPage