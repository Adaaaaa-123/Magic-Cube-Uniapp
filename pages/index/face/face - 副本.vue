<template>
	<view class="container">
		<view class="formBox">
			<u-form :model="modelData" :rules="rules" ref="uForm" labelWidth="100">
				<u-form-item label="选择库" borderBottom @click="showFace = true; hideKeyboard()">
					<u-input disabled disabledColor="#ffffff" placeholder="请选择人脸库"
						border="none" inputAlign="right" v-model="modelData.faceGalleryName"></u-input>
					<u-icon slot="right" name="arrow-right"></u-icon>
				</u-form-item>
				<u-form-item label="姓名" borderBottom>
					<u-input v-model="modelData.name" border="none" inputAlign="right" placeholder="请输入姓名"></u-input>
				</u-form-item>
				<u-form-item label="人脸照片" borderBottom>
					<u-upload @delete="deletePic" @afterRead="afterRead" name="photo"
						:maxCount="1">
					</u-upload>
				</u-form-item>

				<u-form-item label="性别" prop="sex" borderBottom @click="showSex = true; hideKeyboard()">
					<u-input disabled disabledColor="#ffffff" placeholder="请选择性别" border="none"
						inputAlign="right" v-model="modelData.sexName"></u-input>
					<u-icon slot="right" name="arrow-right"></u-icon>
				</u-form-item>
				<u-form-item label="出生日期" borderBottom @click="showDate = true; hideKeyboard()">
					<u-input disabled disabledColor="#ffffff" border="none" inputAlign="right"
						placeholder="请选择日期"></u-input>
					<u-icon slot="right" name="arrow-right"></u-icon>
				</u-form-item>
				<u-form-item label="证件号码" borderBottom>
					<u-input v-model="modelData.IDnumber" border="none" inputAlign="right" placeholder="请输入证件号码"></u-input>
				</u-form-item>
			</u-form>
			<view style="margin-top: 40rpx;">
				<u-button text="人脸搜图" size="normal" type="primary" @click="toVerify"></u-button>
			</view>
		</view>
		<!--性别弹窗-->
		<u-action-sheet :show="showSex" :actions="sexActions" title="请选择性别" closeOnClickOverlay
			:closeOnClickAction="true" @close="showSex = false" @select="sexSelect">
		</u-action-sheet>
		<!--人脸库弹窗-->
		<u-picker :show="showFace" :columns="faceColumns" keyName="name" @confirm="faceConfirm" closeOnClickOverlay
			@cancel="faceClose" @close="faceClose"></u-picker>
		<!--日期弹窗-->
		<u-datetime-picker :show="showDate" v-model="modelData.birthday" mode="datetime" :minDate="minDate"
			:maxDate="maxDate" closeOnClickOverlay>
		</u-datetime-picker>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showSex: false,
				showFace: false,
				showDate: false,
				minDate: "",
				maxDate: "",
				modelData: {
					faceGalleryName: '',
					faceGalleryID: '',
					name: '',
					photo: "",
					sexName: '',
					sexId: '',
					birthday: "",
					IDnumber: "",
				},
				thumbnails: "",
				sexActions: [{
						name: '男',
						id: "1"
					},
					{
						name: '女',
						id: "2"
					},
					{
						name: '未知',
						id: "0"
					},
				],
				faceActions: [],
				rules: {
					'faceGalleryId': {
						type: 'string',
						required: true,
						message: '请选择人脸库',
						trigger: ['blur', 'change']
					},
					'name': {
						type: 'string',
						required: true,
						message: '请填写姓名',
						trigger: ['blur', 'change']
					},
					'photo': {
						type: 'string',
						required: true,
						message: '请上传照片',
						trigger: ['blur', 'change']
					},
					'sexId': {
						type: 'string',
						// max: 1,
						required: true,
						message: '请选择性别',
						trigger: ['blur', 'change']
					},
					'birthday': {
						type: 'string',
						required: true,
						message: '请选择出生日期',
						trigger: ['blur', 'change']
					},
					'IDnumber': {
						type: 'string',
						required: true,
						message: '请输入身份证号码',
						trigger: ['blur', 'change']
					},
				},
				radio: '',
				switchVal: false
			};
		},
		onShow() {
			// this.getFaceGallery()
			let curYear = new Date().getFullYear();
			this.minDate = new Date(curYear - 100 + "-01-01").getTime();
			this.maxDate = new Date().getTime()
		},
		onLoad() {
			this.getFaceGallery()
		},
		methods: {
			//选择性别
			sexSelect(e) {
				console.log(e)
				this.modelData.sexName = e.name
				this.modelData.sexId = e.id
				this.$refs.uForm.validateField('sexId')
			},
			hideKeyboard() {

			},
			//获取人脸库
			getFaceGallery() {
				this.faceColumns = [
					[{
						id: "1",
						name: "1号库"
					}, {
						id: "2",
						name: "2号库"
					}, {
						id: "3",
						name: "3号库"
					}, {
						id: "4",
						name: "4号库"
					}, {
						id: "5",
						name: "5号库"
					}, {
						id: "6",
						name: "6号库"
					}]
				]
			},
			//选择人脸库
			faceConfirm(e) {
				this.showFace = false;
				this.modelData.faceGalleryName = e.value[0].name
				this.modelData.faceGalleryID = e.value[0].id
				this.$refs.uForm.validateField('faceGalleryID')
			},
			//关闭人脸库
			faceClose() {
				this.showFace = false
			},
			// 删除图片
			deletePic(event) {
				// this[`fileList${event.name}`].splice(event.index, 1)
				this.modelData.photo = ""
			},
			// 新增图片
			async afterRead(event) {
				console.log(JSON.stringify(event.file))
				const result = await this.uploadFilePromise(event.file.url)
				this.modelData.photo = event.file.url
			},
			//上传图片
			uploadFilePromise(url) {
				return new Promise((resolve, reject) => {
					// let a = uni.uploadFile({
					// 	url: 'http://192.168.2.21:7001/upload', // 仅为示例，非真实的接口地址
					// 	filePath: url,
					// 	name: 'file',
					// 	formData: {
					// 		user: 'test'
					// 	},
					// 	success: (res) => {
					// 		setTimeout(() => {
					// 			resolve(res.data.data)
					// 		}, 1000)
					// 	}
					// });
					resolve(url)
				})
			},
			//提交
			toVerify() {
				this.$refs.uForm.validate().then(res => {
					console.log(res)
					uni.$u.toast('校验通过')
				}).catch(errors => {
					uni.$u.toast('校验失败')
				})
			}
		},
	};
</script>
<style>
	.formBox {
		padding: 0 15px;
		background: #fff;
	}

	/deep/ .u-upload__wrap {
		justify-content: flex-end;
	}

	/deep/ .u-upload__button {
		margin: 0 !important;
	}
</style>
