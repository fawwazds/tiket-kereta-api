import { ReactNode } from "react"

type props = {
    children: ReactNode,
    isShow: boolean
}

const Modal =(MyProp: props) => {
    return (
        <div className={`z-[1024] w-dvw h-dvh fixed top-0 left-0 bg-black bg-opacity-75 flex justify-center items-center ${MyProp.isShow ? `block` : `hidden`}`}>
            <div className="bg-white w-5/6 md:w-1/3 lg:w-3/6">
                {MyProp.children}
            </div>
        </div>
    )
}

export default Modal