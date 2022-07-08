import type { SendMessageObject, ReciveMessageObject, MessageGroupObject, GroupMessageArray } from '@/types/Message';
import io from 'socket.io-client';
import axios from 'axios';
export const socket = io(`${import.meta.env.VITE_WS_URI}`, { path: "/api/ws/socket.io/", transports: ['websocket', 'polling'] })
const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URI
})

instance.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response.data;
}, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    let response = error.response
    console.error(response.data.data)
    return Promise.resolve(response.data);
});

interface CommonResponse<T>{
    code:number,
    message?:string,
    detail?:string,
    data:T
}

export async function sendMessage(message: SendMessageObject): Promise<boolean> {
    let response = await socket.emit("send_message", message)
    return true
}

export async function getMessageList(): Promise<GroupMessageArray[]> {
    // 返回全部最新消息 默认20条
    let response:CommonResponse<GroupMessageArray[]> = await instance.get(`/api/chat/message_list`)
    if (response.code){
        return []
    }
    return response.data
}

export async function scrollLastMessage(group_id: string, first_message_id: string): Promise<ReciveMessageObject[]> {
    // 向前获取20条消息
    let response:CommonResponse<ReciveMessageObject[]> = await instance.post(`/api/chat/sub_page_load`,  { group_id,first_message_id })
    if (response.code){
        return []
    }
    return response?.data
}