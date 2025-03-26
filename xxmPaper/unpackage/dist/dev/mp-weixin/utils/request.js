"use strict";
const common_vendor = require("../common/vendor.js");
const BASE_URL = "https://tea.qingnian8.com/api/bizhi";
const request = (e = {}) => {
  let { url, data = {}, method = "GET", header = {} } = e;
  url = BASE_URL + url;
  header["access-key"] = "sweatbaby";
  return new Promise((resolve, reject) => {
    common_vendor.index.request({
      url,
      method,
      data,
      header,
      success: (res) => {
        if (res.data.errCode === 0) {
          resolve(res.data);
        } else if (res.data.errCode === 400) {
          common_vendor.index.showModal({
            title: "err message",
            content: res.data.errMsg,
            showCancel: false
          });
          reject(res.data);
        } else {
          common_vendor.index.showToast({
            title: res.data.errMsg,
            icon: "none"
          });
          reject(res.data);
        }
      },
      fail: (err) => {
        reject(err);
      }
    });
  });
};
exports.request = request;
