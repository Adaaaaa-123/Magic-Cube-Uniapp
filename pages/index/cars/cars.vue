<template>
	<view class="container">
		<view class="formBlock">
			<uni-forms class="formBox" ref="valiForm" :rules="rules" :modelValue="formData" label-width="80px">
				<uni-forms-item label="布控标题" required name="title">
					<uni-easyinput v-model="formData.title" placeholder="请输入布控标题" />
				</uni-forms-item>
				<uni-forms-item label="车牌号码" required name="plateNo">
					<uni-easyinput v-model="formData.plateNo" placeholder="请输入车牌号码" />
				</uni-forms-item>
				<uni-forms-item label="布控等级" required name="level">
					<uni-data-select v-model="formData.level" :localdata="levelsData"></uni-data-select>
				</uni-forms-item>
				<uni-forms-item label="设备列表" required name="devices">
					<!-- <uni-data-picker placeholder="请选择设备" popup-title="请选择设备" :localdata="devicesData"
						v-model="formData.devices">
					</uni-data-picker> -->
				</uni-forms-item>
				<uni-forms-item label="接收用户" required name="users">
					<!-- <uni-data-picker placeholder="请选择设备" popup-title="请选择设备" :localdata="usersData"
						v-model="formData.users">
					</uni-data-picker> -->
				</uni-forms-item>
				<uni-forms-item label="证件号码" required name="IDno">
					<uni-easyinput v-model="formData.IDno" placeholder="证件号码" />
				</uni-forms-item>
				<uni-forms-item label="开始时间" required name="beginTime">
					<uni-datetime-picker type="datetime" :clear-icon="false" v-model="formData.beginTime"
						placeholder="请选择开始时间" @change="(e)=>{changeDate(e,'beginTime')}" />
				</uni-forms-item>
				<uni-forms-item label="结束时间" required name="endTime">
					<uni-datetime-picker type="datetime" :clear-icon="false" v-model="formData.endTime"
						placeholder="请选择结束时间" @change="(e)=>{changeDate(e,'endTime')}" />
				</uni-forms-item>
				<uni-forms-item label="布控原因" required  name="reason">
					<uni-easyinput type="textarea" v-model="formData.reason" placeholder="请输入布控原因" />
				</uni-forms-item>
			</uni-forms>
		</view>
		<view class="formBtn">
			<button type="primary" @click="toVerify">提交</button>
		</view>
	</view>
</template>

