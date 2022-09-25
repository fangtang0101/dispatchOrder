<template>
	<view class="content">
		<view class="line">
			我的信息
		</view>
		<view class="cont">
			<view class="cont-item">
				<view>工作状态：</view>
				<uni-data-select  v-model="userInfo.work_status" :localdata="selectWorkStatus" @change="change"></uni-data-select>
			</view>
			<view class="cont-item">
				<view>响应时长：</view>
				<input v-model.number="userInfo.response_count" class="uni-input" focus placeholder="请输入" />
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
		<button @click="submit">保 存</button>
	</view>
</template>
<script setup>
	import { ref, computed } from 'vue'; 
	import { onLoad} from '@dcloudio/uni-app';
	let userInfo = ref({})
	let openid = ref('')
	let avatar = computed(()=>{
		return userInfo.value.avatar ? userInfo.value.avatar : '../../static/logo.png'
	})
	const selectWorkStatus = ref([{ value: 0, text: "全职" },{ value: 1, text: "兼职" }])
	const selectSkill = ref([{ value: 'Node', text: "Node" },{ value: 'uni-app', text: "uni-app" }])
	onLoad((option)=>{
		 openid.value = option.openid
		 login()
	})
	function login(){
		const data = {openid:openid.value,action:'login'}
		uniCloud.callFunction({
			name:'user',
			data,
			success:(res) => {
				userInfo.value = res.result
			},
			complete:()=>{
				uni.hideLoading()
			}
		})
	}
	function submit(){
		const {work_status,response_count,skill_list,desc} = userInfo.value
		const data = {openid:openid.value,action:'update',work_status,response_count,skill_list,desc}
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
</script>

<style lang="less">
	.cont-item {
		display: flex;
		margin: 10rpx;
		view:first-child {
			width: 250rpx;
		}
	}

</style>
