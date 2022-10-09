"use strict";
var common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_data_checkbox2 = common_vendor.resolveComponent("uni-data-checkbox");
  _easycom_uni_data_checkbox2();
}
const _easycom_uni_data_checkbox = () => "../../uni_modules/uni-data-checkbox/components/uni-data-checkbox/uni-data-checkbox.js";
if (!Math) {
  _easycom_uni_data_checkbox();
}
const _sfc_main = {
  __name: "my",
  setup(__props) {
    common_vendor.pn.database();
    let userInfo = common_vendor.ref({});
    let avatar = common_vendor.computed$1(() => {
      return userInfo.value.avatar ? userInfo.value.avatar : "../../static/logo.png";
    });
    const selectSkill = common_vendor.ref([{ value: "Node", text: "Node" }, { value: "uni-app", text: "uni-app" }]);
    common_vendor.onShow(() => {
      login();
    });
    function login() {
      const data = { openid: "123456", action: "login" };
      common_vendor.pn.callFunction({
        name: "user",
        data,
        success: (res) => {
          console.log("login ====", res);
          userInfo.value = res.result;
        },
        complete: () => {
          common_vendor.index.hideLoading();
        }
      });
    }
    function editInfo() {
      common_vendor.index.navigateTo({ url: `/pages/editInfo/editInfo?openid=123456` });
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.unref(avatar),
        b: common_vendor.t(common_vendor.unref(userInfo).nickname),
        c: common_vendor.t(common_vendor.unref(userInfo).order_count || 0),
        d: common_vendor.t(common_vendor.unref(userInfo).registration_count || 0),
        e: common_vendor.t(common_vendor.unref(userInfo).money || 0),
        f: common_vendor.t(common_vendor.unref(userInfo).score || 100),
        g: common_vendor.o(editInfo),
        h: common_vendor.t(common_vendor.unref(userInfo).work_status),
        i: common_vendor.t(common_vendor.unref(userInfo).response_count),
        j: common_vendor.o(($event) => common_vendor.unref(userInfo).skill_list = $event),
        k: common_vendor.p({
          mode: "tag",
          multiple: true,
          localdata: selectSkill.value,
          modelValue: common_vendor.unref(userInfo).skill_list
        }),
        l: common_vendor.unref(userInfo).desc,
        m: common_vendor.o(($event) => common_vendor.unref(userInfo).desc = $event.detail.value)
      };
    };
  }
};
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/code/unapp/dispatchOrder/pages/my/my.vue"]]);
wx.createPage(MiniProgramPage);
