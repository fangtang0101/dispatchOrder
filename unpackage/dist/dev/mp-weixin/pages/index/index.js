"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    common_vendor.pn.database();
    let title = common_vendor.ref("");
    const dataList = common_vendor.ref([]);
    const useInfo = common_vendor.ref({});
    common_vendor.onShow(() => {
      title.value = "\u4E09\u5E74\u4E09\u6708";
      common_vendor.pn.callFunction({
        name: "queryProjectList",
        success: (res) => {
          if (res.result && res.result.data) {
            dataList.value = [...res.result.data];
          }
        },
        complete: () => {
          common_vendor.index.hideLoading();
        }
      });
      wx.login({
        success: (res) => {
          common_vendor.pn.callFunction({
            name: "login",
            data: { code: res.code },
            success: (res2) => {
              getApp().globalData.openid = res2.result.openid;
              getApp().globalData.useInfo = res2.result;
              useInfo.value = res2.result;
            }
          });
        }
      });
    });
    function gotoDetail(item) {
      common_vendor.index.navigateTo({ url: `/pages/detail/detail?_id=${item._id}` });
    }
    function publishProject() {
      common_vendor.index.navigateTo({ url: `/pages/publish/publish` });
    }
    function login() {
      common_vendor.index.getUserProfile({
        desc: "queryProjectList",
        success: (res) => {
          console.log("res ===", res.userInfo);
          const { nickName, avatarUrl } = res.userInfo;
          common_vendor.pn.callFunction({
            name: "user",
            data: { openid: getApp().globalData.openid, action: "update", nickname: nickName, avatar: avatarUrl },
            success: (res2) => {
              console.log("\u66F4\u65B0\u6210\u529F====");
              useInfo.value = res2.result;
              getApp().globalData.useInfo = res2.result;
            }
          });
        },
        fail: (res) => {
          console.log("res \u5931\u8D25 ===", res);
        }
      });
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: !useInfo.value.nickname
      }, !useInfo.value.nickname ? {
        b: common_vendor.o(login)
      } : {
        c: common_vendor.f(dataList.value, (item, k0, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: common_vendor.t(item.payment),
            c: common_vendor.t(item.status),
            d: common_vendor.t(item.need_people),
            e: common_vendor.o(($event) => gotoDetail(item))
          };
        }),
        d: common_vendor.o(publishProject)
      });
    };
  }
};
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/code/unapp/dispatchOrder/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
