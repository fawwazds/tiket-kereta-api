import { getServerCookie } from "@/helper/server-cookie";
import { AdminType } from "../types";
import axiosInstance from "@/helper/api";
import Admin from "./Customer";
import AddAdmin from "./addCustomer";

const getAdmin = async (): Promise<AdminType[]> => {
    try {
        const TOKEN = await getServerCookie(`token`)
        const url = `/customer`
        const response: any = await axiosInstance.get(url, {
            headers: { authorization: `Bearer ${TOKEN}` }
        })
        if(response.data.success == true){
            return response.data.data
        }
        return []
    } catch (error) {
        console.log(error);
        return []
    }
}

const AdminPage = async() => {
    const dataAdmin = await getAdmin()
    return (
        <div className="w-full p-5 bg-white">
            <h1 className="text-xl font-semibold">
                Data Pelanggan
            </h1>
            <span className="text-sm">
                Halaman ini memuat daftar admin yang tersedia
            </span>

            <div className="my-3">
                <AddAdmin />
                {dataAdmin.map((admin, index) => (
                    <Admin
                        item={admin}
                        key={`admin-${index}`}
                    />
                ))}
            </div>
        </div>
    )
}

export default AdminPage
