import {request} from "@/utils/request.js"

export function apiGetBanner(){
	return request({
		url:'/homeBanner',
		method: 'GET',
	})
}

export function apiGetDayRandom(){
	return request({
		url:'/randomWall',
		method: 'GET'
	})
}

export function apiGetNotice({data = {}}){
	return request({
		url:'/wallNewsList',
		method: 'GET',
		data
	})
}

export const apiGetClassify = (pageSize={}) => {
	return request({
		url: '/classify',
		data: pageSize
	})
}

export const apiGetClassList = (data={}) => {
	return request({
		url: '/wallList',
		data
	})
}

export const apiDetailWall = (data={}) => {
	return request({
		url:'/detailWall',
		data
	})
}

export const apiGetSetupScore = (data={}) => {
	return request({
		url:'/setupScore',
		data
	})
}

export const apiWriteDownload = (data={}) =>{
	return request({
		url: '/downloadWall',
		data
	})
}

export const apiUserInfo = (data={}) => {
	return request({
		url: '/userInfo',
		data
	})
}

export const apiUserWallList = (data={}) => {
	return request({
		url: '/userWallList',
		data
	})
}

export const apiNoticeDetail = (data={}) => {
	return request({
		url: '/wallNewsDetail',
		data
	})
}

export const apiSearchData = (data={}) => {
	return request({
		url: '/searchWall',
		data
	})
}