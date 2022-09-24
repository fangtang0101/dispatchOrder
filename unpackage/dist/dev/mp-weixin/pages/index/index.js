"use strict";
var common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _component_uni_icons = common_vendor.resolveComponent("uni-icons");
  const _component_uni_list_chat = common_vendor.resolveComponent("uni-list-chat");
  (_component_uni_icons + _component_uni_list_chat)();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    common_vendor.pn.database();
    let title = common_vendor.ref("");
    let avatarList = common_vendor.ref([{
      url: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png"
    }, {
      url: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png"
    }, {
      url: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png"
    }]);
    common_vendor.onShow(() => {
      title.value = "\u4E09\u5E74\u4E09\u6708";
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          type: "star-filled",
          color: "#999",
          size: "18"
        }),
        b: common_vendor.p({
          title: "uni-app",
          ["avatar-list"]: common_vendor.unref(avatarList),
          note: "\u60A8\u6536\u5230\u4E00\u6761\u65B0\u7684\u6D88\u606F",
          time: "2020-02-02 20:20",
          ["badge-positon"]: "left",
          ["badge-text"]: "dot"
        })
      };
    };
  }
};
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/code/unapp/dispatchOrder/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
