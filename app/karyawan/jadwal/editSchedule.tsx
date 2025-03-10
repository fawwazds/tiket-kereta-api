"use client"

import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"
import Modal from "@/components/Modal"
import { toast, ToastContainer } from "react-toastify"
import { getCookie } from "@/helper/client-cookie"
import axiosInstance from "@/helper/api"
import { ScheduleType } from "../types"

type props = {
    schedule: ScheduleType
}

const EditSchedule = (myProp: props) => {
    const [departured_location, setDeparturedLocation] = useState<string>("")
    const [departured_time, setDeparturedTime] = useState<string>("")
    const [arrived_location, setArrivedLocation] = useState<string>("")
    const [arrived_time, setArrivedTime] = useState<string>("")
    const [price, setPrice] = useState<number>(0)
    const [show, setShow] = useState<boolean>(false)
    const router = useRouter()

    const openModal = () => {
        setShow(true)
        setDeparturedLocation(myProp.schedule.departured_location)
        const dTime = new Date(myProp.schedule.departured_time)
        const aTime = new Date(myProp.schedule.arrived_time)
        setDeparturedTime(dTime.toISOString().slice(0, 16))
        setArrivedTime(aTime.toISOString().slice(0, 16))
        setArrivedLocation(myProp.schedule.arrived_location)
        setPrice(myProp.schedule.price)
    }

    const closeModal = () => {
        setShow(false)
    }

    const handleSubmit = async (e: FormEvent) => {
        try {
            e.preventDefault()
            const TOKEN = getCookie(`token`)
            const url = `/schedule/${myProp.schedule.id}`
            const requestData = {
                departured_location,
                departured_time,
                arrived_location,
                arrived_time,
                price
            }
            const response: any = await axiosInstance.put(url, requestData, {
                headers: {
                    authorization: `Bearer ${TOKEN}`
                }
            })

            const message = response.data.message
            if (response.data.success == true) {
                toast(message,
                    {
                        containerId: `toastEdit-${myProp.schedule.id}`,
                        type: "success"
                    }
                )
                setShow(false)
                setTimeout(() => router.refresh(), 1000)
            } else {
                toast(message,
                    {
                        containerId: `toastEdit-${myProp.schedule.id}`,
                        type: "warning"
                    }
                )
            }
        } catch (error) {
            console.log(error);
            toast(
                `Terjadi kesalahan`,
                {
                    containerId: `toastEdit-${myProp.schedule.id}`,
                    type: "error"
                }
            )
        }
    }

    return (
        <div>
            <ToastContainer containerId={`toastEdit-${myProp.schedule.id}`} />
            <button type="button"
                onClick={() => openModal()}
                className="px-2 py-1 rounded-md bg-sky-600 hover:bg-sky-500 text-white flex flex-wrap">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                </svg>
            </button>
            <Modal isShow={show}>
                <form onSubmit={e => handleSubmit(e)}>
                    <div className="w-full p-3 rounded-t-lg">
                        <h1 className="font-semibold text-lg">
                            Edit Data Jadwal
                        </h1>
                        <span className="text-sm text-slate-500">
                            Pastikan data yang diisi sudah benar
                        </span>
                    </div>

                    <div className="w-full p-3">
                        <div className="my-2 border rounded-md p-1">
                            <small className="text-sm font-semibold text-sky-600">
                                Lokasi Keberangkatan
                            </small>
                            <input type="text"
                                value={departured_location}
                                onChange={e => setDeparturedLocation(e.target.value)}
                                required={true}
                                className="w-full p-1 outline-none focus:border-b-sky-600 focus:border-b" />
                        </div>

                        <div className="my-2 border rounded-md p-1">
                            <small className="text-sm font-semibold text-sky-600">
                                Waktu Keberangkatan
                            </small>
                            <input type="datetime-local"
                                value={departured_time}
                                onChange={e => setDeparturedTime(e.target.value)}
                                required={true}
                                className="w-full p-1 outline-none focus:border-b-sky-600 focus:border-b" />
                        </div>

                        <div className="my-2 border rounded-md p-1">
                            <small className="text-sm font-semibold text-sky-600">
                                Lokasi Kedatangan
                            </small>
                            <input type="text"
                                value={arrived_location}
                                onChange={e => setArrivedLocation(e.target.value)}
                                required={true}
                                className="w-full p-1 outline-none focus:border-b-sky-600 focus:border-b" />
                        </div>

                        <div className="my-2 border rounded-md p-1">
                            <small className="text-sm font-semibold text-sky-600">
                                Waktu Kedatangan
                            </small>
                            <input type="datetime-local"
                                value={arrived_time}
                                onChange={e => setArrivedTime(e.target.value)}
                                required={true}
                                className="w-full p-1 outline-none focus:border-b-sky-600 focus:border-b" />
                        </div>

                        <div className="my-2 border rounded-md p-1">
                            <small className="text-sm font-semibold text-sky-600">
                                Harga
                            </small>
                            <input type="number"
                                value={price}
                                onChange={e => setPrice(Number(e.target.value))}
                                required={true}
                                className="w-full p-1 outline-none focus:border-b-sky-600 focus:border-b" />
                        </div>
                    </div>

                    <div className="w-full p-3 rounded-b-lg flex items-center justify-end gap-2">
                        <button type="button"
                            className="px-4 py-2 rounded-md bg-slate-700 hover:bg-slate-600 text-white"
                            onClick={() => closeModal()}>
                            Tutup
                        </button>
                        <button type="submit"
                            className="px-4 py-2 rounded-md bg-sky-700 hover:bg-sky-600 text-white">
                            Simpan
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    )
}

export default EditSchedule 