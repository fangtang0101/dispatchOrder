<template>
	<view class="content">
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
