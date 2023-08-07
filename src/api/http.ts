import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { ElMessage } from 'element-plus';
// import showCodeMessage from '@/api/code';
import store from 'store';
import { formatJsonToUrlParams, instanceObject } from '@/utils/format';

const BASE_PREFIX = import.meta.env.VITE_API_BASEURL;

// 创建实例
const axiosInstance: AxiosInstance = axios.create({
  // 前缀
  baseURL: BASE_PREFIX,
  // 超时
  timeout: 1000 * 30,
  // 请求头
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器
axiosInstance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // TODO 在这里可以加上想要在请求发送前处理的逻辑
    // TODO 比如 loading 等
    if (store.get('user_token') !== undefined) {
      const data = store.get('user_token');
      const head = config;
      if (data.accessToken && data.refreshToken) {
        // 设置请求头的访问令牌
        head.headers!.Authorization = `Bearer ${data.accessToken}`;
      }
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

// 响应拦截器
axiosInstance.interceptors.response.use((response: AxiosResponse) => {
  if (response.status === 200) {
    console.log(response.config.url);

    if (response.config.url == 'http://192.168.122.36:1024/api/v1/users/login') {
      console.log(response.data.data);
      if (response.data.data) {
        store.set('user_token', response.data.data);
      }
    }
    return response.data;
  }
  ElMessage.info(JSON.stringify(response.status));
  return response;
});

const service = {
  get<T = any>(url: string, data?: object): Promise<T> {
    return axiosInstance.get(url, { params: data });
  },

  post<T = any>(url: string, data?: object): Promise<T> {
    return axiosInstance.post(url, data);
  },

  put<T = any>(url: string, data?: object): Promise<T> {
    return axiosInstance.put(url, data);
  },

  delete<T = any>(url: string, data?: object): Promise<T> {
    return axiosInstance.delete(url, data);
  },

  upload: (url: string, file: FormData | File) =>
    axiosInstance.post(url, file, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  download: (url: string, data: instanceObject) => {
    window.location.href = `${BASE_PREFIX}/${url}?${formatJsonToUrlParams(data)}`;
  },
};

export default service;
