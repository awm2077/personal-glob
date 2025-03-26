<template>
	<view class="classLayout pageBe">
		<custom-nav-bar title="分类"></custom-nav-bar>
		<view class="classify">
			<theme-item class="theme-item" v-for="item in classifyList" :key="item._id" :item="item"></theme-item>
		</view>
	</view>
</template>

<script setup>
import { apiGetClassify } from '@/api/apis';
import { ref } from 'vue';

const classifyList = ref([])

const getClassify = async () => {
	const res = await apiGetClassify({
		pageSize: 15
	})
	classifyList.value = res.data
}

getClassify()
</script>

<style lang="scss" scoped>

.classLayout {
	padding: 30rpx;
}

.classify {
	display: grid;
	grid-template-columns: repeat(3, 1fr); /* 设置为三列 */
	gap: 15rpx; /* 列之间的间距 */
}

.theme-item {
	width: 100%; /* 让每个主题项占据整个网格单元格 */
	box-sizing: border-box; /* 包括内边距和边框在宽度计算中 */
}
</style>
