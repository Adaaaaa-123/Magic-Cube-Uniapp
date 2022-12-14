<template>
	<view>
		<view class="tab-title-box">
			<u-transition :show="show" mode="fade-down">
				<view class="tab-title">
					<text class="tab-title-pt orange"></text>告警列表
				</view>
			</u-transition>
		</view>
		<view class="uni-padding-wrap uni-common-mt" :style="[{animation: 'show 0.6s 1'}]">
			<view class="content">
				<uni-list-chat :avatar-circle="true" title="uni-app"
					avatar="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png"
					note="您收到一条新的消息" time="2020-02-02 20:20"></uni-list-chat>
			</view>
		</view>
	</view>
</template>
<script>
	export default {

		data() {
			return {
				ready: false, // 这里用于自主控制loading加载状态，避免异步正在加载数据的空档显示“暂无数据”
				treeData: [{
					id: "000",
					label: '吉林市',
				}],
				username: 'mcu',
				password: '12345678',
				domain_name: '10.106.140.3',
				port: '8031',
				interfaceUrl: '',
				login_result: '',
				nonce: '',
				vedioUrl: '',
				show:false
			}
		},
		onShow() {
			this.show = true
		},
		onHide() {
			this.show = false
		},
		onLoad: function() {
			this.login();
		},
		methods: {
			// uni-app中emit触发的方法只能接受一个参数，所以会回传一个对象，打印对象即可见到其中的内容
			handleNodeClick(obj) {
				console.log('handleNodeClick', obj.data['Longitude']);
				let Longitude = obj.data['Longitude'];
				if (Longitude != undefined) {
					this.getVedio(obj.data);
				}
			},
			getVedio(data) {
				let name = data['label'];
				let CameraId = data['id']

				let req_xml =
					"<?xml version='1.0' encoding='UTF-8' ?><MESSAGE Version='1.0'><CV_HEADER MsgType='MSG_VCU_LIVE_REQ' MsgSeq='1' /><CHANNEL CameraId='" +
					CameraId + "' ImageSize='D1' /></MESSAGE>";
				let req_header = this.commonMethod(this.interfaceUrl);
				var that = this;
				uni.request({
					url: this.interfaceUrl,
					method: 'POST',
					header: {
						'Authorization': req_header
					},
					data: req_xml,
					success: function(res) {
						var xmlDoc = new DOMParser().parseFromString(res.data);
						xmlDoc.getElementsByTagName("RTSP_URL")[0].childNodes[0].nodeValue
						that.vedioUrl = xmlDoc.getElementsByTagName("RTSP_URL")[0].childNodes[0].nodeValue;
						uni.navigateTo({
							url: '/pages/mcu/vedio?textObj=' + encodeURIComponent(that.vedioUrl)
						})
					},
					fail: function(res) {

					}
				})

			},
			handleNodeExpand(obj) {
				console.log('handleNodeExpand', obj.data['Longitude']);
			},
			getSecend(obj) {
				var that = this;
				return new Promise((resolve, reject) => {
					var key = obj.id
					var req_xml =
						"<?xml version='1.0' encoding='UTF-8' ?><MESSAGE Version='1.0'><CV_HEADER MsgType='VISS_MSG_GET_SUBJECT_INFO_REQ' MsgSeq='12345678' /><PAGE_INFO BeginIndex='1' /><QUERY_PROFILE ParentId='" +
						key + "' /></MESSAGE>";
					var req_header = that.commonMethod(that.interfaceUrl);
					uni.request({
						url: that.interfaceUrl,
						method: 'POST',
						header: {
							'Authorization': req_header
						},
						data: req_xml,
						success: function(res) {
							var xmlDoc = new DOMParser().parseFromString(res.data);
							obj.children = [];
							for (var i = 0; i < xmlDoc.getElementsByTagName("SUBJECT").length; i++) {
								var a = {
									id: xmlDoc.getElementsByTagName("SUBJECT")[i].attributes[2]
										.value,
									label: xmlDoc.getElementsByTagName("SUBJECT")[i].attributes[1]
										.value,
								}
								obj.children.push(a)
							}

							let flag = 0;

							obj.children.forEach(e => {
								that.getThred(e)
								flag++;
								if (flag == obj.children.length) {
									setTimeout(e => {
										resolve(true);
									}, 10000)
								}
							})


						},
						fail: function() {

						}
					})
				})


			},
			getThred(obj) {
				var key = obj.id
				var req_xml =
					"<?xml version='1.0' encoding='UTF-8' ?><MESSAGE Version='1.0'><CV_HEADER MsgType='VISS_MSG_GET_SUBJECT_INFO_REQ' MsgSeq='12345678' /><PAGE_INFO BeginIndex='1' /><QUERY_PROFILE ParentId='" +
					key + "' /></MESSAGE>";
				var req_header = this.commonMethod(this.interfaceUrl);
				var that = this
				uni.request({
					url: this.interfaceUrl,
					method: 'POST',
					header: {
						'Authorization': req_header
					},
					data: req_xml,
					success: function(res) {
						var xmlDoc = new DOMParser().parseFromString(res.data);
						obj.children = [];
						for (var i = 0; i < xmlDoc.getElementsByTagName("SUBJECT").length; i++) {
							var a = {
								id: xmlDoc.getElementsByTagName("SUBJECT")[i].attributes[2].value,
								label: xmlDoc.getElementsByTagName("SUBJECT")[i].attributes[1].value,
							}
							obj.children.push(a)
						}
						obj.children.forEach(e => {
							that.getDeviceList(e)
						})
					},
					fail: function() {

					}
				})
			},
			getDeviceList(obj) {
				var key = obj.id
				var req_xml =
					"<?xml version='1.0' encoding='UTF-8' ?><MESSAGE Version='1.0'><CV_HEADER MsgType='VISS_MSG_GET_CAM_INFO_REQ' MsgSeq='12345678' /><PAGE_INFO BeginIndex='1' /><QUERY_PROFILE SubjectId='" +
					key + "'/></MESSAGE>";
				var req_header = this.commonMethod(this.interfaceUrl);
				var that = this
				uni.request({
					url: this.interfaceUrl,
					method: 'POST',
					header: {
						'Authorization': req_header
					},
					data: req_xml,
					success: function(res) {
						var xmlDoc = new DOMParser().parseFromString(res.data);
						obj.children = [];
						for (var i = 0; i < xmlDoc.getElementsByTagName("CAMERA").length; i++) {
							var a = {
								id: xmlDoc.getElementsByTagName("CAMERA")[i].attributes[9].value,
								label: xmlDoc.getElementsByTagName("CAMERA")[i].attributes[10].value,
								Longitude: xmlDoc.getElementsByTagName("CAMERA")[i].attributes[5].value,
								Latitude: xmlDoc.getElementsByTagName("CAMERA")[i].attributes[4].value
							}
							obj.children.push(a)
						}
					},
					fail: function() {

					}
				})
			},
			getVideoUrl(challenge_result) {
				uni.showLoading({
					title: "加载中",
					mask: true
				});

				var index_equalsign_1 = this.find(challenge_result, '=', 0); //第2个等号，下标
				// console.log("------realm--------")
				var index_comma_1 = this.find(challenge_result, ',', 0); //第2个逗号，下标
				var realm = challenge_result.substring(index_equalsign_1 + 2, index_comma_1 - 1);
				// console.log(realm);
				var index_equalsign_2 = this.find(challenge_result, '=', 1); //第2个等号，下标
				// console.log("-------nonce-------")
				var index_comma_2 = this.find(challenge_result, ',', 1); //第2个逗号，下标
				var nonce = challenge_result.substring(index_equalsign_2 + 2, index_comma_2 - 1);
				// console.log(nonce);
				var index_equalsign_3 = this.find(challenge_result, '=', 2); //第2个等号，下标
				// console.log("-------qop-------")
				var index_comma_3 = this.find(challenge_result, ',', 2); //第2个逗号，下标
				var qop = challenge_result.substring(index_equalsign_3 + 2, index_comma_3 - 1);
				// console.log(qop);
				// console.log("-------cnonce-------")
				var cnonce = md5("123");
				// console.log(cnonce);
				var passwd = md5(this.password).toLowerCase();
				// console.log("--------passwd------")
				// console.log(passwd);
				// console.log("--------A1------")
				var A1 = this.username + ':' + realm + ':' + passwd;
				// console.log(A1);
				// console.log("--------md5(A1)------")
				// console.log(md5(A1));
				var A2 = 'POST' + ':' + this.interfaceUrl;
				// console.log("--------A2------")
				// console.log(A2);
				// console.log("--------md5(A2)------")
				// console.log(md5(A2));
				var nc1 = '0x01';
				// console.log(nc1);
				var data = nonce + ':' + nc1 + ':' + cnonce + ':' + qop + ':' + md5(A2);
				// console.log("-------data-------")
				// console.log(data);
				var response = md5(md5(A1) + ':' + data);
				// console.log("-------response-------")
				// console.log(response);
				var algorithm = 'MD5';
				var UserAgent = 'SC-CMCC';
				// console.log("-------headers-------")
				// console.log(
				// `${challenge_result},username="${this.username}",uri="${this.interfaceUrl}",response="${response}",cnonce="${cnonce}",nc="${nc1}",algorithm="${algorithm}"`
				// );
				var that = this;
				uni.request({
					url: this.interfaceUrl,
					method: 'POST',
					header: {
						"Authorization": `${challenge_result},username="${this.username}",uri="${this.interfaceUrl}",response="${response}",cnonce="${cnonce}",nc="${nc1}",algorithm="${algorithm}"`
					},
					success: function(res) {
						that.login_result =
							`${challenge_result},username="${that.username}",uri="${that.interfaceUrl}",response="${response}",cnonce="${cnonce}",nc="${nc1}",algorithm="${algorithm}"`

						let AuthenticationInfo = ""
						// #ifdef H5
						AuthenticationInfo = res.header['authentication-info'];
						// #endif

						// #ifndef H5
						AuthenticationInfo = res.header['Authentication-Info']; //为了兼容小程序及app端必须这样写才有效果
						// #endif

						var index_equalsign_2_2 = that.find(AuthenticationInfo, '=', 1); //第2个等号，下标
						var index_comma_2_2 = that.find(AuthenticationInfo, ',', 1); //第2个逗号，下标
						that.nonce = AuthenticationInfo.substring(index_equalsign_2_2 + 2, index_comma_2_2 -
						1);
						that.getSecend(that.treeData[0]).then(res => {
							that.ready = true
							uni.hideLoading();
						})
					},
					fail: function() {
						uni.hideLoading()
					}
				})
			},
			getAreaInfo() {
				var ParentId = "&lt;ROOT&gt;";
				var req_xml =
					"<?xml version='1.0' encoding='UTF-8' ?><MESSAGE Version='1.0'><CV_HEADER MsgType='VISS_MSG_GET_SUBJECT_INFO_REQ' MsgSeq='12345678' /><PAGE_INFO BeginIndex='1' /><QUERY_PROFILE ParentId='" +
					ParentId + "' /></MESSAGE>";
				console.log(req_xml);
				var req_header = this.commonMethod(this.interfaceUrl);
				console.log(req_header)
				var that = this
				uni.request({
					url: this.interfaceUrl,
					method: 'POST',
					header: {
						'Authorization': req_header
					},
					data: req_xml,
					success: function(res) {
						console.log("========成功返回=======")
						console.log(res.data)
						var xmlDoc = new DOMParser().parseFromString(res.data);
						var a = xmlDoc.getElementsByTagName("SUBJECT")
					},
					fail: function() {}
				})
			},
			commonMethod(com_interface) {
				var login_result = this.login_result; //鉴权成功提交的请求头信息
				var username = this.username; //用户名
				var password = this.password; //密码
				var nonce = this.nonce; //挑战随机数
				var nc = 0; //nonce 计数参数

				var index_equalsign_1 = this.find(login_result, '=', 0); //第1个等号，下标
				var index_comma_1 = this.find(login_result, ',', 0); //第1个逗号，下标
				var realm = login_result.substring(index_equalsign_1 + 2, index_comma_1 - 1);

				var index_equalsign_3 = this.find(login_result, '=', 2); //第3个等号，下标
				var index_comma_3 = this.find(login_result, ',', 2); //第3个逗号，下标
				var qop = login_result.substring(index_equalsign_3 + 2, index_comma_3 - 1);

				var index = this.find(login_result, ',', 3); //第4个等号，下标
				var res_new = login_result.substring(0, index);

				var index_1 = res_new.indexOf(',');
				var con_1 = res_new.substring(0, index_1);
				var index_2 = this.find(res_new, ',', 1); //第2个等号，下标
				var con_2 = res_new.substring(index_2);
				var login_result1 = con_1 + ',nonce="' + nonce + '"' + con_2;
				var cnonce = md5("123");

				var passwd = md5(password).toLowerCase();
				var A1 = username + ':' + realm + ':' + passwd;
				var A2 = 'POST' + ':' + com_interface;
				nc = nc + 1;
				var nc1 = '0x01';
				var data1 = nonce + ':' + nc1 + ':' + cnonce + ':' + qop + ':' + md5(A2);
				var response = md5(md5(A1) + ':' + data1);
				var algorithm = 'MD5';
				var UserAgent = 'SC-CMCC';

				var req_header =
					`${login_result1},username="${username}",uri="${com_interface}",response="${response}",cnonce="${cnonce}",nc="${nc1}",algorithm="${algorithm}"`;
				return req_header;
			},
			find(str, cha, num) {
				var x = str.indexOf(cha);
				for (var i = 0; i < num; i++) {
					x = str.indexOf(cha, x + 1);
				}
				return x;
			},
			login() {
				const com_interface = `http://${this.domain_name}:${this.port}`;
				this.interfaceUrl = com_interface
				const headers = {
					"Content-Type": "application/x-www-form-urlencoded"
				}
				var that = this;
				uni.request({
					url: com_interface,
					method: 'POST',
					header: headers,
					success: function(res) {
						let header = ""
						// #ifdef H5
						header = res.header['www-authenticate'];
						// #endif

						// #ifndef H5
						header = res.header['WWW-Authenticate']; //为了兼容小程序及app端必须这样写才有效果
						// #endif
						that.getVideoUrl(header);
					},
					fail: function(res) {
						console.log(res)
					}
				})
			}
		}
	}
</script>
