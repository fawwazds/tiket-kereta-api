import React from 'react'
import { ScheduleType, KeretaType } from '../../../karyawan/types'
import axiosInstance from '@/helper/api'
import { getServerCookie } from '@/helper/server-cookie'
import Reservasion from './reservasion'

const getTrainBySchedule = async (schedule_id: number): Promise<KeretaType | null> => {
    try {

       const token = await getServerCookie('token')
       
       const response: any = await axiosInstance.get(`/schedule/train/${schedule_id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
       })

       if (!response.data.success) return null

       return response.data.data
    } catch (error) {
        console.log(error)
        return null
    }
}

const getScheduleDetails = async (schedule_id: number): Promise<ScheduleType | null> => {
    try {

       const token = await getServerCookie('token')
       
       const response: any = await axiosInstance.get(`/schedule/${schedule_id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
       })

       if (!response.data.success) return null

       return response.data.data
    } catch (error) {
        console.log(error)
        return null
    }
}

const showTime = (date: string) => {
    const currentDate = new Date(date)
    return currentDate.toLocaleTimeString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
    })
}

interface Props {
    params: {
        schedule_id: number
    }
}
const page = async (myprops: Props) => {
    const detailsKereta = await getTrainBySchedule(myprops.params.schedule_id)
    const detailsSchedule = await getScheduleDetails(myprops.params.schedule_id)
    
    if (!detailsKereta || !detailsSchedule) {
        return (
            <div className="w-full p-3">
                <div className="bg-orange-100 p-3 rounded-md">
                    Maaf, jadwal tidak ditemukan
                </div>
            </div>
        )
    }

  return (
    <div className='w-full p-3'>
        <h1 className='text-2xl font-bold'>Keberangkatan kereta</h1>

        <table>
            <tbody>
                <tr>
                    <td>Stasiun Keberangkatan</td>
                    <td> : {detailsSchedule?.departured_location}</td>
                </tr>
                <tr>
                    <td>Waktu Keberangkatan</td>
                    <td>: {showTime(detailsSchedule?.departured_time as string)}</td>
                </tr>
                <tr>
                    <td>Stasiun Kedatangan</td>
                    <td>: {detailsSchedule?.arrived_location}</td>
                </tr>
                <tr>
                    <td>Waktu Keberangkatan</td>
                    <td>: {showTime(detailsSchedule?.arrived_time as string)}</td>
                </tr>
                <tr>
                    <td>Nama Kereta</td>
                    <td>: {detailsKereta?.name}</td>
                </tr>
            </tbody>
        </table>

        <Reservasion
        schedule_id={detailsSchedule!.id}
       wagons={detailsKereta!.wagons}
        />
    </div>
  )
}

export default page