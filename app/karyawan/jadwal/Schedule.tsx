import { ScheduleType } from "../types"
import DropSchedule from "./dropSchedule"
import EditSchedule from "./editSchedule"

type Props = {
    item: ScheduleType
}


const showTime = (date: string) => {
    const currentDate = new Date(date)
    return currentDate.toLocaleString(`id-ID`, {
        year: "numeric", 
        month: "long", 
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit"
    })
}
const Schedule = (myProp: Props) => {
    return (
        <div className="flex flex-wrap w-full rounded-md shadow-md" >
            <div className="w-full md:w-3/12 p-3 flex flex-col">
                <small className="text-ixs font-semibold text-sky-700">
                    Berangkat dari
                </small>
                <strong>{myProp.item.departured_location}</strong>
                <small className="text-xs font-semibold text-sky-700">
                    Waktu keberangkatan
                </small>
                <strong>{showTime(myProp.item.departured_time)}</strong>
            </div>
            
            <div className="w-full md:w-3/12 p-3 flex flex-col">
                <small className="text-xs font-semibold text-sky-700">
                    Tiba di
                </small>
                <strong>{myProp.item.arrived_location}</strong>
                <small className="text-xs font-semibold text-sky-700">
                    Waktu kedatangan
                </small>
                <strong>{showTime(myProp.item.arrived_time)}</strong>
            </div>

            <div className="w-full md:w-4/12 p-3 flex flex-col">
                <small className="text-xs font-semibold text-sky-700">
                    Unit Kereta
                </small>
                <strong>{myProp.item.train_details.name}</strong>
                <small className="text-xs font-semibold text-sky-700">
                    Harga
                </small>
                <strong>{myProp.item.price.toLocaleString(`en-US`, {style: `currency`, currency: `IDR`})}</strong>
            </div>

            <div className="w-full md:w-2/12 p-3 flex flex-col">
                <small className="text-xs font-semibold text-sky-700">
                    Opsi
                </small>
                <div className="flex gap-2 items-center">
                    <EditSchedule schedule={myProp.item} />
                    <DropSchedule schedule={myProp.item} />
                </div>
            </div>
        </div>
    )

}

export default Schedule