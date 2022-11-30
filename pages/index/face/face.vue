<template>
	<view class="container">
		<view class="formBlock">
			<uni-forms class="formBox" ref="valiForm" :rules="rules" :modelValue="formData" label-width="80px">
				<uni-forms-item label="人脸库" required name="face">
					<uni-data-picker placeholder="请选择人脸库" popup-title="请选择人脸库" :localdata="faceData"
						v-model="formData.face">
					</uni-data-picker>
				</uni-forms-item>
				<uni-forms-item label="姓名" required name="name">
					<uni-easyinput v-model="formData.name" placeholder="请输入姓名" />
				</uni-forms-item>
				<uni-forms-item label="人脸照片" required name="photo">
					<u-upload previewFullImage :fileList="formData.photo" @delete="deletePic" @afterRead="afterRead"
						:maxCount="1"></u-upload>
				</uni-forms-item>

				<uni-forms-item class="checkboxItem" label="性别" required name="sex">
					<uni-data-checkbox v-model="formData.sex" :localdata="sexData" />
				</uni-forms-item>
				<uni-forms-item label="出生日期" name="birthday">
					<uni-datetime-picker type="date" :clear-icon="false" v-model="formData.birthday" />
				</uni-forms-item>
				<uni-forms-item label="证件号码" name="IDno">
					<uni-easyinput v-model="formData.IDno" placeholder="证件号码" />
				</uni-forms-item>
			</uni-forms>
		</view>
		<view class="formBtn">
			<button type="primary" @click="toVerify('valiForm')">提交</button>
		</view>
	</view>
</template>

<script>
	let that;
	export default {
		data() {
			return {
				formData: {
					face: '',
					name: '',
					photo: [],
					sex: 0,
					birthday: "",
					IDno: ""
				},
				base64: "",
				//性别
				sexData: [{
					text: '男',
					value: 0
				}, {
					text: '女',
					value: 1
				}, {
					text: '保密',
					value: 2
				}],
				//人脸库
				faceData: [],
				// 校验规则
				rules: {
					face: {
						rules: [{
							required: true,
							errorMessage: '请选择人脸库'
						}]
					},
					name: {
						rules: [{
							required: true,
							errorMessage: '请输入姓名'
						}]
					},
					photo: {
						rules: [{
							validateFunction: function(rule, value, data, callback) {
								if (value.length < 1) {
									callback('请上传人脸照片')
								}
								return true
							}
						}]
					},
					birthday: {
						rules: [{
							required: true,
							errorMessage: '请选择出生日期'
						}]
					},
					IDno: {
						rules: [{
							required: true,
							errorMessage: '请输入证件号码'
						}]
					},
				},
			}
		},
		onLoad() {
			that = this;
			this.getFaceData()
		},
		methods: {
			//验证
			toVerify(ref) {
				this.$refs[ref].validate().then(res => {
					console.log('success', res);
					console.log(this.formData);
					this.toSubmit(res)
				}).catch(err => {
					console.log('err', err);
				})
			},
			//提交
			toSubmit(data) {
				let params = {
					imageDatas: [{
						base64Binary: that.base64.replace(/^data:.*;base64,/, ''),
						person: {
							birthday: data.birthday,
							genderCode: data.sex,
							idNumber: data.IDno,
							name: data.name
						}
					}],
					libraryId: data.face
				}

				// this.$util.requestFunc(`/ftas/rest/face/library/${params.libraryId}/image/batch`, "POST", params, res => {
				// 	if (res.data.responseStatus.statusCode == "0") {
				// 		uni.showToast({
				// 			title:res.data.responseStatus.message,
				// 			icon:'none'
				// 		})
				// 		uni.navigateBack({
				// 			delta: 1
				// 		})
				// 	} else {
				// 		uni.showToast({
				// 			title:'操作失败',
				// 			icon:'none'
				// 		})
				// 	}
				// },()=>{
				// 	uni.showToast({
				// 		title:'操作失败',
				// 		icon:'none'
				// 	})
				// })

				// this.$http.post(`/ftas/rest/face/library/${this.myFormData.face.dataId}/image/batch`, params).then(res => {
				// 	if (res.data.responseStatus.statusCode == "0") {
				// 		that.$tip.success(res.data.responseStatus.message);
				// 		uni.navigateBack({
				// 			delta: 1
				// 		})
				// 	} else {
				// 		this.$tip.error('操作失败')
				// 	}
				// }).catch(() => {
				// 	this.$tip.error('操作失败')
				// });
			},
			//获取人脸库
			getFaceData() {
				// uni.showLoading({
				// 	title: "加载中",
				// 	mask: true
				// });
				// this.$util.requestFunc(`/mcms/rest/facelibrary/list`,"GET",{
				// 	albumType: 2
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
				this.faceData = [{
					value: "1",
					text: "1号库"
				}, {
					value: "2",
					text: "2号库"
				}, {
					value: "3",
					text: "3号库"
				}, {
					value: "4",
					text: "4号库"
				}, {
					value: "5",
					text: "5号库"
				}, {
					value: "6",
					text: "6号库"
				}]
			},
			// 删除图片
			deletePic(event) {
				// this[`fileList${event.name}`].splice(event.index, 1)
				this.formData.photo = []
			},
			// 新增图片
			async afterRead(event) {
				console.log(JSON.stringify(event.file))
				const result = await this.uploadFilePromise(event.file.url)
				this.formData.photo = [event.file.url]
			},
			//上传图片
			uploadFilePromise(path) {
				let that = this;
				return new Promise((resolve, reject) => {
					// uni.uploadFile({
					// 	url: configService.apiUrl + '/mcms/rest/distribution/getBase64Image',
					// 	filePath: path,
					// 	name: 'file',
					// 	header: {
					// 		'authorization': "Bearer " + uni.getStorageSync('authorization')
					// 	},
					// 	success: (res) => {
					// 		that.base64 = res.data
					// 	},
					// 	fail: (res) => {
					// 		this.$tip.error('文件转base64失败')
					// 	}
					// });
					resolve(path)
				})
			},
		}
	}
</script>

<style lang="scss">
	/deep/ .checkboxItem .uni-forms-item__content {
		display: flex;
		align-items: center;
	}

	/deep/ .u-upload__button {
		margin: 0 !important;
	}
	
	.container{
		height: 100%;
		display: flex;
		flex-direction: column;
	}
	uni-page-body{
		height: 100%;
	}
	.formBlock{
		flex: 1;
		overflow-y: auto;
	}
</style>
