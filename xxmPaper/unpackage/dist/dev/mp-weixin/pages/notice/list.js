"use strict";
const common_vendor = require("../../common/vendor.js");
const api_apis = require("../../api/apis.js");
if (!Array) {
  const _easycom_uni_tag2 = common_vendor.resolveComponent("uni-tag");
  const _easycom_uni_dateformat2 = common_vendor.resolveComponent("uni-dateformat");
  const _component_mp_html = common_vendor.resolveComponent("mp-html");
  (_easycom_uni_tag2 + _easycom_uni_dateformat2 + _component_mp_html)();
}
const _easycom_uni_tag = () => "../../uni_modules/uni-tag/components/uni-tag/uni-tag.js";
const _easycom_uni_dateformat = () => "../../uni_modules/uni-dateformat/components/uni-dateformat/uni-dateformat.js";
if (!Math) {
  (_easycom_uni_tag + _easycom_uni_dateformat)();
}
const _sfc_main = {
  __name: "list",
  setup(__props) {
    const detial = common_vendor.ref({});
    let id;
    common_vendor.onLoad((e) => {
      id = e.id;
      getNoticeDetial();
    });
    const getNoticeDetial = () => {
      api_apis.apiNoticeDetail({ id }).then((res) => {
        detial.value = res.data;
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: detial.value.select
      }, detial.value.select ? {
        b: common_vendor.p({
          mark: true,
          text: "置顶",
          inverted: "true",
          type: "primary",
          size: "mini"
        })
      } : {}, {
        c: common_vendor.t(detial.value.title),
        d: common_vendor.t(detial.value.author),
        e: common_vendor.p({
          data: detial.value.publish_date,
          format: "yyyy-MM-dd"
        }),
        f: common_vendor.p({
          content: detial.value.content
        }),
        g: common_vendor.t(detial.value.view_count)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-b9ccfb1a"], ["__file", "F:/soft/wx-sofy/personal-glob/xxmPaper/pages/notice/list.vue"]]);
wx.createPage(MiniProgramPage);
