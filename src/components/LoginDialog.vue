<template>
    <el-button @click="open" :icon="User" circle style="margin-left:5px; margin-right: 5px;" />
    <el-dialog v-model="dialog_visible" title="设置昵称" width="30%" center>
        <el-form label-position="right">
            <el-form-item label="昵称">
                <el-input v-model="user_name" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialog_visible = false">取消</el-button>
                <el-button type="primary" @click="confirm">确认</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { User } from '@element-plus/icons-vue'
import { useStore } from 'vuex'
import { ref } from 'vue'
let store = useStore()
let user = store.getters["user/getUser"]
let user_name = ref("")
user_name.value = user.name
let dialog_visible = ref(false)
function open() {
    dialog_visible.value = true
}
function confirm() {
    dialog_visible.value = false
    store.commit('user/setUser',user_name)

}
</script>

<style>
.dialog-footer button:first-child {
    margin-right: 10px;
}
</style>