import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
  AxiosResponse
} from 'axios'
import { ResultData } from './interface'
import { useUserStore } from '@/stores/modules/user'

const config = {
  // 默认地址请求地址，可在 .env.** 文件中修改
  baseURL: import.meta.env.VITE_API_URL as string,
  // 设置超时时间
  timeout: 30000
}

class Http {
  private static axiosInstance: AxiosInstance
  constructor(config: AxiosRequestConfig) {
    Http.axiosInstance = axios.create(config)
    this.interceptorsRequest()
    this.interceptorsResponse()
  }

  //请求拦截器
  private interceptorsRequest() {
    Http.axiosInstance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        // 为请求头对象，添加 Token 验证的 Authorization 字段
        const userStore = useUserStore()
        config.headers.Authorization = userStore.token
        return config
      },
      (error: string) => {
        return Promise.reject(error)
      }
    )
  }
  //响应拦截器
  private interceptorsResponse() {
    Http.axiosInstance.interceptors.response.use(
      async (response: AxiosResponse) => {
        const { data } = response
        return data
      },
      (error: string) => {
        return Promise.reject(error)
      }
    )
  }
  get<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
    return Http.axiosInstance.get(url, { params, ..._object })
  }
  post<T>(url: string, params?: object | string, _object = {}): Promise<ResultData<T>> {
    return Http.axiosInstance.post(url, params, _object)
  }
  put<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
    return Http.axiosInstance.put(url, params, _object)
  }
  delete<T>(url: string, params?: any, _object = {}): Promise<ResultData<T>> {
    return Http.axiosInstance.delete(url, { params, ..._object })
  }
}

export default new Http(config)
