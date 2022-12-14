<template name="home">
	<view>
		<scroll-view>
			<!-- <button type="primary" @click="scan3">扫码</button> -->
			<view class="tab-title-box">
				<u-transition :show="show" mode="fade-down">
					<view class="tab-title">
						<text class="tab-title-pt"></text>常用服务
					</view>
				</u-transition>
			</view>
			<view class=" bg-white grid col-3 padding-sm">
				<view class="padding-sm"
					v-for="(item,index) in usList" :key="index" @tap="goPage(item.page)">
					<u-transition :show="show" mode="fade-up" :style="[{transitionDelay: (index)*0.1 + 's'}]">
						<view class="padding radius text-center shadow-blur solid-right ">
							<view class="cu-avatar lg "
								:style="{background: 'url(' + item.icon + ') no-repeat',backgroundSize:'100upx 100upx'}">
								<view class="cu-tag badge" v-if="getTtemDotInfo(item)">{{getTtemDotInfo(item)}}</view>
							</view>
							<view class="text-lg margin-top">{{item.title}}</view>
						</view> 
					</u-transition>
				</view>
			</view>
			<!-- 其他服务 -->
			<!-- 	<view class="cu-bar bg-white solid-bottom margin-top"  :style="[{animation: 'show 0.6s 1'}]">
				<view class="action">
					<text class='cuIcon-title text-yellow'></text>其他服务
				</view>
			</view>
			<view class=" bg-white grid col-3 padding-sm">
				<view class="padding-sm animation-slide-bottom" :style="[{animationDelay: (index + 1)*0.1 + 's'}]" v-for="(item,index) in osList" :key="index">
					<view class="padding radius text-center shadow-blur solid-right ">
						<view class="cu-avatar lg "  :style="{background: 'url(' + item.icon + ') no-repeat',backgroundSize:'100upx 100upx'}"></view>
						<view class="text-lg margin-top">{{item.title}}</view>
					</view>
				</view>
			</view> -->

			<view class="cu-tabbar-height">
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import {
		us,
		os
	} from '../../utils/work.js'
	export default {
		name: 'home',
		props: {
			cur: String,
		},
		data() {
			return {
				usList: us.data,
				// osList: os.data,
				dot: {
					mailHome: false
				},
				show: false
			}
		},
		onShow() {
			this.show = true
		},
		onHide() {
			this.show = false
		},
		methods: {
			scan3() {
				uni.scanCode({
					onlyFromCamera: true,
					success: function(res) {
						console.log('条码类型：' + res.scanType);
						console.log('条码内容：' + res.result);
					}
				});
			},

			goPage(page) {

				uni.navigateTo({
					url: page,
					success: res => {},
					fail: () => {},
					complete: () => {}
				})
			},
			getTtemDotInfo(item) {
				if (item.page === 'annotationList' && this.msgCount > 0) {
					return this.msgCount
				}
				return '';
			}
		}
	}
</script>

<style>
	.line2-icon {
		width: 60px;
		height: 60px;
	}
</style>
