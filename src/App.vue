<template>
	<el-config-provider :locale="locale">
		<el-container class="main-container">
			<el-header>
				<div style="display: flex; flex-direction: row-reverse; align-items: center;">
					<LoginDialog />
					<el-switch inline-prompt style="--el-switch-on-color: var(--bg-color-mute);" :model-value="isDark"
						:active-icon="Dark" :inactive-icon="Light" @change="toggleDark()" />
					<p style="color:  #f78989;">这是一个匿名聊天室,请遵守法纪法规并保护自己的隐私</p>
				</div>
			</el-header>
			<el-main>
				<Suspense>
					<router-view />
				</Suspense>

			</el-main>
		</el-container>
	</el-config-provider>
</template>

<script setup lang="ts">
import 'element-plus/theme-chalk/dark/css-vars.css'
import { computed } from "vue";
import { i18n } from "./i18n";
import { useDark, useToggle } from '@vueuse/core'
import Dark from '@/components/Dark.vue'
import Light from '@/components/light.vue'
import { User } from '@element-plus/icons-vue'
import LoginDialog from '@/components/LoginDialog.vue'
import { useStore } from 'vuex'

console.log(
	`%c 这是一个匿名聊天室,在此不会有人知道你是谁.%c 你可以畅所欲言,但请准守法律并注意保护个人隐私.`
	, "background:#000;color:#FFF;font-weight:bold;"
	, "background:#FFF;color:#000;"
)
let store = useStore()
store.commit('user/initUserDefaultInfo')
let locale = computed(() => (i18n.global.messages as any)![i18n.global.locale]);
const isDark = useDark()
const toggleDark = useToggle(isDark)

</script>

<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
}
</style>

<style scoped>
.main-container {
	height: 100%;
}
</style>