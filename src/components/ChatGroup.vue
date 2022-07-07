<template>
<h5>聊天频道</h5>
    <el-menu class="el-menu-vertical-demo" @select="change_group" :default-active="modelValue || undefined">
        <el-menu-item :index="group.group_id" v-for="group in props.groups" :key="group.group_id">{{group.group_name}}</el-menu-item>
    </el-menu>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { ElMenuItem } from "element-plus";
import type {MessageGroupObject} from '@/types/Message'
import { useStore } from "vuex";
const props = withDefaults(defineProps<{
    groups: MessageGroupObject[];
    modelValue:string|null
}>(), {})
let emits = defineEmits<{
    (e:"update:modelValue",group_id:string):void
    (e:"change",group_id:string):void
}>()
async function change_group(index:string) {
    emits("update:modelValue",index)
}

</script>

<style scoped>
</style>
