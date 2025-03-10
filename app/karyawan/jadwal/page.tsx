import { getServerCookie } from "@/helper/server-cookie"
import { ScheduleType, KeretaType } from "../types"
import Schedule from "./Schedule"
import axiosInstance from "@/helper/api"
import AddSchedule from "./addSchedule"

// get daata jadwal
const getJadwal = async () : Promise<ScheduleType[]> => {
    try {
        const url = `/schedule`
        const TOKEN = await getServerCookie(`token`)

        const response: any = await axiosInstance.get(url, {
            headers: {
                Authorization: `Bearer ${TOKEN}`
            }
        })
        if(response.data.success === true)
            return response.data.data
        return[]
    } catch (error) {
        console.log(error)
        return []
    }
}

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

const JadwalPage = async () => {
    const dataJadwal = await getJadwal()
    const dataKereta = await getKereta()
    return (
        <div className="w-full p-5 bg-white">
            <h1 className="text-xl font-semibold">
                Data jadwal
            </h1>
            <span className="text-sm text-slate-500">
                Halaman ini memuat jadwal kereta yang tersedia
            </span>

            <div className="my-3">
                <AddSchedule trains={dataKereta} />
            </div>

            <div className="my-3">
                {
                    dataJadwal.map((jadwal, index) => (
                        <Schedule key={`keyJadwal-${index}`}
                        item={jadwal}/>
                    ))
                }
            </div>
        </div>
    )
}

export default JadwalPage