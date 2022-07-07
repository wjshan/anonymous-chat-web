<template>
    <el-container style="height:100%;">
        <el-aside width="200px">
            <ChatGroup v-model="current_group" :groups="groups"></ChatGroup>
        </el-aside>
        <el-container>
            <el-main>
                <MessageDisplayBox v-loading="loading" ref="message_box" @scroll-top="preLoad"
                    v-if="message_list.length">
                    <el-button v-if="!noreMore" link type="primary" @click="preLoad">加载更多</el-button>
                    <SimpleMessage v-for="message in message_list" :key="message.message_key" v-bind="message" />
                </MessageDisplayBox>
                <el-empty v-else description="当前频道没有消息,请更换聊天频道" />
            </el-main>
            <el-divider></el-divider>
            <el-footer>
                <MessageInput v-if="user_active" :group_id="current_group" @submit="OnSubmit"></MessageInput>
            </el-footer>
        </el-container>
    </el-container>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import ChatGroup from '@/components/ChatGroup.vue';
import MessageInput from '@/components/MessageInput.vue';
import MessageDisplayBox from '@/components/MessageDisplayBox.vue';
import SimpleMessage from '@/components/SimpleMessage.vue';
import type { SendMessageObject, ReciveMessageObject, MessageGroupObject, GroupMessageArray } from '@/types/Message'
import { getMessageList, socket, sendMessage, scrollLastMessage } from '@/client/api'
import { useStore } from 'vuex';
import { useRouter, useRoute } from 'vue-router'
import { fa, tr } from 'element-plus/es/locale';
let store = useStore()

// 当前是否为合法的用户
let user_active = ref(store.getters['user/userActive'])
// getMessageList().then(group_messages => store.commit("chat/setGroupMessages", group_messages))
const message_box = ref<InstanceType<typeof MessageDisplayBox> & { scrollBottom: () => void }>()
// 监听消息回传
socket.on('receive', async (message: ReciveMessageObject) => {
    for (let mg of group_messages.value) {
        if (mg.group.group_id === message.group_id) {
            mg.messages.push(message)
            await nextTick()
            message_box.value?.scrollBottom()
        }
    }
})
// 初始化数据全部消息
let group_messages = ref<GroupMessageArray[]>([])
async function reload() {
    group_messages.value = await getMessageList()

}
reload()
// let group_messages = ref([])

// 初始化选择的当前消息分组
let route = useRoute()
let router = useRouter()
let current_group = computed({
    get: (): string | null => {
        let current_group = route.query.group as string || null
        return current_group
    },
    set: (group_id: string | null) => {
        noreMore.value = false
        router.replace({ query: { ...route.query, group: group_id } })
    }

})
let get_current_message_group = (group_id: string): GroupMessageArray | null => {
    if (!group_messages.value) {
        return null
    }
    for (let mg of group_messages.value) {
        if (mg.group.group_id === group_id) {
            return mg
        }
    }
    return null
}
let message_list = computed<ReciveMessageObject[]>(() => {
    return get_current_message_group(current_group.value!)?.messages || []
})

let groups = computed<MessageGroupObject[]>(() => {
    let groups: MessageGroupObject[] = []
    for (let mg of group_messages.value) {
        groups.push(mg.group)
    }
    return groups
})

async function OnSubmit(message: SendMessageObject) {
    await sendMessage(message)
}
let loading = ref(false)
let noreMore = ref(false)
async function preLoad() {
    loading.value = true
    let mg = get_current_message_group(current_group.value!)
    if (mg !== null) {
        let pre_messages = await scrollLastMessage(current_group.value!, mg.messages[0]?.message_key)
        if (!pre_messages.length) {
            // 没有更多消息
            ElNotification({
                title: '错误',
                message: '没有更多消息了',
                type: 'error',
            })
            noreMore.value = true
        } else {
            mg.messages = [...pre_messages, ...mg.messages]
            await message_box.value?.keepCurrentScroll()
            
        }
    }
    loading.value = false
}
</script>
<style scoped>
</style>