<template>
	<view class="content">
		<view class="header">
			<view class="header-top">
				<img :src="avatar" alt="" srcset="">
				<text>{{userInfo.nickname}}</text>
				<text>做单中</text>
			</view>
			<view class="header-bottom">
				<view class="card">
					<view>{{userInfo.order_count || 0}}</view>
					<view>接单次数</view>
				</view>
				<view class="card">
					<view>{{userInfo.registration_count || 0}}</view>
					<view>报名次数</view>
				</view>
				<view class="card">
					<view>{{userInfo.money || 0}}</view>
					<view>佣金</view>
				</view>
				<view class="card">
					<view>{{userInfo.score || 100}}</view>
					<view>权重值</view>
				</view>
			</view>
		</view>
		<view class="line">
			我的信息
			<button>选取组长</button>
			<button>编辑</button>
		</view>
		<view class="cont">
			<view class="cont-item">
				<view>工作状态：</view>
				<view>{{userInfo.work_status}}</view>
			</view>
			<view class="cont-item">
				<view>响应时长：</view>
				<view>{{userInfo.response_count}}</view>
			</view>
			<view class="cont-item">
				<view>技术栈：</view>
				<uni-data-checkbox mode="tag" multiple v-model="userInfo.skill_list" :localdata="selectSkill"></uni-data-checkbox>
			</view>
			<view class="cont-item">
				<view>项目经验：</view>
				<textarea v-model="userInfo.desc" placeholder=""/>
			</view>
		</view>
		<view class="line">
			我的单子
		</view>
	</view>
</template>
<script setup>
	import { ref,computed } from 'vue'; 
	import { onShow } from '@dcloudio/uni-app';
	const db = uniCloud.database();
	let userInfo = ref({})
	let avatar = computed(()=>{
		return userInfo.value.avatar ? userInfo.value.avatar : '../../static/logo.png'
	})
	const selectSkill = ref([{ value: 'Node', text: "Node" },{ value: 'uni-app', text: "uni-app" }])
	onShow(()=>{
		login()
	})
	function login(){
		const data = {openid:'123456',action:'login'}
		uniCloud.callFunction({
			name:'user',
			data,
			success:(res) => {
				console.log('login ====',res)
				userInfo.value = res.result
			},
			complete:()=>{
				uni.hideLoading()
			}
		})
	}
	// function login(){
	// 	const data = {openid="111"}
	// 	uniCloud.callFunction({
	// 		name:'login',
	// 		data,
	// 		success:(res) => {
	// 			console.log('login ====',res)
	// 		},
	// 		complete:()=>{
	// 			uni.hideLoading()
	// 		}
	// 	})
	// }

</script>

<style lang="less">
	.content {
		.header {
			border: 1rpx solid #999;
			border-radius: 5rpx;
			padding: 15rpx;
			margin: 15rpx;
			.header-top {
				display: flex;
				align-items: center;
				img {
					width: 100rpx;
					height: 100rpx;
					border-radius: 50rpx;
				}
				text {
					margin-left: 15rpx;
				}
			}
			.header-bottom {
				display: flex;
				margin-top: 15rpx;
				.card {
					flex:0 0 25%; 
					text-align: center;
					view:first-child{
						color: #999;
					}
					view:nth-child(2){
						// color: #999;
					}
				}
			}
		}
		.line {
			display: flex;
		}
		.cont-item {
			display: flex;
			margin: 10rpx;
			view:first-child {
				width: 250rpx;
			}
		}
	}

</style>
