<template>
	<view class="listLayout">
		<view class="title">
			<view class="tag" v-if="detial.select">
				<uni-tag :mark="true" text="置顶" inverted="true" type="primary" size="mini" />
			</view>
			<view class="font">
				{{detial.title}}
			</view>
		</view>
		
		<view class="info">
			<view class="item">
				{{detial.author}}
			</view>
			<view class="item">
				<uni-dateformat :data="detial.publish_date" format="yyyy-MM-dd"></uni-dateformat>
			</view>
		</view>
		
		<view class="content">
			<!-- 富文本，需要用组件进行HTML元素渲染 -->
			<!-- 官方 -->
			<!-- <rich-text :nodes="detial.content"></rich-text> -->
			<!-- 第三方 -->
			<mp-html :content="detial.content" />
		</view>
		<view class="count">
			阅读 {{detial.view_count}}
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';
import { apiNoticeDetail } from '@/api/apis';
import {onLoad} from '@dcloudio/uni-app'

const detial = ref({})
let id
onLoad((e) => {
	id = e.id
	getNoticeDetial()
})

const getNoticeDetial = () => {
	apiNoticeDetail({id:id}).then(res => {
		detial.value = res.data
	})
}

</script>

<style lang="scss" scoped>
.listLayout{
	padding:30rpx;
		.title{
			font-size: 40rpx;
			color:#111;
			line-height: 1.6em;
			padding-bottom:30rpx;
			display: flex;
			.tag{
				transform: scale(0.8);
				transform-origin: left center;
				flex-shrink: 0;	
			}
			.font{
				padding-left:6rpx;
			}
		}
		.info{
			display: flex;
			align-items: center;
			color:#999;
			font-size: 28rpx;
			.item{
				padding-right: 20rpx;
			}
		}
		.content{
			padding:50rpx 0;
		}
		.count{
			color:#999;
			font-size: 28rpx;
		}
}
</style>
