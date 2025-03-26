"use strict";
const common_vendor = require("../common/vendor.js");
function formatTimestamp(timestamp) {
  const now = Date.now();
  const diff = Math.abs(timestamp - now);
  const minute = 60 * 1e3;
  const hour = 60 * minute;
  const day = 24 * hour;
  const month = 30 * day;
  const year = 365 * day;
  if (diff < minute) {
    return "now";
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
const gotoHome = () => {
  common_vendor.index.showModal({
    title: "error",
    content: "请求错误",
    showCancel: false,
    success: (res) => {
      if (res.confirm) {
        common_vendor.index.reLaunch({
          url: "/pages/index/index"
        });
      }
    }
  });
};
exports.formatTimestamp = formatTimestamp;
exports.gotoHome = gotoHome;
