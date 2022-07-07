<template>
    <el-scrollbar ref="scrollbarRef" always>

        <div class="box" ref="innerRef">
            <slot></slot>
        </div>
    </el-scrollbar>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { ElScrollbar } from 'element-plus'
import { and } from '@vueuse/core';

const value = ref(0)
const innerRef = ref<HTMLDivElement>()
const scrollbarRef = ref<InstanceType<typeof ElScrollbar>>()

const inputSlider = (value: number) => {
    scrollbarRef.value!.setScrollTop(value)
}
const scrollBottom = () => {
    let scroll_height = scrollbarRef.value!.wrap$?.clientHeight
    if (!scroll_height) {
        return
    }
    let content_height = innerRef.value!.clientHeight
    scrollbarRef.value!.setScrollTop(content_height)
}



const keepCurrentScroll = async () => {
    let last_scroll_top = innerRef.value!.clientHeight
    await nextTick()
    let current_scroll_top = innerRef.value!.clientHeight
    let dif = current_scroll_top - last_scroll_top
    scrollbarRef.value!.setScrollTop(dif)
}

defineExpose({
    scrollBottom,
    keepCurrentScroll,
})

// const loadMore= async ()=>{
//     last_scroll_top = innerRef.value!.clientHeight
//     loading.value= true
//     emits("scroll-top",loaded)
// }
</script>

<style scoped>
</style>
