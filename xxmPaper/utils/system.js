
const SYSTEM_INFO = uni.getSystemInfoSync();
export const getStatusBarHeight = () => {
	return SYSTEM_INFO.statusBarHeight || 20;
}

export const getTitleBarHeight = () => {
	
	
	 // #// #ifdef MP-WEIXIN
		const uheight = uni.getMenuButtonBoundingClientRect();
		const {top, height} = uheight;
		const titleBarHeight = height + (top - getStatusBarHeight()) * 2;
		return titleBarHeight;
	 // #endif
		return 60;
}

export const getNavBarHeight = () => getStatusBarHeight() + getTitleBarHeight();