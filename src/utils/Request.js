import axios from "axios";
import Qs from 'qs';
import { Message } from "element-ui";

const config = {
    timeout: 10000,
    // 在发送请求之前对请求数据做处理
    // transformRequest: [
    //     function (data) {
    //     return typeof (data) == "object" ? Qs.stringify(data) : data;
    //     }
    // ],
    // // 请求头信息
    // headers: {
    //     'Content-Type': 'application/x-www-form-urlencoded'
    // },
    // // 序列化param
    // paramsSerializer: function (params) {
    //     return Qs.stringify(params)
    // },
    responseType: "json"
}

const request = axios.create(config);

// request.interceptors.request.use(
//     error => {
//         Message({
//             showClose: true,
//             message: error && error.data.error.message,
//             type: 'error'
//         });
//         return Promise.reject(error.data.error.message);
//     }
// );

request.interceptors.response.use(
    response => {
        if (0 !== response.data.code) {
            Message({
                showClose: true,
                message: response.data.msg,
                type: 'error'
            });
        }
        return response;
    },
    error  => {
        //对响应数据做些事
        Message({
            showClose: true,
            message: '请求失败',
            type: 'error'
        });
        return Promise.reject(error);
    }
)
export default request;