import axios from 'axios'

const config = useRuntimeConfig()

const Api = axios.create({
    baseURL: config.public.API_URL
})

export default Api