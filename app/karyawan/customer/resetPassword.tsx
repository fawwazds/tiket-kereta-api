"use client"

import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"
import Modal from "@/components/Modal"
import { toast, ToastContainer } from "react-toastify"
import { getCookie } from "@/helper/client-cookie"
import axiosInstance from "@/helper/api"
import { AdminType } from "../types"

type props = {
    admin: AdminType
}

const ResetPassword = (myProp: props) => {
    const [password, setPassword] = useState<string>("")
    const [confirmPassword, setConfirmPassword] = useState<string>("")
    const [show, setShow] = useState<boolean>(false)
    const router = useRouter()

    const openModal = () => {
        setShow(true)
        setPassword("")
        setConfirmPassword("")
    }

    const closeModal = () => {
        setShow(false)
    }

    const handleSubmit = async (e: FormEvent) => {
        try {
            e.preventDefault()
            if (password !== confirmPassword) {
                toast("Password tidak cocok",
                    {
                        containerId: `toastReset-${myProp.admin.id}`,
                        type: "warning"
                    }
                )
                return
            }

            const TOKEN = getCookie(`token`)
            const url = `/customer/${myProp.admin.id}`
            const requestData = {
                password
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
                        containerId: `toastReset-${myProp.admin.id}`,
                        type: "success"
                    }
                )
                setShow(false)
                setTimeout(() => router.refresh(), 1000)
            } else {
                toast(message,
                    {
                        containerId: `toastReset-${myProp.admin.id}`,
                        type: "warning"
                    }
                )
            }
        } catch (error) {
            console.log(error);
            toast(
                `Terjadi kesalahan`,
                {
                    containerId: `toastReset-${myProp.admin.id}`,
                    type: "error"
                }
            )
        }
    }

    return (
        <div>
            <ToastContainer containerId={`toastReset-${myProp.admin.id}`} />
            <button type="button"
                onClick={() => openModal()}
                className="px-2 py-1 rounded-md bg-yellow-600 hover:bg-yellow-500 text-white">
                Reset Password
            </button>
            <Modal isShow={show}>
                <form onSubmit={e => handleSubmit(e)}>
                    <div className="w-full p-3 rounded-t-lg">
                        <h1 className="font-semibold text-lg">
                            Reset Password Pelanggan
                        </h1>
                        <span className="text-sm text-slate-500">
                            Masukkan password baru untuk pelanggan {myProp.admin.name}
                        </span>
                    </div>

                    <div className="w-full p-3">
                        <div className="my-2 border rounded-md p-1">
                            <small className="text-sm font-semibold text-sky-600">
                                Password Baru
                            </small>
                            <input type="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                required={true}
                                className="w-full p-1 outline-none focus:border-b-sky-600 focus:border-b" />
                        </div>

                        <div className="my-2 border rounded-md p-1">
                            <small className="text-sm font-semibold text-sky-600">
                                Konfirmasi Password
                            </small>
                            <input type="password"
                                value={confirmPassword}
                                onChange={e => setConfirmPassword(e.target.value)}
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
                            className="px-4 py-2 rounded-md bg-yellow-700 hover:bg-yellow-600 text-white">
                            Reset Password
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    )
}

export default ResetPassword 