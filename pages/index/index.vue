<template>
	<view class="container">
		<!-- <navigation-bar :title=""/> -->
		<navigator url="/pages/index/face/face" hover-class="navigator-hover">
			<button type="default">人脸布控</button>
		</navigator>
		<navigator url="/pages/index/cars/cars" hover-class="other-navigator-hover">
			<button type="default">车辆布控</button>
		</navigator>
		<navigator url="/pages/index/wifi/wifi" hover-class="other-navigator-hover">
			<button type="default">wifi布控</button>
		</navigator>
		<navigator url="/pages/index/elec/elec" hover-class="other-navigator-hover">
			<button type="default">电子围栏</button>
		</navigator>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				href: 'https://uniapp.dcloud.io/component/README?id=uniui',
				dataTree: [{
						text: "一年级",
						value: "1-0",
					},
					{
						text: "二年级",
						value: "2-0",
					},
					{
						text: "三年级",
						value: "3-0",
						disable: true
					}
				],
			}
		},
		methods: {

		}
	}
</script>

<style>
	.container {
		padding: 20px;
		font-size: 14px;
		line-height: 24px;
	}
</style>
