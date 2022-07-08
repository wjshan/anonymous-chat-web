<template>
    <div class="message-item">
        <div class="user-avatar">
            <el-avatar>{{ props.user_name?.toUpperCase()[0] }}</el-avatar>
        </div>
        <div class="item-detail">
            <div class="message-conent">
                {{ props.message_content }}
            </div>
            <div class="message-info">
                <span>
                    {{ props.user_name }}发表于{{ moment.utc(props.create_at).locale('zh-cn').fromNow() }}
                </span>
            </div>

        </div>

    </div>
</template>

<script setup lang="ts">
import {  computed, ref } from 'vue';
import moment from 'moment';
import "moment/dist/locale/zh-cn";
import {useStore} from 'vuex'
let props = defineProps({
    user_name: String,
    message_type: String,
    message_content: String,
    image_url: String,
    message_key: String,
    create_at: String,
    uid: {
        type: String,
        required: true
    }
})
let store = useStore()

let current_uid = store.getters['user/getUid']

let is_self = computed(() => {
    return props.uid === current_uid
})
let direction = computed(() => {
    return is_self.value ? "row-reverse" : "row"
})

</script>

<style scoped>
.message-item {
    display: flex;
    align-items: flex-start;
    flex-direction: v-bind(direction);
    margin-bottom: 20px;
}

.message-conent {
    min-height: 40px;
    width: 100%;
    padding-left: 3px;
    padding-right: 3px;
    box-shadow: var(--el-box-shadow-light);
    background-color: var(--el-color-primary-light-7);
    padding-top: 5px;
    padding-bottom: 5px;
}

.item-detail {
    max-width: calc(50%-100px);
    text-align: left;
    color: var(--el-text-color-regular);

    margin-left: 20px;
    margin-right: 20px;
}

.message-info {
    font-size: var(--el-font-size-extra-small);
    text-align: center;
    width: 100%;
}
</style>