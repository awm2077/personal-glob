"use strict";
const utils_request = require("../utils/request.js");
function apiGetBanner() {
  return utils_request.request({
    url: "/homeBanner",
    method: "GET"
  });
}
function apiGetDayRandom() {
  return utils_request.request({
    url: "/randomWall",
    method: "GET"
  });
}
function apiGetNotice({ data = {} }) {
  return utils_request.request({
    url: "/wallNewsList",
    method: "GET",
    data
  });
}
const apiGetClassify = (pageSize = {}) => {
  return utils_request.request({
    url: "/classify",
    data: pageSize
  });
};
const apiGetClassList = (data = {}) => {
  return utils_request.request({
    url: "/wallList",
    data
  });
};
const apiDetailWall = (data = {}) => {
  return utils_request.request({
    url: "/detailWall",
    data
  });
};
const apiGetSetupScore = (data = {}) => {
  return utils_request.request({
    url: "/setupScore",
    data
  });
};
const apiWriteDownload = (data = {}) => {
  return utils_request.request({
    url: "/downloadWall",
    data
  });
};
const apiUserInfo = (data = {}) => {
  return utils_request.request({
    url: "/userInfo",
    data
  });
};
const apiNoticeDetail = (data = {}) => {
  return utils_request.request({
    url: "/wallNewsDetail",
    data
  });
};
const apiSearchData = (data = {}) => {
  return utils_request.request({
    url: "/searchWall",
    data
  });
};
exports.apiDetailWall = apiDetailWall;
exports.apiGetBanner = apiGetBanner;
exports.apiGetClassList = apiGetClassList;
exports.apiGetClassify = apiGetClassify;
exports.apiGetDayRandom = apiGetDayRandom;
exports.apiGetNotice = apiGetNotice;
exports.apiGetSetupScore = apiGetSetupScore;
exports.apiNoticeDetail = apiNoticeDetail;
exports.apiSearchData = apiSearchData;
exports.apiUserInfo = apiUserInfo;
exports.apiWriteDownload = apiWriteDownload;
