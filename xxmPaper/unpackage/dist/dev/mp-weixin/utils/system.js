"use strict";
const common_vendor = require("../common/vendor.js");
const SYSTEM_INFO = common_vendor.index.getSystemInfoSync();
const getStatusBarHeight = () => {
  return SYSTEM_INFO.statusBarHeight || 20;
};
const getTitleBarHeight = () => {
  const uheight = common_vendor.index.getMenuButtonBoundingClientRect();
  const { top, height } = uheight;
  const titleBarHeight = height + (top - getStatusBarHeight()) * 2;
  return titleBarHeight;
};
const getNavBarHeight = () => getStatusBarHeight() + getTitleBarHeight();
exports.getNavBarHeight = getNavBarHeight;
exports.getStatusBarHeight = getStatusBarHeight;
exports.getTitleBarHeight = getTitleBarHeight;
