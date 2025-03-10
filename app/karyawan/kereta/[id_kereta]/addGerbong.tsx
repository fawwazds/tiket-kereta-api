"use client"
import Modal from "@/components/Modal"
import axiosInstance from "@/helper/api"
import { getCookie } from "@/helper/client-cookie"
import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"
import { toast, ToastContainer } from "react-toastify"

type props = {
    id_kereta: number

}

const AddGerbong = (myProp: props) => {
    const [name, setName] = useState<string>("")
    const [seat_count, setSeatCount] = useState<number>(0)
    const [train_id, setTrainId] = useState<number>(0)
    const [show, setShow] = useState<boolean>(false)
    const router = useRouter()
    const openModal = () => {
        setShow(true)
        setName("")
        setSeatCount(0)

        setTrainId(myProp.id_kereta)
    }

    const closeModal = () => {
        setShow(false)
    }

    const handleSubmit = async (e: FormEvent) => {
        try {
            e.preventDefault()
            const TOKEN = getCookie(`token`)
            const url = `/train/wagon`
            const requestData = {
                name, seat_count, train_id
            }
            const response: any = await axiosInstance.post(url, requestData, {
                headers: {
                    authorization: `Bearer ${TOKEN}`
                }
            })

            const message = response.data.message
            if (response.data.success == true) {
                setShow(false)
                
                toast(
                    message,
                    {
                        containerId: `toastAddGerbong`,
                        type: "success"
                    }
                )
                setTimeout(() => router.refresh(), 1000)
            }

            else {
                toast(
                    message,
                    {
                        containerId: `toastAddGerbong`,
                        type: "warning"
                    }
                )
            }
        } catch (error) {
            console.log(error)
            toast(
                `Something Wrong`,
                {
                    containerId: `toastAddGerbong`,
                    type: "error"
                }
            )
        }
    }

    return (
        <div>
            <ToastContainer
                containerId={`toastAddGerbong`}
                />
            <button type="button"
                onClick={() => openModal()}
            className="px-4 py-2 rounded-md bg-green-600 hover:bg-green-500 text-white">
                Tambah Gerbong
            </button>
            <Modal isShow={show}>
                <form onSubmit={handleSubmit}>
                                        {/*  modal header */}
                                        <div className="w-full p-3 rounded-t-lg">
                        <h1 className="font-semibold text-lg">
                            Tambah Gerbong Kereta
                        </h1>
                        <span className="text-sm text-slate-500">
                            Pastikan data yang diisi sudah benar
                        </span>
                    </div>

                    {/*  modal body */}
                    <div className="w-full p-3">
                        <div className="my-2 border rounded-md p-1">
                            <small className="text-sm font-semibold text-sky-600">
                                Nama Gerbong
                            </small>
                            <input type="text"
                                id={`name`}
                                value={name}
                                onChange={e => setName(e.target.value)}
                                required={true}
                                className="w-full p-1 outline-none focus:border-b-sky-600 focus:border-b" />
                        </div>

                        <div className="my-2 border rounded-md p-3">
                            <small className="text-sm font-semibold text-sky-600">
                                Jumlah Kursi
                            </small>
                            <input type="number"
                                id={`seat_count`}
                                value={seat_count.toString()}
                                onChange={e => setSeatCount(Number(e.target.value))}
                                required={true}
                                className="w-full p-1 outline-none focus:border-b-sky-600 focus:border-b" />


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
export default AddGerbong