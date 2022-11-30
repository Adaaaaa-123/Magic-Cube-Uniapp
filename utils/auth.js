export function getToken() {
  return uni.getStorageSync('token');
}

export function setToken(val) {
  return uni.setStorageSync('token', val);
}

export function removeToken() {
  uni.removeStorageSync('token');
  // localStorage.removeItem("data");
  // localStorage.removeItem("userInfo");

}