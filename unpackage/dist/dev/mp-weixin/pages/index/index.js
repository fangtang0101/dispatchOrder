"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    common_vendor.pn.database();
    let title = common_vendor.ref("");
    common_vendor.onShow(() => {
      title.value = "\u4E09\u5E74\u4E09\u6708";
    });
    return (_ctx, _cache) => {
      return {};
    };
  }
};
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/code/unapp/dispatchOrder/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
