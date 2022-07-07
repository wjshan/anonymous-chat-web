<template>
    <el-input v-model.trim="message" placeholder="聊天输入框" @keydown.enter.native="submit">
        <template #append>
            <el-button :icon="Promotion" @click="submit" :disabled="!message" />
        </template>
    </el-input>
</template>

<script setup lang="ts">
import { Promotion } from '@element-plus/icons-vue'
import { ref } from 'vue';
import { useStore } from 'vuex';
import type { SendMessageObject } from '@/types/Message';
import { MESSAGETYPE } from '@/types/Message.d';
import { ElNotification, StepInstance } from 'element-plus'

let message = ref("")
let store = useStore()
let current_user = computed(()=>store.getters['user/getUser'])
let submit_emit = defineEmits<{
    (e: "submit", message: SendMessageObject): void
}>()

let props = defineProps<{ group_id: string|null }>()

async function submit() {
    if (!current_user.value.name) {
        ElNotification({
            title: '发送失败',
            message: '请设置你的昵称',
            type: 'error',
        })
    }else if(!props.group_id){
        ElNotification({
            title: '发送失败',
            message: '聊天频道异常',
            type: 'error',
        })
    }
    else if (message.value) {
        submit_emit('submit', {
            message_content: message.value,
            message_type: 'text',
            user_name: current_user.value.name,
            uid: current_user.value.uid,
            group_id: props.group_id
        })
    } else {
        ElNotification({
            title: '发送失败',
            message: '发送消息不可以为空',
            type: 'error',
        })
    }

    message.value = ""
}
</script>