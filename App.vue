<script>
	export default {
		onLaunch: function() {
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

<style>
	/*每个页面公共css */
</style>
