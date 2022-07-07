import { Module } from "vuex";
import {nanoid} from "nanoid"
interface User {
    name: string
    uid: string
}

const store: Module<User, unknown> = {
    namespaced: true,
    state() {
        return {
            name: "",
            uid: "",
        }
    },
    mutations: {
        setUser(state: User, payload: string) {
            state.name = payload;
            localStorage.setItem('name', state.name);
        },
        initUserDefaultInfo(state: User){
            let name = localStorage.getItem("name")
            name = name?name:"访客"
            let uid = localStorage.getItem("uid")
            uid = uid?uid:nanoid()
            state.name = name
            state.uid = uid
            localStorage.setItem('name', name);
            localStorage.setItem('uid', uid);
        }

    },
    actions: {
    },
    getters: {
        getName(state: User):String {
            return state.name
        },
        getUid(state: User):String {
            return state.uid
        },
        getUser(state):User{
            return {
                name:state.name,
                uid:state.uid,
            }
        },
        userActive(state):boolean{
            return state.name!=='' && state.uid!==''
        }
    }
}




export default store
