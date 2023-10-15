import axios, { AxiosInstance } from 'axios'

export function getAxiosInstance(baseURL?: string): AxiosInstance {
  const axiosInstance = axios.create({
    baseURL,
  })

  return axiosInstance
}
