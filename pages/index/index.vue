<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view class="text-area">
			<button class="commonBtn" type="primary" @click="handleClick('navigateTo')">navigateTo</button><br/>
			<button class="commonBtn" type="primary" @click="handleClick('redirectTo')">redirectTo</button><br/>
			<button class="commonBtn" type="primary" @click="handleClick('reLaunch')">reLaunch</button><br/>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {

		},
		methods: {
			handleClick(name){
				console.log(name)
				uni[name]({
					url:"/pages/index/index"
				})
			}
		}
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
