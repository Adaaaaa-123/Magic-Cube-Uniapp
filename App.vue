<script>
	export default {
		onLaunch: function() {
			console.warn('当前组件仅支持 uni_modules 目录结构 ，请升级 HBuilderX 到 3.1.0 版本以上！')
			console.log('App Launch')
			console.log('App Launch')
			uni.navigateTo({
				url: '/pages/login/login',
				success: res => {},
				fail: () => {},
				complete: () => {}
			})
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "@/uni_modules/uview-ui/index.scss";
	/*每个页面公共css */
	@import '@/uni_modules/uni-scss/index.scss';
	/* #ifndef APP-NVUE */
	@import '@/static/customicons.css';
	// 设置整个项目的背景色
	page {
		background-color: #f5f5f5;
	}

	/* #endif */
	.example-info {
		font-size: 14px;
		color: #333;
		padding: 10px;
	}
	.formBox {
		padding: 15px;
		background-color: #fff;
	}
	.formBtn{
		padding: 15px;
	}
	
	.formBtn uni-button {
	    border-radius: 100px;
	    height: 40px;
	    line-height: 40px;
	    background-color: #2979ff;
	    color: #fff;
	    font-size: 16px;
	    letter-spacing: 2px;
	}
	/deep/ .u-navbar__content{
		background-color: unset !important;
		background: linear-gradient(45deg, #ec008c, #6739b6) !important;
		
		.u-navbar__content__left .uicon-arrow-left{
			color: #fff !important;
		}
		
		.u-navbar__content__title{
			color: #fff !important;
		}
		
		.u-navbar__content__right .u-navbar__content__right__text{
			color: #fff !important;
		}
	}
	
	.tab-title-box{
		height: 50px;
		border-bottom: 1px solid rgba(0,0,0,0.1);
		
		.tab-title{
			height: 49px;
			font-size: 16px;
			display: flex;
			align-items: center;
			padding: 0 8px;
		}
		
		.tab-title-pt{
			width: 8px;
			height: 8px;
			display: inline-block;
			border-radius: 100%;
			background: #2979ff;
			margin: 0 8px;
			
			&.orange{
				background: orange;
			}
		}
	}
	// /deep/ .u-navbar__content__left .uicon-arrow-left{
	// 	color: #fff !important;
	// }
	// /deep/ .u-navbar__content__title{
	// 	color: #fff !important;
	// }
	// .u-navbar__content__right .u-navbar__content__right__text{
	// 	color: #fff !important;
	// }
</style>
