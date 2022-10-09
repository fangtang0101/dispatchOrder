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
  const _easycom_uni_datetime_picker2 = common_vendor.resolveComponent("uni-datetime-picker");
  const _easycom_uni_data_select2 = common_vendor.resolveComponent("uni-data-select");
  const _easycom_uni_data_checkbox2 = common_vendor.resolveComponent("uni-data-checkbox");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_datetime_picker2 + _easycom_uni_data_select2 + _easycom_uni_data_checkbox2 + _easycom_uni_popup2)();
}
const _easycom_uni_datetime_picker = () => "../../uni_modules/uni-datetime-picker/components/uni-datetime-picker/uni-datetime-picker.js";
const _easycom_uni_data_select = () => "../../uni_modules/uni-data-select/components/uni-data-select/uni-data-select.js";
const _easycom_uni_data_checkbox = () => "../../uni_modules/uni-data-checkbox/components/uni-data-checkbox/uni-data-checkbox.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_datetime_picker + _easycom_uni_data_select + _easycom_uni_data_checkbox + _easycom_uni_popup)();
}
const _sfc_main = {
  __name: "publish",
  setup(__props) {
    const dataDetail = common_vendor.ref({});
    let popup = common_vendor.ref(null);
    let currentJob = common_vendor.ref({});
    common_vendor.ref({ info: "", role: "" });
    let job_list = common_vendor.ref([]);
    const selectPosition = common_vendor.ref([{ value: "\u524D\u7AEF", text: "\u524D\u7AEF" }, { value: "\u540E\u7AEF", text: "\u540E\u7AEF" }]);
    const selectSkill = common_vendor.ref([{ value: "Node", text: "Node" }, { value: "uni-app", text: "uni-app" }]);
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
      common_vendor.pn.callFunction({
        name: "dict",
        data: { table: "job-position", action: "check" },
        success: (res) => {
          if (res.result && res.result.data.length > 0)
            selectPosition.value = res.result.data.map((item) => {
              return { value: item.name, text: item.name };
            });
        }
      });
      common_vendor.pn.callFunction({
        name: "dict",
        data: { table: "skill", action: "check" },
        success: (res) => {
          if (res.result && res.result.data.length > 0)
            selectSkill.value = res.result.data.map((item) => {
              return { value: item.name, text: item.name };
            });
        }
      });
    });
    function open() {
      currentJob.value = { position: "", payment: "", need_skill_list: [], need_people: "" };
      popup.value.open("center");
    }
    function close() {
      popup.value.close();
    }
    function submit() {
      popup.value.close();
      job_list.value.push(currentJob.value);
    }
    function publish() {
      const data = __spreadProps(__spreadValues({}, dataDetail.value), { job_list: job_list.value, status: "\u62A5\u540D\u4E2D" });
      console.log("publish ===", data);
      common_vendor.pn.callFunction({
        name: "publishProject",
        data,
        success: (res) => {
          common_vendor.index.navigateBack();
        },
        complete: () => {
          common_vendor.index.hideLoading();
        }
      });
    }
    return (_ctx, _cache) => {
      return {
        a: dataDetail.value.name,
        b: common_vendor.o(($event) => dataDetail.value.name = $event.detail.value),
        c: dataDetail.value.payment,
        d: common_vendor.o(common_vendor.m(($event) => dataDetail.value.payment = $event.detail.value, {
          number: true
        })),
        e: dataDetail.value.need_people,
        f: common_vendor.o(common_vendor.m(($event) => dataDetail.value.need_people = $event.detail.value, {
          number: true
        })),
        g: common_vendor.o(($event) => dataDetail.value.registration_deadline = $event),
        h: common_vendor.p({
          ["return-type"]: "timestamp",
          modelValue: dataDetail.value.registration_deadline
        }),
        i: dataDetail.value.desc,
        j: common_vendor.o(($event) => dataDetail.value.desc = $event.detail.value),
        k: common_vendor.o(open),
        l: common_vendor.f(common_vendor.unref(job_list), (item, k0, i0) => {
          return {
            a: common_vendor.t(item.position),
            b: common_vendor.t(item.need_people),
            c: common_vendor.t(item.payment)
          };
        }),
        m: common_vendor.o(_ctx.change),
        n: common_vendor.o(($event) => common_vendor.unref(currentJob).position = $event),
        o: common_vendor.p({
          localdata: selectPosition.value,
          modelValue: common_vendor.unref(currentJob).position
        }),
        p: common_vendor.unref(currentJob).payment,
        q: common_vendor.o(common_vendor.m(($event) => common_vendor.unref(currentJob).payment = $event.detail.value, {
          number: true
        })),
        r: common_vendor.unref(currentJob).need_people,
        s: common_vendor.o(common_vendor.m(($event) => common_vendor.unref(currentJob).need_people = $event.detail.value, {
          number: true
        })),
        t: common_vendor.o(($event) => common_vendor.unref(currentJob).need_skill_list = $event),
        v: common_vendor.p({
          mode: "tag",
          multiple: true,
          localdata: selectSkill.value,
          modelValue: common_vendor.unref(currentJob).need_skill_list
        }),
        w: common_vendor.o(close),
        x: common_vendor.o(submit),
        y: common_vendor.sr(popup, "2869ee3b-1", {
          "k": "popup"
        }),
        z: common_vendor.p({
          ["mask-click"]: false,
          ["background-color"]: "#fff"
        }),
        A: common_vendor.o(publish)
      };
    };
  }
};
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/code/unapp/dispatchOrder/pages/publish/publish.vue"]]);
wx.createPage(MiniProgramPage);
