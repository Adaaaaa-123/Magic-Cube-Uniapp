<template>
	<view class="content">
		<view class="sea">
			<span class="wave"></span>
			<span class="wave"></span>
			<span class="wave"></span>
			<view class="logoBox">
				<view class="logo">
					<image src="../../static/image/mofang.png"></image>
				</view>
				<text class="appName">{{appName}}</text>
			</view>
		</view> 
		<view class="loginForm">
			<form @submit="submitForm">
				<view class="loginList">
					<text class="iconfont icon-user"></text>
					<input class="loginInput" placeholder="请输入账号" name="username" v-model="formData.username">
				</view>
				<view class="loginList">
					<text class="iconfont icon-lock"></text>
					<input class="loginInput" :type="pwdFlag?'password':'text'" placeholder="请输入密码" name="password"
						v-model="formData.password">
					<text class="iconfont" :class="pwdFlag?'icon-eye-slash':'icon-eye'" @click="toggleType"></text>
				</view>
				<button class="commonBtn" type="primary" form-type='submit'>登 录</button>
			</form>
			<view style="display: flex;align-items: center;justify-content: center;">
				<text class="queryBtn" @click="toRetrieve">忘记密码</text>
				<text
					style="width: 2px;height: 30rpx;background: linear-gradient(to bottom, #4948ff, #4396ff);margin: 40rpx 40rpx;"></text>
				<text class="queryBtn" @click="toSignup">快速注册</text>
			</view>
		</view>
	</view>
</template>

<script>
	import { setToken } from "@/utils/auth.js";
	import "./login.css"
	const app = getApp();
	var that = null;
	export default {
		data() {
			return {
				pwdFlag: true,
				cfg: {},
				formData: {
					username: "",
					password: ""
				},
				appName:"",
				requesting: false,//提交狀態
			}
		},
		onShow() {
			that = this;
			let loginInfo = uni.getStorageSync("toWin");
			if(loginInfo.username && loginInfo.password){
				that.toLogin(loginInfo.username, loginInfo.password);
			}
			that.getAppInfo()
		},
		methods: {
			getAppInfo(){
				uni.request({
					url:app.globalData.requestUrl + "anon/company",
					method:"GET",
					data:null,
					success(res) {
						if(res.data.success){
							that.appName = res.data.data.companyName;
							uni.setNavigationBarTitle({
								title:res.data.data.companyName
							})
						}
					}
				})
			},
			//密码显示隐藏
			toggleType() {
				that.pwdFlag = !that.pwdFlag
			},
			//提交表单
			submitForm(e) {
				if(that.requesting){
					return false
				}
				let username = that.formData.username;
				let password = that.formData.password;
				if (!username) {
					uni.showToast({
						title: "请输入账号",
						icon: "none"
					})
					return false;
				}
				if (!password) {
					uni.showToast({
						title: "请输入密码",
						icon: "none"
					})
					return false;
				}
				// that.toLogin(username, that.$md5(password));
				that.toLogin();
			},
			
			//登录
			toLogin(username, password) {
				that.requesting = true;
				uni.request({
					url: app.globalData.requestUrl + 'login',
					method: "POST",
					data: {
						username,
						password
					},
					success: (res) => {
						if (res.data.success) {
							//保存header
							app.globalData.header = {
								"Content-Type": "application/json;charse=UTF-8",
								"PRIVATETOKEN": res.data.data.PRIVATETOKEN
							}
							//重新查询App个人信息		
							uni.request({
								url: app.globalData.requestUrl + 'appUserMe',
								method: "GET",
								header: app.globalData.header,
								success: (res) => {
									if (res.data.success) {
										app.globalData.userInfo = res.data.data;
										//保存账号和密碼
										uni.setStorageSync("toWin",{
											username:res.data.data.email,
											password
										})
										//跳转行情
										uni.switchTab({
											url: '../market/market'
										});
									} else {
										that.$util.requestError(res.data.errorMessage,res.data.errorCode,true)
										that.requesting = false;
									}
								}
							});
						} else {
							that.requesting = false;
							that.$util.requestError(res.data.errorMessage,res.data.errorCode,true)
						}
					}
				});
			},
			//忘记密码
			toLogin(){
				setToken("token")
				uni.redirectTo({
					url: '/pages/index/index'
				});
			},
			toRetrieve() {
				// uni.navigateTo({
				// 	url: '../password/password?title=retrieve',
				// });
			},
			//注册
			toSignup() {
				// uni.navigateTo({
				// 	url: '../signup/signup',
				// });
			}
		}
	}
</script>

<style>
</style>
