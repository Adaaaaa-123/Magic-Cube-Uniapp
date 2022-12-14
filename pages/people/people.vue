<template>
	<view class="container">
		<view class="header">
			<view class="avatarBox">

			</view>
			<u-image src="/static/wave.gif" mode="aspectFill" class="wave" width="750rpx" height="100rpx"></u-image>
			<view class="info">
				<view class="info-item left">
					<view class="info-top" style="color:#f37b1d">{{personalInfo.username}}</view>
					<view class="info-bottom">
						<text class="iconfont icon-user"></text>用户
					</view>
				</view>
				<view class="info-item">
					<view class="info-top" style="color: #39b54a;">{{personalInfo.post}}</view>
					<view class="info-bottom">
						<text class="iconfont icon-api"></text>职务
					</view>
				</view>
			</view>
		</view>
		<!-- 列表list-->
		<u-transition :show="show" mode="slide-up">
			<view class="list">
				<u-cell-group>
					<u-cell icon="setting-fill" :iconStyle="{color:'#39b54a'}" title="设置" isLink
						url="/pages/mine/mineInfo">
					</u-cell>
					<u-cell isLink>
						<view slot="title" class="u-slot-title">
							<text class="iconfont icon-logout"
								style="color:#39b54a;margin-right: 4px;font-size: 18px;"></text>
							<text class="u-cell-text">退出</text>
						</view>
					</u-cell>
				</u-cell-group>
			</view>
		</u-transition>
	</view>
</template>

<script>
	export default {
		name: "people",
		data() {
			return {
				personalInfo: {
					avatar: '',
					realname: '',
					username: '张三',
					post: '经理'
				},
				positionUrl: '/sys/position/list',
				departUrl: '/sys/user/userDepartList',
				userUrl: '/sys/user/queryById',
				userId: '',
				id: '',
				show: false
			};
		},
		onShow() {
			console.log('show')
			this.show = true
		},
		onHide() {
			console.log('hide')
			this.show = false
		},
		watch: {
			cur: {
				immediate: true,
				handler() {
					console.log('watch', this.cur)
					// this.load()
				},
			},
		},
		methods: {
			remove() {
				uni.removeStorageSync('Access-Token')
			},
			// load(){
			// 	this.$http.get(this.userUrl,{params:{id:this.$store.getters.userid}}).then(res=>{
			// 		console.log("res",res)
			// 		 if (res.data.success) {
			// 			let perArr = res.data.result
			// 	        let avatar=(perArr.avatar && perArr.avatar.length > 0)? api.getFileAccessHttpUrl(perArr.avatar):'/static/avatar_boy.png'
			// 			this.personalList.avatar =avatar
			// 			this.personalList.realname = perArr.realname
			// 			this.personalList.username = perArr.username
			// 			this.personalList.post = perArr.post
			// 			this.personalList.depart = perArr.departIds
			// 		}
			// 	}).catch(err => {
			// 		console.log(err);
			// 	});

			// }		
		}
	}
</script>

<style lang="scss">
	.container {
		background-color: #f8f8f8;
		height: 100%;
	}

	.header {
		padding-top: 100rpx;
	}

	.wave {
		mix-blend-mode: screen;
	}

	.avatarBox {
		width: 200rpx;
		height: 200rpx;
		margin: 0 auto;
		border: 2px solid #2979ff;
		border-radius: 100%;
	}

	.info {
		display: flex;
		background: #fff;
		box-shadow: 0 4px 5px rgba(0, 0, 0, 0.1);
		position: relative;

		&-item {
			flex: 1;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			padding: 30rpx 0;
			position: relative;
			z-index: 1;
			background: #fff;
			
			&.left::after{
				content: "";
				width: 0px;
				position: absolute;
				display: block;
				border-right: 1px solid rgba(0, 0, 0, 0.1);
				right: 0;
				top: 15px;
				bottom: 15px;
				margin: auto;
			}
		}

		&-top {
			font-size: 18px;
		}

		&-bottom {
			font-size: 14px;
			margin-top: 10px;
			color: #8799a3;
			display: flex;
			align-items: center;
		}

		&:before,
		&:after {
			position: absolute;
			content: "";
			top: 10px;
			bottom: 15px;
			left: 10px;
			width: 50%;
			box-shadow: 0 15px 10px rgba(0, 0, 0, 0.2);
			-webkit-transform: rotate(-3deg);
			transform: rotate(-3deg);
			z-index: 0;
		}

		&:after {
			right: 10px;
			left: auto;
			-webkit-transform: rotate(3deg);
			transform: rotate(3deg);
		}
	}

	.list {
		background: #fff;
		margin: 40rpx 30rpx;
		box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
		border-radius: 10px;
	}
</style>
