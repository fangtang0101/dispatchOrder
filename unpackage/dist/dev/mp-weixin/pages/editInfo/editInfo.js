"use strict";
var common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_data_select2 = common_vendor.resolveComponent("uni-data-select");
  const _easycom_uni_data_checkbox2 = common_vendor.resolveComponent("uni-data-checkbox");
  (_easycom_uni_data_select2 + _easycom_uni_data_checkbox2)();
}
const _easycom_uni_data_select = () => "../../uni_modules/uni-data-select/components/uni-data-select/uni-data-select.js";
const _easycom_uni_data_checkbox = () => "../../uni_modules/uni-data-checkbox/components/uni-data-checkbox/uni-data-checkbox.js";
if (!Math) {
  (_easycom_uni_data_select + _easycom_uni_data_checkbox)();
}
const _sfc_main = {
  __name: "editInfo",
  setup(__props) {
    let userInfo = common_vendor.ref({});
    let openid = common_vendor.ref("");
    common_vendor.computed$1(() => {
      return userInfo.value.avatar ? userInfo.value.avatar : "../../static/logo.png";
    });
    const selectWorkStatus = common_vendor.ref([{ value: 0, text: "\u5168\u804C" }, { value: 1, text: "\u517C\u804C" }]);
    const selectSkill = common_vendor.ref([{ value: "Node", text: "Node" }, { value: "uni-app", text: "uni-app" }]);
    common_vendor.onLoad((option) => {
      openid.value = option.openid;
      login();
    });
    function login() {
      const data = { openid: openid.value, action: "login" };
      common_vendor.pn.callFunction({
        name: "user",
        data,
        success: (res) => {
          userInfo.value = res.result;
        },
        complete: () => {
          common_vendor.index.hideLoading();
        }
      });
    }
    function submit() {
      const { work_status, response_count, skill_list, desc } = userInfo.value;
      const data = { openid: openid.value, action: "update", work_status, response_count, skill_list, desc };
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
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(_ctx.change),
        b: common_vendor.o(($event) => common_vendor.unref(userInfo).work_status = $event),
        c: common_vendor.p({
          localdata: selectWorkStatus.value,
          modelValue: common_vendor.unref(userInfo).work_status
        }),
        d: common_vendor.unref(userInfo).response_count,
        e: common_vendor.o(common_vendor.m(($event) => common_vendor.unref(userInfo).response_count = $event.detail.value, {
          number: true
        })),
        f: common_vendor.o(($event) => common_vendor.unref(userInfo).skill_list = $event),
        g: common_vendor.p({
          mode: "tag",
          multiple: true,
          localdata: selectSkill.value,
          modelValue: common_vendor.unref(userInfo).skill_list
        }),
        h: common_vendor.unref(userInfo).desc,
        i: common_vendor.o(($event) => common_vendor.unref(userInfo).desc = $event.detail.value),
        j: common_vendor.o(submit)
      };
    };
  }
};
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/code/unapp/dispatchOrder/pages/editInfo/editInfo.vue"]]);
wx.createPage(MiniProgramPage);
