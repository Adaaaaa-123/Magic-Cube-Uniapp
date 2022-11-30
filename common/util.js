// import CryptoJS from "crypto-js";
// // 十六位十六进制数作为密钥
// const SECRET_KEY = CryptoJS.enc.Utf8.parse("9999999999991234");
// // 十六位十六进制数作为密钥偏移量
// const SECRET_IV = CryptoJS.enc.Utf8.parse("qqqqqqqqqqqqqqqq");
/**
 * 加密方法
 * @param data
 * @returns {string}
 */
function encrypt(data) {
	if (typeof data === "object") {
		try {
			// eslint-disable-next-line no-param-reassign
			data = JSON.stringify(data);
		} catch (error) {
			console.log("encrypt error:", error);
		}
	}
	const dataHex = CryptoJS.enc.Utf8.parse(data);
	const encrypted = CryptoJS.AES.encrypt(dataHex, SECRET_KEY, {
		iv: SECRET_IV,
		mode: CryptoJS.mode.ECB,
		padding: CryptoJS.pad.Pkcs7
	});
	return encrypted.ciphertext.toString();
}

/**
 * 解密方法
 * @param data
 * @returns {string}
 */
function decrypt(data) {
	const encryptedHexStr = CryptoJS.enc.Hex.parse(data);
	const str = CryptoJS.enc.Base64.stringify(encryptedHexStr);
	const decrypt = CryptoJS.AES.decrypt(str, SECRET_KEY, {
		iv: SECRET_IV,
		mode: CryptoJS.mode.ECB,
		padding: CryptoJS.pad.Pkcs7
	});
	const decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
	return decryptedStr.toString();
}
//格式化时间
function formatTime(time) {
	if (typeof time !== 'number' || time < 0) {
		return time
	}

	var hour = parseInt(time / 3600)
	time = time % 3600
	var minute = parseInt(time / 60)
	time = time % 60
	var second = time

	return ([hour, minute, second]).map(function(n) {
		n = n.toString()
		return n[1] ? n : '0' + n
	}).join(':')
}

function formatLocation(longitude, latitude) {
	if (typeof longitude === 'string' && typeof latitude === 'string') {
		longitude = parseFloat(longitude)
		latitude = parseFloat(latitude)
	}

	longitude = longitude.toFixed(2)
	latitude = latitude.toFixed(2)

	return {
		longitude: longitude.toString().split('.'),
		latitude: latitude.toString().split('.')
	}
}
var dateUtils = {
	UNITS: {
		'年': 31557600000,
		'月': 2629800000,
		'天': 86400000,
		'小时': 3600000,
		'分钟': 60000,
		'秒': 1000
	},
	humanize: function(milliseconds) {
		var humanize = '';
		for (var key in this.UNITS) {
			if (milliseconds >= this.UNITS[key]) {
				humanize = Math.floor(milliseconds / this.UNITS[key]) + key + '前';
				break;
			}
		}
		return humanize || '刚刚';
	},
	format: function(dateStr) {
		var date = this.parse(dateStr)
		var diff = Date.now() - date.getTime();
		if (diff < this.UNITS['天']) {
			return this.humanize(diff);
		}
		var _format = function(number) {
			return (number < 10 ? ('0' + number) : number);
		};
		return date.getFullYear() + '/' + _format(date.getMonth() + 1) + '/' + _format(date.getDate()) + '-' +
			_format(date.getHours()) + ':' + _format(date.getMinutes());
	},
	parse: function(str) { //将"yyyy-mm-dd HH:MM:ss"格式的字符串，转化为一个Date对象
		var a = str.split(/[^0-9]/);
		return new Date(a[0], a[1] - 1, a[2], a[3], a[4], a[5]);
	}
};
/**
 * 请求错误
 */
function requestError(errorMsg, errorCode, flag) {
	uni.showToast({
		title: errorMsg,
		icon: "none",
		complete() {
			if (errorCode == "E10206" || errorCode == "E10207") {
				setTimeout(() => {
					toLoginout(flag)
				}, 1600)
			}
		}
	})
}
/**
 * 退出登录
 */
function toLoginout(flag) {
	getApp().globalData.header = {};
	getApp().globalData.userInfo = {};
	//清空账号和密碼
	uni.setStorageSync("toWin", {})
	if (!flag) {
		uni.redirectTo({
			url: "/pages/login/login"
		})
	}
}
//查询版本
function checkVersion(that, cb) {
	uni.request({
		url: getApp().globalData.requestUrl + "downloadLink",
		method: "POST",
		header: getApp().globalData.header,
		data: {},
		success(res) {
			uni.request({
				url: res.data.data.downloadLink,
				method: "GET",
				success(res) {
					let data = res.data;
					if (typeof data == "object") {
						uni.setStorageSync("downloadLink", data.url);
						let newVer = data.version;
						let curVer = plus.runtime.versionCode;
						if (Number(newVer) > Number(curVer)) {
							uni.showTabBarRedDot({
								index: 4
							});
						}
						cb && cb(newVer > curVer, data)
						// cb && cb(newVer != curVer,data)
					}
				}
			})
		},
		fail() {
			requestError(res.data.errorMessage, res.data.errorCode)
		}
	})
}
//獲取通知
function getMessage(that, cb) {
	uni.request({
		url: getApp().globalData.requestUrl + "noticeUserList",
		method: "GET",
		header: getApp().globalData.header,
		data: {
			userId: getApp().globalData.userInfo.id,
			isDelete: 0,
			userlistStatus: 2
		},
		success: (res) => {
			if (res.data.success) {
				let data = res.data.data;
				if (data.length > 0) {
					uni.showTabBarRedDot({
						index: 4
					});
				}
				cb && cb(data)
			} else {
				requestError(res.data.errorMessage, res.data.errorCode)
			}
		}
	})
}
//请求接口
function requestFunc(url, method, data, successFunc, failFunc) {
	uni.request({
		url: getApp().globalData.requestUrl + url,
		method,
		header: getApp().globalData.header,
		data,
		success(res) {
			if (res.data.status == 110002) {
				uni.redirectTo({
					url: "/pages/login/login"
				})
			}
			if (res.data.status == 200) {
				successFunc && successFunc(res.data)
			} else {
				uni.showToast({
					title: res.data.msg,
					icon: "none"
				})
			}
		},
		fail: failFunc
	})
}
//时间戳转日期
function stampToDate(stamp) {
	let curDate = new Date();
	if(stamp){
		curDate = new Date(stamp);
	}
	let fmt = "yyyy-MM-dd hh:mm:ss";
	let o = {
		"M+": curDate.getMonth() + 1, //月份   
		"d+": curDate.getDate(), //日   
		"h+": curDate.getHours(), //小时   
		"m+": curDate.getMinutes(), //分   
		"s+": curDate.getSeconds(), //秒   
		"q+": Math.floor((curDate.getMonth() + 3) / 3), //季度   
		"S": curDate.getMilliseconds() //毫秒   
	};
	if (/(y+)/.test(fmt))
		fmt = fmt.replace(RegExp.$1, (curDate.getFullYear() + "").substr(4 - RegExp.$1.length));
	for (let k in o)
		if (new RegExp("(" + k + ")").test(fmt))
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k])
				.length)));
	return fmt;
}
export default {
	stampToDate,
	formatTime,
	formatLocation,
	dateUtils,
	encrypt,
	decrypt,
	requestError,
	toLoginout,
	checkVersion,
	getMessage,
	requestFunc
}
