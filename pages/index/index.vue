<template name="home">
	<view>
		<scroll-view>
			<!-- 常用服务 -->
			<view class="cu-bar bg-white solid-bottom" :style="[{animation: 'show 0.6s 1'}]">
				<view class="action">
					<text class='cuIcon-title text-blue'></text>常用服务
				</view>
			</view>
			<view class=" bg-white grid col-3 padding-sm">
				<view class="padding-sm animation-slide-bottom" :style="[{animationDelay: (index + 1)*0.1 + 's'}]" v-for="(item,index) in usList"
				 :key="index" @tap="goPage(item.page)">
					<view class="padding radius text-center shadow-blur solid-right ">
						<view class="cu-avatar lg " :style="{background: 'url(' + item.icon + ') no-repeat',backgroundSize:'100upx 100upx'}">
							<view class="cu-tag badge" v-if="getTtemDotInfo(item)">{{getTtemDotInfo(item)}}</view>
						</view>
						<view class="text-lg margin-top">{{item.title}}</view>
					</view>
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
				}
			}
		},
		methods: {
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
