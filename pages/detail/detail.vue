<template>
	<view class="content">
		<view class="cont-item">
			<view>项目名称：</view>
			<view>{{dataDetail.name}}</view>
		</view>
		<view class="cont-item">
			<view>项目报酬：</view>
			<view>{{dataDetail.payment}}</view>
		</view>
		<view class="cont-item">
			<view>共需：</view>
			<view>{{dataDetail.need_people}}</view>
		</view>
		<view class="cont-item">
			<view>报名截止时间：</view>
			<view>{{dataDetail.registration_deadline}}</view>
		</view>
		<view class="cont-item">
			<view>状态：</view>
			<view>{{dataDetail.status}}</view>
		</view>
		<view class="cont-item">
			<view>项目描述：</view>
			<view>{{dataDetail.desc}}</view>
		</view>
		<view class="cont-item">
			<view>职能：</view>
		</view>
		<view class="job-list" v-for="item in dataDetail.job_list">
			<view>{{item.position}}</view>
			<view>{{item.need_people}}人</view>
			<view>{{item.payment}}元</view>
			<button @click="open(item)">立即报名</button>
		</view>
		<uni-popup ref="popup" :mask-click="false" background-color="#fff">
			<view class="cont-item">
				<view>职能：</view>
				<view>{{currentJob.position}}</view>
			</view>
			<view class="cont-item">
				<view>职位：</view>
				<view>
					<radio-group @change="radioChange">
						<label class="radio" v-for="role in roleList">
							<radio :value="role" :checked="role === currentRegistInfo.role"/>
							{{role}}
						</label>
					</radio-group>
				</view>
			</view>
			<view class="cont-item">
				<view>技能：</view>
				<uni-tag v-for="skill in currentJob.need_skill_list" :text="skill" :inverted="true" size="mini" />
			</view>
			<view class="cont-item">
				<view>竞选宣言：</view>
				<view>
					<textarea v-model="currentRegistInfo.info" placeholder="请输入竞选宣言"/>
				</view>
			</view>
			<view class="btn-box">
				<button @click="close">关闭</button>
				<button @click="submit">提交</button>
			</view>

		</uni-popup>
	</view>
</template>
<script setup>
	import { ref } from 'vue';
	import { onShow ,onLoad} from '@dcloudio/uni-app';
	const dataDetail = ref({}) 
	let popup = ref(null)
	let currentJob = ref({})
	let currentRegistInfo = ref({info:'',role:''})
	const roleList = ref(['队长','队员'])
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
	})
	function open(item){
		currentJob.value = {...item}
		popup.value.open('center')
	}
	function close(){
		popup.value.close()
	}
	function radioChange(e){
		 console.log('e ==========',e)
		 const {value} = e.detail
		 currentRegistInfo.value = {...currentRegistInfo.value,role:value}
	
	}
	function submit(){
		const args = {user_id:'fang111',...currentRegistInfo.value,job_id:currentJob.value._id}
		debugger
		uniCloud.callFunction({
			name:'updateRegistration',
			data:args,
			success:(res) => {
				console.log('updateRegistration ====',res)
				if(res.result && res.result.data && res.result.data.length>0){
					dataDetail.value = res.result.data[0]
				}
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
