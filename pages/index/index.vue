<template>
	<view class="content">
		<button v-if="!useInfo.nickname" @click="login">登录</button>
		<template v-else>
			<view v-for="item in dataList" class="card"  @click="gotoDetail(item)">
				<view>
					<view>{{item.name}}</view>
					<view>总报酬:{{item.payment}}</view>
				</view>
				<view>
					<view>{{item.status}}</view>
					<view>所需人数:{{item.need_people}}</view>
				</view>
			</view>
			<button @click="publishProject">发布项目</button>
		</template>
	</view>
</template>
<script setup>
	import { ref } from 'vue';
	import { onShow } from '@dcloudio/uni-app';
	const db = uniCloud.database();
	let title = ref("") 
	const dataList = ref([])
	const useInfo = ref({})
	// NOTE:千万注意：所有方法后面不能加,;否则方法 相当于没有定义
	onShow(()=>{
		title.value = "三年三月"
		uniCloud.callFunction({
			name:'queryProjectList',
			success:(res) => {
				if(res.result && res.result.data){
					dataList.value = [...res.result.data]
				}
			},
			complete:()=>{
				uni.hideLoading()
			}
		})
		wx.login({
		  success: (res) => {
			uniCloud.callFunction({
			  name:"login",
			  data:{code:res.code},
			  success: (res) => {
				  getApp().globalData.openid = res.result.openid
				  getApp().globalData.useInfo = res.result
				  useInfo.value = res.result
			  }
			})
		  }
		})
	})
	function gotoDetail (item) {
		uni.navigateTo({url:`/pages/detail/detail?_id=${item._id}`});
	}
	function publishProject(){
		uni.navigateTo({url:`/pages/publish/publish`});
	}
	function login(){
		uni.getUserProfile({
			desc:'queryProjectList',
			success:(res) => {
				console.log('res ===',res.userInfo)
				const {nickName,avatarUrl} = res.userInfo
				// 更新
				uniCloud.callFunction({
				  name:"user",
				  data:{openid:getApp().globalData.openid,action:'update',nickname:nickName,avatar:avatarUrl},
				  success: (res) => {
					  console.log('更新成功====')
					  useInfo.value = res.result
					  getApp().globalData.useInfo = res.result
				  }
				})
			},
			fail:(res)=>{
				console.log('res 失败 ===',res)
			}
		})
	}
</script>

<style lang="less">
	.card{
		display: flex;
		justify-content: space-between;
		border: 2px solid #efefef;
		border-radius: 5rpx;
		margin: 10rpx;
		padding: 20rpx 10rpx;
		.card-item{
			
		}
	}

</style>
