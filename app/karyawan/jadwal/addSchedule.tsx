"use client"

import Modal from "@/components/Modal"
import axiosInstance from "@/helper/api"
import { getCookie } from "@/helper/client-cookie"
import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"
import DatePicker from "react-datepicker"
import { toast, ToastContainer } from "react-toastify"
import { KeretaType } from "../types"

type Props = {
    trains: KeretaType[]
    /* menyimpan array semua data kereta */
}

const AddSchedule = (myProp: Props) => {
    const router = useRouter()
    const [show, setShow] = useState<boolean>(false)

    const [departured_location, setDeparturedLocation] = useState<string>("")
    const [arrived_location, setArrivedLocation] = useState<string>("")
    const [departured_time, setDeparturedTime] = useState<Date>(new Date())
    const [arrived_time, setArrivedTime] = useState<Date>(new Date())
    const [train_id, setTrainId] = useState<number>(0)
    const [price, setPrice] = useState<number>(0)



    const openModal = () => {
        setShow(true)
        setDeparturedLocation("")
        setDeparturedTime(new Date())
        setArrivedLocation("")
        setArrivedTime(new Date())
        setTrainId(0)
        setPrice(0)
    }

    const closeModal = () => {
        setShow(false)
    }

    const handleSubmit = async (e: FormEvent) => {
        try {
            e.preventDefault()
            const url = `/schedule`
            const requestData = {
                departured_location,
                arrived_location,
                departured_time,
                arrived_time,
                train_id,
                price
            }

            const TOKEN = getCookie(`token`)
            const response: any = await axiosInstance.post(url, requestData, {
                headers: {
                    Authorization: `Bearer ${TOKEN}`
                }
            })

            const message = response.data.message
            if (response.data.succes === true) {
                setShow(false)
                toast(message, { containerId: `toastAddJadwal`, type: `success` })
                router.refresh()
            } else {
                toast(message, { containerId: `toastAddJadwal`, type: `warning` })
            }
        } catch (error) {
            console.log(error)          
            toast(`Something went wrong`, { containerId: `toastAddJadwal`, type: `error` })
        }
    }

    return (
        <div>
            <ToastContainer containerId={`toastAddJadwal`} />
            <button className="px-4 py-2 rounded-md text-white bg-green-600 hover:bg-green-500" type="button" onClick={openModal}>
                Tambah Jadwal Kereta
            </button>
            <Modal isShow={show}>
                <form onSubmit={handleSubmit}>
                    {/*  modal header */}
                    <div className="w-full p-3 rounded-t-lg">
                        <h1 className="font-semibold text-lg">
                            Tambah Data Kereta
                        </h1>
                        <span className="text-sm text-slate-500">
                            Pastikan data yang diisi sudah benar
                        </span>
                    </div>

                    {/*  modal body */}
                    <div className="w-full p-3">
                        <div className="my-2 border rounded-md p-2">
                            <small className="text-xs font-semibold text-sky-500">
                                Berangkat dari
                            </small>
                            <input type="text" id={`departured_location`} value={departured_location} onChange={e => setDeparturedLocation(e.target.value)}
                                className="w-full p-1 outline-none focus:border-b-sky-600 focus:border-b"
                                required={true}
                            />
                        </div>

                        <div className="my-2 border rounded-md p-2">
                            <small className="text-xs font-semibold text-sky-500">
                                Waktu keberangkatan
                            </small> <br/>
                        <DatePicker 
                            showTimeSelect={true} 
                            id={`departured_time`} 
                            selected={departured_time}  
                            className="w-full p-1 outline-none focus:border-b-sky-600 focus:border-b"
                            dateFormat="dd MMMM yyyy HH:mm"
                            timeFormat="HH:mm"
                            timeIntervals={15}
                            timeCaption="Waktu"
                            onChange={(date: Date | null) => date && setDeparturedTime(date)}
                        />
                        </div>

                        <div className="my-2 border rounded-md p-2">
                            <small className="text-xs font-semibold text-sky-500">
                                Tiba di
                            </small>
                            <input type="text" id={`arrived_location`} value={arrived_location} onChange={e => setArrivedLocation(e.target.value)}
                                className="w-full p-1 outline-none focus:border-b-sky-600 focus:border-b"
                                required={true}
                            />
                        </div>

                        <div className="my-2 border rounded-md p-2">
                            <small className="text-xs font-semibold text-sky-500">
                                Waktu kedatangan
                            </small>
                            <DatePicker 
                                showTimeSelect={true}
                                id={`arrived_time`} 
                                selected={arrived_time}  
                                className="w-full p-1 outline-none focus:border-b-sky-600 focus:border-b"
                                dateFormat="dd MMMM yyyy HH:mm"
                                timeFormat="HH:mm"
                                timeIntervals={15}
                                timeCaption="Waktu"
                                onChange={(date: Date | null) => date && setArrivedTime(date)}
                            />
                        </div>

                        <div className="my-2 border rounded-md">
                            <small className="text-xs font-semibold text-sky-500">
                                Harga
                            </small>
                            <input type="text" id={`price`} value={price} onChange={e => setPrice(Number(e.target.value))}
                                className="w-full p-1 outline-none focus:border-b-sky-600 focus:border-b"
                                required={true}
                            />
                        </div>

                        <div className="my-2 border rounded-md">
                            <small className="text-xs font-semibold text-sky-500">
                                Jenis kereta
                            </small>
                            <select id={`train_id`} value={train_id.toString()} onChange={e => setTrainId(Number(e.target.value))}
                            className="w-full p-1 outline-none hover:border-b-sky-600 border"
                            required={true}>
                                <option value="">
                                    Pilih Jenis kereta
                                </option>
                                {myProp.trains.map((kereta, index) => (
                                    <option key={`optionKereta-${index}`} value={kereta.id}>
                                        {kereta.name}
                                    </option>
                                ))}

                            </select>
                        </div>

                    </div>

                    {/*  modal footer */}
                    <div className="w-full p-3 rounded-b-lg flex items-center justify-end gap-2">
                        <button type="button"
                            className="px-4 py-2 rounded-md bg-slate-700 hover:bg-slate-600 text-white"
                            onClick={() => closeModal()}>
                            Close
                        </button>
                        <button type="submit"
                            className="px-4 py-2 rounded-md bg-sky-700 hover:bg-sky-600 text-white">
                            Save
                        </button>
                    </div>
                </form>
            </Modal>

        </div>
    )
}
export default AddSchedule