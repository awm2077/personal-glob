<template>
	<view class="themeItem">
		<navigator :url="'/pages/classlist/classlist?id='+item._id+'&name='+item.name" class="box" v-if="!isMore">
			<image class="pic" :src="item.picurl" mode="aspectFill"></image>
			<view class="mask">
				{{item.name}}
			</view>
			<view class="tab">
				{{times}}
			</view>
		</navigator>
		
		<navigator url="/pages/classfy/classfy" open-type="reLaunch" class="box more" v-else>
			<image class="pic" src="../../common/images/more.jpg" mode="aspectFill"></image>
			<view class="mask">
				<uni-icons type="more-filled" size="34" color="white"></uni-icons>
				<view class="text">
					更多
				</view>
			</view>
		</navigator>
	</view>
</template>

<script setup>
import {formatTimestamp} from '@/utils/common.js'
const data = defineProps({
	isMore:{
		type: Boolean,
		default: false
	},
	item:{
		type: Object,
		default(){
			return {
				// _id: "6524a48f6523417a8a8b825d",
				name: "默认名称",
				picurl: '../../common/images/classify1.jpg',
				updateTime: Date.now() - 1000*60*60*5
			}
		}
	}
})
const timer = formatTimestamp(data.item.updateTime);

const times = timer !== null? timer + "前更新" : "忘记多久更新的了";





</script>

<style lang="scss" scoped>
.themeItem{
	.box{
		height: 340rpx;
		border-radius: 10rpx;
		overflow: hidden;
		position: relative;
		.pic{
			width: 100%;
			height: 100%;
		}
		.mask{
			width: 100%;
			height: 70rpx;
			font-size: 30rpx;
			font-weight: 600;
			position: absolute;
			bottom: 0;
			left: 0;
			background: rgba(0,0,0,0.2);
			color: #fff;
			display: flex;
			align-items: center;
			justify-content: center;
			backdrop-filter: blur(20rpx);
		}
		.tab{
			position: absolute;
			left: 0;
			top: 0;
			background: rgba(250,129,90,0.7);
			backdrop-filter: blur(20rpx);
			color: white;
			font-size: 22rpx;
			padding: 6rpx 14rpx;
			border-radius: 0 0 20rpx 0;
			// 网页最小字符为12px，这里已经是最小了
			// 不过可以通过缩放在进行缩小
			// transfrom: scale(0.8); 
			// 调整位置
			// transfrom-origin: left top;
		}
	}
	.box.more{
		
		.mask{
			width: 100%;
			height: 100%;
			flex-direction: column;
		}
		.text{
			font-size: 28rpx;
		}
	}
}
</style>