<template>
	<view class="container">
		<uni-list>
			<uni-list-item title="头像" class="avatarItem">
				<template v-slot:footer>
					<u-avatar :src="personalMsg.avatar"></u-avatar>
				</template>
			</uni-list-item>
			<uni-list-item title="姓名" :rightText="personalMsg.realname" />
			<uni-list-item title="性别" :rightText="personalMsg.sex==2?'男':'女'" />
			<uni-list-item title="生日" :rightText="personalMsg.birthday" />
			<uni-list-item title="对外信息展示" :rightText="personalMsg.realname+'@'+personalMsg.orgCode" />
			<uni-list-item title="所在部门" :rightText="personalMsg.orgCode" />
			<uni-list-item title="工号" :rightText="personalMsg.workNo" />
			<uni-list-item title="状态" :rightText="personalMsg.status" />
			<uni-list-item title="手机" :rightText="personalMsg.phone" />
			<uni-list-item title="邮箱" :rightText="personalMsg.email" />
			<uni-list-item title="职务" :rightText="personalMsg.post" />
			<uni-list-item title="身份" :rightText="personalMsg.identity" />
			<uni-list-item title="负责部门"  v-if="personalMsg.identity =='上级'" :rightText="personalMsg.departIds" />
		</uni-list>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				personalMsg:{
					// avatar: 'http://pic2.sc.chinaz.com/Files/pic/pic9/202002/hpic2119_s.jpg',
					avatar: '',
					realname: '张三',
					username: '',
					sex: 1,
					birthday: "1986-01-11",
					orgCode: '行政',
					workNo: '001',
					status: "1",
					phone: '13888888888',
					telephone: '13888888888',
					email: '13888888888@126.com',
					post: '职员',
					departIds: '',
					identity: '职员',
				},
				userUrl:'/sys/user/queryById',
				positionUrl:'/sys/position/list',
				departUrl:'/sys/user/userDepartList'
			}
		},
		onNavigationBarButtonTap() {
			console.log(1111)
			uni.navigateTo({
				url:"/pages/mine/mineForm"
			})
		},
		onLoad() {
			this.getInfo()
		},
		methods:{
			getInfo(){
				// this.$util.requestFunc(this.userUrl,"GET",{
				// },res=>{
				// 	uni.hideLoading();
				// 	this.faceData = res.data.results
				// },()=>{
				// 	uni.hideLoading();
				// 	uni.showToast({
				// 		title:"获取人脸库失败",
				// 		icon:'none'
				// 	})
				// })
				// this.$http.get(this.userUrl,{params:{id:this.$store.getters.userid}}).then(res=> {
				// 	console.log("用户",res)
				// 	if (res.data.success) {
				// 		let result = res.data.result
				// 		if(result.avatar&&result.avatar.length >0)
				// 		this.personalMsg.avatar = api.getFileAccessHttpUrl(result.avatar)
				// 		this.personalMsg.realname = result.realname
				// 		this.personalMsg.username= result.username
				// 		this.personalMsg.post = result.post
				// 		this.personalMsg.sex = result.sex===1?'男':'女'
				// 		this.personalMsg.birthday = result.birthday== null?'无':result.birthday
				// 		this.personalMsg.departIds= result.departIds
				// 		this.personalMsg.workNo= result.workNo
				// 		this.personalMsg.phone= result.phone
				// 		this.personalMsg.telephone= result.telephone== null?'无':result.telephone
				// 		this.personalMsg.email= result.email
				// 		this.personalMsg.post= result.post
				// 		this.personalMsg.identity= result.identity=== 1?'普通成员':'上级'
				// 		this.personalMsg.status= result.status === 1?'正常':'冻结'
				// 		this.personalMsg.orgCode= result.orgCode
				// 	}
				// }).catch(e=>{
				// 	console.log("请求错误",e)
				// })
				
				// this.$http.get(this.departUrl,{params:{userId:this.$store.getters.userid}}).then(res=> {
				// 	if (res.success) {
				// 		for (let item of res.result){
				// 			this.personalMsg.orgCode = item.title
				// 			this.personalMsg.departIds = item.title
				// 		}
				// 	}
				// }).catch(e=>{
				// 	console.log("请求错误",e)
				// })
				
				// this.$http.get(this.positionUrl).then(res=> {
				// 	if (res.success) {
				// 		let postArr = res.result.records
				// 		for (let item of postArr ){
				// 			if (this.personalMsg.post == item.code){
				// 				this.personalMsg.post = item.name
				// 			}
				// 		}
				// 	}
				// }).catch(e=>{
				// 	console.log("请求错误",e)
				// })
			}
		}
	}
</script>

<style>
	@import url("mine.css");
</style>
