"use strict";
const common_vendor = require("../../common/vendor.js");
const api_apis = require("../../api/apis.js");
const utils_common = require("../../utils/common.js");
if (!Array) {
  const _easycom_uni_load_more2 = common_vendor.resolveComponent("uni-load-more");
  _easycom_uni_load_more2();
}
const _easycom_uni_load_more = () => "../../uni_modules/uni-load-more/components/uni-load-more/uni-load-more.js";
if (!Math) {
  _easycom_uni_load_more();
}
const _sfc_main = {
  __name: "classlist",
  setup(__props) {
    const classList = common_vendor.ref([]);
    const noData = common_vendor.ref(false);
    const queryId = {
      pageNum: 1,
      pageSize: 8
    };
    let queryName;
    common_vendor.onLoad((e) => {
      let { id = null, name = null, type = null } = e;
      if (type)
        queryId.type = type;
      if (id)
        queryId.classid = id;
      if (!id)
        utils_common.gotoHome();
      queryName = name;
      common_vendor.index.setNavigationBarTitle({
        title: name
      });
      getClassList();
    });
    common_vendor.onShareAppMessage(() => {
      return {
        title: "xxmPaper",
        path: "/pages/classlist/classlist?id=" + queryId.classid + "&name=" + queryName
      };
    });
    common_vendor.onShareTimeline(() => {
      return {
        title: "xxmPaper",
        query: "id=" + queryId.classid + "&name=" + queryName
      };
    });
    const getClassList = async () => {
      try {
        let response;
        if (queryId.classid) {
          response = await api_apis.apiGetClassList(queryId);
        } else if (queryId.type) {
          response = await api_apis.apiUserInfo(queryId);
        } else {
          throw new Error("缺少必要查询参数");
        }
        const safeData = Array.isArray(response == null ? void 0 : response.data) ? response.data : [];
        if (safeData.length < queryId.pageSize) {
          noData.value = true;
        }
        classList.value = [...classList.value, ...safeData];
        common_vendor.index.setStorageSync("storgClassList", classList.value);
      } catch (error) {
        common_vendor.index.showToast({ title: "加载失败，请重试", icon: "none" });
      }
    };
    common_vendor.onReachBottom(() => {
      if (noData.value)
        return;
      queryId.pageNum++;
      getClassList();
    });
    common_vendor.onUnload(() => {
      common_vendor.index.removeStorageSync("storgClassList");
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: !classList.value.length && !noData.value
      }, !classList.value.length && !noData.value ? {
        b: common_vendor.p({
          status: "loading"
        })
      } : {}, {
        c: common_vendor.f(classList.value, (item, k0, i0) => {
          return {
            a: item.smallPicurl,
            b: "/pages/preview/preview?id=" + item._id,
            c: item._id
          };
        }),
        d: classList.value.length || noData.value
      }, classList.value.length || noData.value ? {
        e: common_vendor.p({
          status: noData.value ? "noMore" : "loading"
        })
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-bd381383"], ["__file", "F:/soft/wx-sofy/personal-glob/xxmPaper/pages/classlist/classlist.vue"]]);
_sfc_main.__runtimeHooks = 6;
wx.createPage(MiniProgramPage);
