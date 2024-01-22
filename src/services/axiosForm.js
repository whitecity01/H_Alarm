import axios from "axios";
import { SERVER_IP } from "constants/api";
import { getAuthTokenAtGlobal, setAccessTokenAtGlobal } from "utils/token";

const axiosInstance = axios.create({
    baseURL: SERVER_IP,
    headers:{
        'Content-Type': 'application/json'
    }
})

axiosInstance.interceptors.request.use(
    (config)=>{
        config.headers.Authorization = `Bearer ${getAuthTokenAtGlobal()}`
        return config;
    }
);

axiosInstance.interceptors.response.use(
    (response)=>{
        if(response.headers['accessToken'] && response.headers['expirationTimeFromAccessToken']){
            setAccessTokenAtGlobal(response.headers['accessToken'], response.headers['expirationTimeFromAccessToken']);
        }
        return response;
    },
    (error)=>{
        if (error.response && error.response.status === 401){
            window.location.href = '/';
            //history 훅 만들어서 하는게 더 좋음
        }
        return Promise.reject(error);
    }
)

/**
 * auth API 요청 Interface
 * @param {String} url 통신 URI
 * @param {String} data 입력 데이터
 * @param {String} params 쿼리 데이터
 * @returns 응답 객체
 */
export const axiosInterface = async (url, data = null, method="post", params=null) => {
  try{
    const res = await axiosInstance.request({
        method,
        url: `${url}`, 
        data, 
        params
    });
    // console.log(res);
    return res.data;
  }catch(e){
    // console.log(e);
    switch (e.response.status) {
      case 400:
        throw new Error(e.response.data);
      case 401:
        throw new Error(e.response.data);
      default:
        throw new Error(`서버 에러: ${e.response.status}`);
    }
  }
};