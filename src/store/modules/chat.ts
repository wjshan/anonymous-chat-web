import { Module } from "vuex";
import { nanoid } from "nanoid"
import type { GroupMessageArray, ReciveMessageObject } from '@/types/Message'
import { getMessageList } from '@/client/api'
interface Message {
    current_group_id?: string,
    group_messages: GroupMessageArray[]
}

const store: Module<Message, unknown> = {
    namespaced: true,
    state() {
        return {
            current_group_id: undefined,
            group_messages: [], // 消息内容按照时间倒序存放
        }
    },
    mutations: {
        setGroup(state: Message, group_id: string) {
            state.current_group_id = group_id
        },
        setGroupMessages(state: Message, messages: GroupMessageArray[]) {
            state.group_messages = messages

        },
        addMessage(state,message:ReciveMessageObject){
            // 接收单条最新的消息
            for (let msg of state.group_messages){
                if( msg.group.group_id == message.group_id){
                    msg.messages.unshift(message)
                }
            }
        }
    },
    actions: {
        // async load_group_message(context) {
        //     let messages = await getMessageList()
        //     context.commit('setGroupMessages',messages)
        // },

        
    },
    getters: {
        getCurrentGroup(state: Message): string | undefined {
            return state.current_group_id
        },
        visibleMessageList(state:Message): ReciveMessageObject[] {
            for (let message of state.group_messages){
                if( message.group.group_id == state.current_group_id){
                    return message.messages
                }
            }
            return []
        }
    }
}




export default store
