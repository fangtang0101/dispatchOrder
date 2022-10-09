<template>
	<view class="content">
		<view class="cont-item">
			<view>项目名称：</view>
			<input v-model="dataDetail.name" class="uni-input" focus placeholder="请输入" />
		</view>
		<view class="cont-item">
			<view>项目报酬：</view>
			<input v-model.number="dataDetail.payment" type='number' class="uni-input" focus placeholder="请输入" />
		</view>
		<view class="cont-item">
			<view>共需：</view>
			<input v-model.number="dataDetail.need_people" class="uni-input" focus placeholder="请输入" />
		</view>
		<view class="cont-item">
			<view>报名截止时间：</view>
			<uni-datetime-picker return-type='timestamp' v-model="dataDetail.registration_deadline" />
		</view>
		<view class="cont-item">
			<view>项目描述：</view>
			<textarea v-model="dataDetail.desc" placeholder="请输入描述"/>
		</view>
		<view class="cont-item">
			<button @click="open">添加职能</button>
		</view>
		<view class="job-list" v-for="item in job_list">
			<view>{{item.position}}</view>
			<view>{{item.need_people}}人</view>
			<view>{{item.payment}}元</view>
		</view>
		<uni-popup ref="popup" :mask-click="false" background-color="#fff">
			<view class="cont-item">
				<view>职能：</view>
				<uni-data-select  v-model="currentJob.position" :localdata="selectPosition" @change="change"></uni-data-select>
			</view>
			<view class="cont-item">
				<view>报酬：</view>
				<input v-model.number="currentJob.payment" type='number' class="uni-input" focus placeholder="请输入" />
			</view>
			<view class="cont-item">
				<view>所需：</view>
				<input v-model.number="currentJob.need_people" type='number' class="uni-input" focus placeholder="请输入" />
			</view>
			<view class="cont-item">
				<view>技能：</view>
				<uni-data-checkbox mode="tag" multiple v-model="currentJob.need_skill_list" :localdata="selectSkill"></uni-data-checkbox>
			</view>
			<view class="btn-box">
				<button @click="close">关闭</button>
				<button @click="submit">提交</button>
			</view>
		</uni-popup>
		<button @click="publish">发 布</button>
	</view>
</template>
<script setup>
	import { ref } from 'vue';
	import { onShow ,onLoad} from '@dcloudio/uni-app';
	const dataDetail = ref({}) 
	let popup = ref(null)
	let currentJob = ref({})
	let currentRegistInfo = ref({info:'',role:''})
	let job_list = ref([])
	const selectPosition = ref([{ value: '前端', text: "前端" },{ value: '后端', text: "后端" }])
	const selectSkill = ref([{ value: 'Node', text: "Node" },{ value: 'uni-app', text: "uni-app" }])
	// NOTE:千万注意：所有方法后面不能加,;否则方法 相当于没有定义
	onLoad((option)=>{
		const {_id} = option
		console.log('onLoad ===',_id)
		uniCloud.callFunction({
			name:'queryProjectDetail',
			data:{_id},
			success:(res) => {
				console.log('queryProjectDetail ====',res)
				if(res.result && res.result.data && res.result.data.length>0){
					dataDetail.value = res.result.data[0]
				}
			},
			complete:()=>{
				uni.hideLoading()
			}
		})
		// 获取字典码的值
		uniCloud.callFunction({
			name:'dict',
			data:{table:'job-position',action:'check'},
			success:(res) => {			
				if(res.result && res.result.data.length>0) selectPosition.value = res.result.data.map(item=>{return{value:item.name,text:item.name}})
			}
		})
		uniCloud.callFunction({
			name:'dict',
			data:{table:'skill',action:'check'},
			success:(res) => {			
				if(res.result && res.result.data.length>0) selectSkill.value = res.result.data.map(item=>{return{value:item.name,text:item.name}})
			}
		})
	})
	function open(){
		currentJob.value = {position:'',payment:'',need_skill_list:[],need_people:''}
		popup.value.open('center')
	}
	function close(){
		popup.value.close()
	}
	function submit(){
		popup.value.close()
		job_list.value.push(currentJob.value)
	}
	function publish(){
		const data = {...dataDetail.value,job_list:job_list.value,status:'报名中'}
		console.log('publish ===',data)
		uniCloud.callFunction({
			name:'publishProject',
			data,
			success:(res) => {
				// 返回
				uni.navigateBack()
			},
			complete:()=>{
				uni.hideLoading()
			}
		})
	}
</script>

<style lang="less">
	.content {
		.cont-item {
			display: flex;
			margin: 10rpx;
			view:first-child {
				width: 250rpx;
			}
		}
		.job-list{
			display: flex;
			margin: 10rpx;
			border: 1rpx solid #999;
			border-radius: 5rpx;
			justify-content: space-between;
			align-items: center;
			padding: 0 30rpx;
			height: 100rpx;
			view {
				margin-left: 10rpx;
			}
			button {
				margin: 0rpx;
			}
		}
		textarea{
			border: solid 1px #999;
		}
		
		.btn-box{
			display: flex;
			justify-content: center;
		}
	}


</style>
