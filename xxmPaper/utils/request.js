const BASE_URL = "https://tea.qingnian8.com/api/bizhi"

export const request = (e = {}) => {
	let {url, data={}, method = 'GET', header = {}} = e
	url = BASE_URL + url
	header['access-key'] = 'sweatbaby'
	
	return new Promise((resolve,reject) => {
		uni.request({
			url,
			method,
			data,
			header,
			success: res => {
				if(res.data.errCode === 0) {
					resolve(res.data)
				}else if(res.data.errCode === 400){
					uni.showModal({
						title:"err message",
						content: res.data.errMsg,
						showCancel: false
					})
					reject(res.data)
				}else{
					uni.showToast({
						title: res.data.errMsg,
						icon: "none"
					})
					reject(res.data)
				}
			},
			fail: err => {
				reject(err)
			}
		})
	})
}