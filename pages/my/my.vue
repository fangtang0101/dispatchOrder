<template>
	<view class="content">
	我的
	</view>
</template>
<script setup>
	import { ref } from 'vue';
	import { onShow } from '@dcloudio/uni-app';
	const db = uniCloud.database();
	let title = ref("")
	// NOTE:千万注意：所有方法后面不能加,;否则方法 相当于没有定义
	// 问题：1.如何设置字段的值不重复
	onShow(()=>{
		title.value = "三年三月"
	})
	
	function publishProject(){
		const data = {name:`测试信息${ Math.random()}`,payment:200,registration_deadline:1234331,desc:'测试描述 ...',status:'报名中',need_people:45}
		data.job_list = [{
			position:'xxx',
			payment:10,
			need_skill_list:["nodesssss"],
			need_people:50,
		} ]
		uniCloud.callFunction({
			name:'publishProject',
			data,
			success:(res) => {
				console.log(' 返回结果 === ',res)
			},
			complete:(res)=>{
				console.log(' complete === ',res)
				uni.hideLoading()
			}
		})
	}
	
	function updateRegistration(){
		const data = {job_id:'631f095033d8bd0001606323',user_id:'631ede5e1e2b9d00014d282c',role:'队长',info:`本人项目经验丰富${ Math.random()}`}
		uniCloud.callFunction({
			name:'updateRegistration',
			data,
			success:(res) => {
				console.log(' 返回结果 === ',res)
			},
			complete:(res)=>{
				console.log(' complete === ',res)
				uni.hideLoading()
			}
		})
	}
	
	function checkProject(){
		const data = {table:'project',action:'check'}
		uniCloud.callFunction({
			name:'queryProjectList',
			data,
			success:(res) => {
				console.log(' 返回结果 === ',res)
			},
			complete:(res)=>{
				console.log(' complete === ',res)
				uni.hideLoading()
			}
		})
	}
	
	function checkProjectDetail(){
		const data = {_id:'631f0f0b5d652b0001f324b5'}
		uniCloud.callFunction({
			name:'queryProjectDetail',
			data,
			success:(res) => {
				console.log(' 返回结果 === ',res)
			},
			complete:(res)=>{
				console.log(' complete === ',res)
				uni.hideLoading()
			}
		})
	}
	
	
	
	function addUser(){
		const data = {table:'user',action:'add',username:'方xx',nickname:"三年三月",gender:1,openid:'123456'}
		uniCloud.callFunction({
			name:'dict',
			data,
			success:(res) => {
				console.log(' 返回结果 === ',res)
			},
			complete:(res)=>{
				console.log(' complete === ',res)
				uni.hideLoading()
			}
		})
	}
	function addRegistration(){
		const data = {table:'registration',action:'add',user_id:'631ede5e1e2b9d00014d282c',role:"队员",info:'我能胜任....'}
		uniCloud.callFunction({
			name:'dict',
			data,
			success:(res) => {
				console.log(' 返回结果 === ',res)
			},
			complete:(res)=>{
				console.log(' complete === ',res)
				uni.hideLoading()
			}
		})
	}
	function addJob(){
		const data = {table:'job',action:'add',position:"前端",payment:100,need_skill_list:['Node','uni-app'],need_people:20,registration_info:['631edf58df92af0001e453d0']}
		uniCloud.callFunction({
			name:'dict',
			data,
			success:(res) => {
				console.log(' 返回结果 === ',res)
			},
			complete:(res)=>{
				console.log(' complete === ',res)
				uni.hideLoading()
			}
		})
	}
	function addProject(){
		const data = {table:'project',action:'add',name:"测试项目",payment:1000,registration_deadline:1662979541058,need_people:200,desc:"这是一个很简单的项目，包括管理后台，小程序...",job_list:["631f095033d8bd0001606323"],status:'报名中'}
		uniCloud.callFunction({
			name:'dict',
			data,
			success:(res) => {
				console.log(' 返回结果 === ',res)
			},
			complete:(res)=>{
				console.log(' complete === ',res)
				uni.hideLoading()
			}
		})
	}
	function addBaseInfo(){
		// 初始化 skill
		// 初始化 项目状态表
		// 初始化用户状态表
		// 初始化  job-position
		let baseInfoList = [
			{
				table:"skill",
				action:"add",
				infoList: ['Node','uni-app','uniClound','three.js','PHP','Go','Python','iOS','Android']
			},
			{
				table:"project-status",
				action:"add",
				infoList: ['报名中','报名结束','项目进行中','项目结束']
			},
			{
				table:"user-status",
				action:"add",
				infoList: ['做单中','拒绝接单','空闲中']
			},
			{
				table:"job-position",
				action:"add",
				infoList: ['前端','后端','项目经理'],
			},
			{
				table:"registration-role",
				action:"add",
				infoList: ['队长','队员'],
			},
		]
		for(const item of baseInfoList){
			for(const val of item.infoList){
				uni.showLoading({title: '正在加载...'});
				uniCloud.callFunction({
					name:'dict',
					data:{name:val,action:item.action,table:item.table},
					success:(res) => {
						console.log(' 返回结果 === ',res)
					},
					complete:(res)=>{
						console.log(' complete === ',res)
						uni.hideLoading()
					}
				})
			}
		}
	}

	function addresume(){
		db.collection("resume").add({
			"name": "1",
			"birth_year": 1949,
			"tel": "1",
			"email": "1"
		}).then((res) => {
			// res 为数据库查询结果
			console.log(res)
		}).catch((err) => {
			console.log(err.message)
		});
	}
	function login(){
		// db.collection("user").add({
		// 	"openid":"a",
		// 	"name": "1",
		// 	"birth_year": 1949,
		// 	"tel": "1",
		// 	"email": "1"
		// }).then((res) => {
		// 	// res 为数据库查询结果
		// 	console.log(res)
		// }).catch((err) => {
		// 	console.log(err.message)
		// });
		// return
		console.log('login ====')
		let data = {openid:'cc',status:'abc',action:'login'}
		uni.showLoading({title: '正在加载...'});
		uniCloud.callFunction({
			name:'user',
			data,
			success:(res) => {
				console.log(' 返回结果 === ',res)
			},
			complete:(res)=>{
				console.log(' complete === ',res)
				uni.hideLoading()
			}
		})
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
