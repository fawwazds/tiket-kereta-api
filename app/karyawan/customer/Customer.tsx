"use client"

import { AdminType } from "../types"
import DropAdmin from "./dropCustomer"
import EditAdmin from "./editCustomer"
import ResetPassword from "./resetPassword"

type props = {
    item: AdminType
}

const Admin = (myProp: props) => {
    return (
        <div className="w-full flex flex-wrap my-2 border rounded-md">
            <div className="w-full md:w-4/12 p-2 flex flex-col">
                <small className="text-sm font-medium">
                    Nama Karyawan
                </small>
                <span>
                    {myProp.item.name}
                </span>
            </div>
            <div className="w-full md:w-4/12 p-2 flex flex-col">
                <small className="text-sm font-medium">
                    Username
                </small>
                <span>
                    {myProp.item.user_details.username}
                </span>
            </div>
            <div className="w-full md:w-4/12 p-2 flex flex-col">
                <small className="text-sm font-medium">
                    Opsi
                </small>
                <div className="flex gap-2 items-center">
                    <EditAdmin admin={myProp.item} />
                    <ResetPassword admin={myProp.item} />
                    <DropAdmin admin={myProp.item} />
                </div>
            </div>
        </div>
    )
}

export default Admin
