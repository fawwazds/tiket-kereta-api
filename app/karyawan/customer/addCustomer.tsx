"use client"

import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"
import Modal from "@/components/Modal"
import { toast, ToastContainer } from "react-toastify"
import { getCookie } from "@/helper/client-cookie"
import axiosInstance from "@/helper/api"

const AddAdmin = () => {
    const [name, setName] = useState<string>("")
    const [nik, setNik] = useState<string>("")
    const [address, setAddress] = useState<string>("")
    const [phone, setPhone] = useState<string>("")
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [show, setShow] = useState<boolean>(false)
    const router = useRouter()

    const openModal = () => {
        setShow(true)
        setName("")
        setNik("")
        setAddress("")
        setPhone("")
        setUsername("")
        setPassword("")
    }

    const closeModal = () => {
        setShow(false)
    }

    const handleSubmit = async (e: FormEvent) => {
        try {
            e.preventDefault()
            const TOKEN = getCookie(`token`)
            const url = `/customer/register`
            const requestData = {
                name, nik, address, phone, username, password
            }
            const response: any = await axiosInstance.post(url, requestData, {
                headers: {
                    authorization: `Bearer ${TOKEN}`
                }
            })

            const message = response.data.message
            if (response.data.success == true) {
                toast(message,
                    {
                        containerId: `toastAdd`,
                        type: "success"
                    }
                )
                setShow(false)
                setTimeout(() => router.refresh(), 1000)
            } else {
                toast(message,
                    {
                        containerId: `toastAdd`,
                        type: "warning"
                    }
                )
            }
        } catch (error) {
            console.log(error);
            toast(
                `Something wrong`,
                {
                    containerId: `toastAdd`,
                    type: "error"
                }
            )
        }
    }

    return (
        <div>
            <ToastContainer containerId={`toastAdd`} />
            <button type="button"
                onClick={() => openModal()}
                className="px-4 py-2 rounded-md bg-lime-600 hover:bg-lime-500 text-white">
                Tambah Data Pelanggan
            </button>
            <Modal isShow={show}>
                <form onSubmit={e => handleSubmit(e)}>
                    <div className="w-full p-3 rounded-t-lg">
                        <h1 className="font-semibold text-lg">
                            Tambah Data Pelanggan
                        </h1>
                        <span className="text-sm text-slate-500">
                            Pastikan data yang diisi sudah benar
                        </span>
                    </div>

                    <div className="w-full p-3">
                        <div className="my-2 border rounded-md p-1">
                            <small className="text-sm font-semibold text-sky-600">
                                Nama Pelanggan
                            </small>
                            <input type="text"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                required={true}
                                className="w-full p-1 outline-none focus:border-b-sky-600 focus:border-b" />
                        </div>

                        <div className="my-2 border rounded-md p-1">
                            <small className="text-sm font-semibold text-sky-600">
                                NIK
                            </small>
                            <input type="text"
                                value={nik}
                                onChange={e => setNik(e.target.value)}
                                required={true}
                                className="w-full p-1 outline-none focus:border-b-sky-600 focus:border-b" />
                        </div>

                        <div className="my-2 border rounded-md p-1">
                            <small className="text-sm font-semibold text-sky-600">
                                Alamat
                            </small>
                            <input type="text"
                                value={address}
                                onChange={e => setAddress(e.target.value)}
                                required={true}
                                className="w-full p-1 outline-none focus:border-b-sky-600 focus:border-b" />
                        </div>

                        <div className="my-2 border rounded-md p-1">
                            <small className="text-sm font-semibold text-sky-600">
                                Telepon
                            </small>
                            <input type="text"
                                value={phone}
                                onChange={e => setPhone(e.target.value)}
                                required={true}
                                className="w-full p-1 outline-none focus:border-b-sky-600 focus:border-b" />
                        </div>

                        <div className="my-2 border rounded-md p-1">
                            <small className="text-sm font-semibold text-sky-600">
                                Username
                            </small>
                            <input type="text"
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                                required={true}
                                className="w-full p-1 outline-none focus:border-b-sky-600 focus:border-b" />
                        </div>

                        <div className="my-2 border rounded-md p-1">
                            <small className="text-sm font-semibold text-sky-600">
                                Password
                            </small>
                            <input type="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                required={true}
                                className="w-full p-1 outline-none focus:border-b-sky-600 focus:border-b" />
                        </div>
                    </div>

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

export default AddAdmin
