import axios from "axios";
const instance = axios.create(

    {
        baseURL: import.meta.VITE_BASE_URL,
        withCredentials: true,

    });

export default instance;