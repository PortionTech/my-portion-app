
import { useAuthStore } from '@/zustand/store';
import axios from 'axios';
import toast from 'react-hot-toast';

const backendHost = import.meta.env.VITE_APIENDPOINT;
  
  export const api = axios.create({ baseURL: backendHost });
  export const apiPrivate = axios.create({ baseURL: backendHost, withCredentials: true });

  apiPrivate.interceptors.request.use(
      (config ) => {
        const token = useAuthStore.getState().token

        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

apiPrivate.interceptors.response.use(
    response => response,
    async (error) => {
        const refreshToken = useAuthStore.getState().refreshToken

        const prevRequest = error?.config;
        if (error?.response?.status === 401) {
            setTimeout( ()=>window.location.href = '/login', 1000);
            toast.error('Unauthorized access! Login.')
        }
          
        if (error?.response?.status === 403 && !prevRequest?.sent) {
            prevRequest.sent = true;
            const res = await api.post(`/auth/refresh`, { refreshToken });
            const newToken = res.data.data.token;
            useAuthStore.setState({ token: newToken})
            prevRequest.headers['Authorization'] = `Bearer ${newToken}`;
            return api(prevRequest);
        }
        
        return error.response.data;
    }
);

