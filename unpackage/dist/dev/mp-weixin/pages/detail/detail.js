"use strict";
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_tag2 = common_vendor.resolveComponent("uni-tag");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_tag2 + _easycom_uni_popup2)();
}
const _easycom_uni_tag = () => "../../uni_modules/uni-tag/components/uni-tag/uni-tag.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_tag + _easycom_uni_popup)();
}
const _sfc_main = {
  __name: "detail",
  setup(__props) {
    const dataDetail = common_vendor.ref({});
    let popup = common_vendor.ref(null);
    let currentJob = common_vendor.ref({});
    let currentRegistInfo = common_vendor.ref({ info: "", role: "" });
    const roleList = common_vendor.ref(["\u961F\u957F", "\u961F\u5458"]);
    let hasRegister = common_vendor.computed$1(() => {
      let flag = false;
      dataDetail.value.job_list.forEach((job) => {
        console.log(getApp().globalData.useInfo);
        console.log(job.registration_info);
        let res = job.registration_info.find((v) => v.user_id === getApp().globalData.useInfo._id);
        if (res)
          flag = true;
      });
      return flag;
    });
    common_vendor.onLoad((option) => {
      const { _id } = option;
      console.log("onLoad ===", _id);
      common_vendor.pn.callFunction({
        name: "queryProjectDetail",
        data: { _id },
        success: (res) => {
          console.log("queryProjectDetail ====", res);
          if (res.result && res.result.data && res.result.data.length > 0) {
            dataDetail.value = res.result.data[0];
          }
        },
        complete: () => {
          common_vendor.index.hideLoading();
        }
      });
    });
    function open(item) {
      currentJob.value = __spreadValues({}, item);
      popup.value.open("center");
    }
    function close() {
      popup.value.close();
    }
    function radioChange(e) {
      console.log("e ==========", e);
      const { value } = e.detail;
      currentRegistInfo.value = __spreadProps(__spreadValues({}, currentRegistInfo.value), { role: value });
    }
    function submit() {
      const { _id } = getApp().globalData.useInfo;
      const args = __spreadProps(__spreadValues({ user_id: _id }, currentRegistInfo.value), { job_id: currentJob.value._id });
      common_vendor.pn.callFunction({
        name: "updateRegistration",
        data: args,
        success: (res) => {
          console.log("updateRegistration ====", res);
          if (res.result && res.result.data && res.result.data.length > 0) {
            dataDetail.value = res.result.data[0];
          }
        },
        complete: () => {
          common_vendor.index.hideLoading();
        }
      });
    }
    function transferTime(time) {
      try {
        let date = new Date(time);
        let yyyy = date.getFullYear();
        let MM = date.getMonth() + 1;
        let dd = date.getDate();
        let HH = date.getHours();
        let mm = date.getMinutes();
        let ss = date.getSeconds();
        MM = MM < 10 ? "0" + MM : MM;
        dd = dd < 10 ? "0" + dd : dd;
        HH = HH < 10 ? "0" + HH : HH;
        mm = mm < 10 ? "0" + mm : mm;
        ss = ss < 10 ? "0" + ss : ss;
        date = `${yyyy}-${MM}-${dd} ${HH}:${mm}:${ss}`;
        return date;
      } catch (e) {
        return "\u65F6\u95F4\u4E0D\u8BE6";
      }
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(dataDetail.value.name),
        b: common_vendor.t(dataDetail.value.payment),
        c: common_vendor.t(dataDetail.value.need_people),
        d: common_vendor.t(transferTime(dataDetail.value.registration_deadline)),
        e: common_vendor.t(dataDetail.value.status),
        f: common_vendor.t(dataDetail.value.desc),
        g: common_vendor.f(dataDetail.value.job_list, (item, k0, i0) => {
          return common_vendor.e({
            a: common_vendor.t(item.position),
            b: common_vendor.t(item.need_people),
            c: common_vendor.t(item.payment)
          }, common_vendor.unref(hasRegister) ? {} : {
            d: common_vendor.o(($event) => open(item))
          });
        }),
        h: common_vendor.unref(hasRegister),
        i: common_vendor.t(common_vendor.unref(currentJob).position),
        j: common_vendor.f(roleList.value, (role, k0, i0) => {
          return {
            a: role,
            b: role === common_vendor.unref(currentRegistInfo).role,
            c: common_vendor.t(role)
          };
        }),
        k: common_vendor.o(radioChange),
        l: common_vendor.f(common_vendor.unref(currentJob).need_skill_list, (skill, k0, i0) => {
          return {
            a: "1396defb-1-" + i0 + ",1396defb-0",
            b: common_vendor.p({
              text: skill,
              inverted: true,
              size: "mini"
            })
          };
        }),
        m: common_vendor.unref(currentRegistInfo).info,
        n: common_vendor.o(($event) => common_vendor.unref(currentRegistInfo).info = $event.detail.value),
        o: common_vendor.o(close),
        p: common_vendor.o(submit),
        q: common_vendor.sr(popup, "1396defb-0", {
          "k": "popup"
        }),
        r: common_vendor.p({
          ["mask-click"]: false,
          ["background-color"]: "#fff"
        })
      };
    };
  }
};
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/code/unapp/dispatchOrder/pages/detail/detail.vue"]]);
wx.createPage(MiniProgramPage);