<script>
	let that;
	export default {
		data() {
			return {
				showLevel: false,
				formData: {
					title: "",
					plateNo: "",
					level: "",
					IDno: "",
					beginTime: "",
					endTime: "",
					devices: [],
					users: [],
					reason:""
				},
				//布控等级
				levelsData: [{
					text: '黄色',
					value: 0
				}, {
					text: '橙色',
					value: 1
				}, {
					text: '红色',
					value: 2
				}],
				//设备
				devicesData: [],
				// 校验规则
				rules: {
					title: {
						rules: [{
							required: true,
							errorMessage: '请输入布控标题'
						}]
					},
					plateNo: {
						rules: [{
							required: true,
							errorMessage: '请输入车牌号码'
						}, {
							pattern: '^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$',
							errorMessage: "车牌号不合法！"
						}]
					},
					level: {
						rules: [{
							required: true,
							errorMessage: '请选择布控等级'
						}]
					},
					// devices: {
					// 	rules: [{
					// 		validateFunction: function(rule, value, data, callback) {
					// 			if (value.length < 1) {
					// 				callback('请选择设备')
					// 			}
					// 			return true
					// 		}
					// 	}]
					// },
					// users: {
					// 	rules: [{
					// 		validateFunction: function(rule, value, data, callback) {
					// 			if (value.length < 1) {
					// 				callback('请选择接收用户')
					// 			}
					// 			return true
					// 		}
					// 	}]
					// },
					IDno: {
						rules: [{
							required: true,
							errorMessage: '请输入证件号码'
						}, {
							required: true,
							errorMessage: '请输入证件号码'
						}]
					},
					beginTime: {
						rules: [{
							required: true,
							errorMessage: '请选择开始时间'
						}, {
							validateFunction: function(rule, value, data, callback) {
								if (value.length != 19) {
									callback('请正确选择开始时间')
								}
								return true
							}
						}]
					},
					endTime: {
						rules: [{
							required: true,
							errorMessage: '请选择结束时间'
						}, {
							validateFunction: function(rule, value, data, callback) {
								if (value.length != 19) {
									callback('请正确选择结束时间')
								}
								return true
							}
						}]
					},
					reason: {
						rules: [{
							required: true,
							errorMessage: '请输入布控原因'
						}]
					},
				},
			}
		},
		onLoad() {
			that = this;
			this.getDeviceData()
		},
		onShow() {
			// let curDateTime = this.$util.stampToDate(Date.now());
			// this.formData.beginTime = curDateTime.split(" ")[0] + " 00:00:00";
		},
		methods: {
			//选择日期
			changeDate(e, str) {
				setTimeout(() => {
					this.$refs['valiForm'].validateField([str]).then((res) => {}).catch((err) => {})
				}, 200)
			},
			//显示结束弹窗
			showEndDate() {
				console.log(111)
				this.formData.endTime = this.$util.stampToDate(Date.now());
			},
			//验证
			toVerify() {
				this.$refs["valiForm"].validate().then(res => {
					console.log('success', res);
					console.log(this.formData);
					this.toSubmit(res)
				}).catch(err => {
					console.log('err', err);
				})
			},
			//提交
			toSubmit(data) {
				if((this.beginTime)>= (this.endTime)){
					this.$tip.error("结束时间不能早于开始时间！")
					return ;
				};
				const distributionJson = {
					// ApplicantName: this.$store.getters.userid,
					// Ed: this.formData.endDate,
					Et: this.formData.endTime,
					PlateNo: this.formData.plateNo, //车牌号
					Reason: this.formData.reason,
					Sd: this.formData.beginTime,
					St: this.formData.endTime,
					Title: this.formData.title,
					beginTime: this.beginTime.replace("/", "").replace("/", "").replace(":", "").replace(":", ""),
					endTime: this.endTime.replace("/", "").replace("/", "").replace(":", "").replace(":", ""),
					"credentials": this.formData.IDno, //证件编码
					"TollgateList": deviceIds, //设备编号
					"grade": this.formData.grade,
					"PlateClass": "",
					"OperateType": 0,
					"dispositionType": "0",
					"DispositionRange": "1",
					"TollgateList": "",
					"VehicleBrand": "",
					"VehicleClass": "",
					"VehicleColor": "",
					"VehicleModel": "",
					"ApplicantInfo": ""
				}

				const params = {
					distributionJson: JSON.stringify(distributionJson),
					distributionMode: 21,
					shareUserIds: []
				}
				var that = this
				this.$http.post('/mcms/rest/distribution/addObjDistribution', params).then(res => {
					if (res.data.responseStatus.statusCode == "0") {
						that.$tip.success(res.data.responseStatus.message);
						uni.navigateBack({
							delta: 1
						})
					} else {
						that.$tip.error(res.data.responseStatus.message);
					}

				}).catch(() => {
					this.$tip.error('提交失败')
				});

			},
			//获取设备列表
			getDeviceData() {
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
				// uni.showLoading({
				// 	title: "加载中",
				// 	mask: true
				// });
				// if (this.devices.length == 0) {
				// 	this.$util.requestFunc(`/mcms/rest/Devices?pageNumber=1&pageSize=30000&areaId=<ROOT>&lazyload=0&deviceType=21&responseStructure=1&returnFavoriteStatus=1&isSubjectIncludeNoNull=1`,"GET",null,res=>{
				// 		uni.hideLoading();
				// 		this.devicesData = res.data.results
				// 	},()=>{
				// 		uni.hideLoading();
				// 		uni.showToast({
				// 			title:"获取设备失败",
				// 			icon:'none'
				// 		})
				// 	})
				// // 	this.$http.get(
				// // 		``

				// // 						).then(res => {
				// // 		uni.hideLoading();
				// // 		// that.devices = res.data.subjects[0].devices
				// // 		res.data.subjects[0].devices.forEach(e => {
				// // 			e.children = [];
				// // 			e.name = e.nm;

				// // 		})

				// // 		// that.trees[0].children = res.data.subjects[0].devices.slice(0, 31);
				// // 		// that.trees[0].children = res.data.subjects[0].devices;
				// // 		// that.trees[0].name = res.data.subjects[0].name;

				// // 	}).catch(() => {
				// // 		// uni.hideLoading();
				// // 		this.$tip.error('获取设备失败')
				// // 	});

				// }
				this.devicesData = [{
					value: "1",
					text: "设备1"
				}, {
					value: "2",
					text: "设备2"
				}, {
					value: "3",
					text: "设备3"
				}, {
					value: "4",
					text: "设备4"
				}, {
					value: "5",
					text: "设备5"
				}, {
					value: "6",
					text: "设备6"
				}]
			},
			//获取用户
			getUsersData() {
				// this.$util.requestFunc(`/mcms/rest/User/getUserList`,"GET",null,res=>{
				// 	this.usersData = res.data.data;
				// },()=>{
				// 	uni.showToast({
				// 		title:"获取设备失败",
				// 		icon:'none'
				// 	})
				// })
				this.usersData = [{
					value: "1",
					text: "用户1"
				}, {
					value: "2",
					text: "用户2"
				}, {
					value: "3",
					text: "用户3"
				}, {
					value: "4",
					text: "用户4"
				}, {
					value: "5",
					text: "用户5"
				}, {
					value: "6",
					text: "用户6"
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

	.container {
		height: 100%;
		display: flex;
		flex-direction: column;
	}

	uni-page-body {
		height: 100%;
	}

	.formBlock {
		flex: 1;
		overflow-y: auto;
	}
</style>
