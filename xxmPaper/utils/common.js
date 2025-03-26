export function formatTimestamp(timestamp) {
  const now = Date.now();
  const diff = Math.abs(timestamp - now); // 时间差绝对值

  const minute = 60 * 1000;        // 1分钟毫秒数
  const hour = 60 * minute;        // 1小时
  const day = 24 * hour;           // 1天
  const month = 30 * day;          // 按月均30天计算
  const year = 365 * day;          // 按平年计算

  if (diff < minute) {
    return 'now';
  } else if (diff < hour) {
    return `${Math.floor(diff / minute)}分钟前`;
  } else if (diff < day) {
    return `${Math.floor(diff / hour)}小时前`;
  } else if (diff < month) {
    return `${Math.floor(diff / day)}天前`;
  } else if (diff < year) {
    return `${Math.floor(diff / month)}月前`;
  }
  return null;
}

// 预防没有id传参时返回首页
export const gotoHome = () => {
	uni.showModal({
		title: "error",
		content: "请求错误",
		showCancel: false,
		success: res => {
			if(res.confirm) {
				uni.reLaunch({
					url: '/pages/index/index'
				})
			}
		}
	})
}