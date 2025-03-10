/* eslint-disable @typescript-eslint/no-unused-vars */
/*  file ini digunakan untuk inisiasi dan konfigurasi axios
    axios -> komunikasi dengan backend
*/

import axios from "axios";

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    headers: {
        "Content-Type": "application/json",
        "APP-KEY": process.env.NEXT_PUBLIC_APP_KEY,

    }
})

export default axiosInstance