"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "test",
  setup(__props) {
    const db = common_vendor.pn.database();
    let title = common_vendor.ref("");
    common_vendor.onShow(() => {
      title.value = "\u4E09\u5E74\u4E09\u6708";
    });
    function publishProject() {
      const data = { name: `\u6D4B\u8BD5\u4FE1\u606F${Math.random()}`, payment: 200, registration_deadline: 1234331, desc: "\u6D4B\u8BD5\u63CF\u8FF0 ...", status: "\u62A5\u540D\u4E2D", need_people: 45 };
      data.job_list = [{
        position: "xxx",
        payment: 10,
        need_skill_list: ["nodesssss"],
        need_people: 50
      }];
      common_vendor.pn.callFunction({
        name: "publishProject",
        data,
        success: (res) => {
          console.log(" \u8FD4\u56DE\u7ED3\u679C === ", res);
        },
        complete: (res) => {
          console.log(" complete === ", res);
          common_vendor.index.hideLoading();
        }
      });
    }
    function updateRegistration() {
      const data = { job_id: "631f095033d8bd0001606323", user_id: "631ede5e1e2b9d00014d282c", role: "\u961F\u957F", info: `\u672C\u4EBA\u9879\u76EE\u7ECF\u9A8C\u4E30\u5BCC${Math.random()}` };
      common_vendor.pn.callFunction({
        name: "updateRegistration",
        data,
        success: (res) => {
          console.log(" \u8FD4\u56DE\u7ED3\u679C === ", res);
        },
        complete: (res) => {
          console.log(" complete === ", res);
          common_vendor.index.hideLoading();
        }
      });
    }
    function checkProject() {
      const data = { table: "project", action: "check" };
      common_vendor.pn.callFunction({
        name: "queryProjectList",
        data,
        success: (res) => {
          console.log(" \u8FD4\u56DE\u7ED3\u679C === ", res);
        },
        complete: (res) => {
          console.log(" complete === ", res);
          common_vendor.index.hideLoading();
        }
      });
    }
    function checkProjectDetail() {
      const data = { _id: "631f0f0b5d652b0001f324b5" };
      common_vendor.pn.callFunction({
        name: "queryProjectDetail",
        data,
        success: (res) => {
          console.log(" \u8FD4\u56DE\u7ED3\u679C === ", res);
        },
        complete: (res) => {
          console.log(" complete === ", res);
          common_vendor.index.hideLoading();
        }
      });
    }
    function addUser() {
      const data = { table: "user", action: "add", username: "\u65B9xx", nickname: "\u4E09\u5E74\u4E09\u6708", gender: 1, openid: "123456" };
      common_vendor.pn.callFunction({
        name: "dict",
        data,
        success: (res) => {
          console.log(" \u8FD4\u56DE\u7ED3\u679C === ", res);
        },
        complete: (res) => {
          console.log(" complete === ", res);
          common_vendor.index.hideLoading();
        }
      });
    }
    function addRegistration() {
      const data = { table: "registration", action: "add", user_id: "631ede5e1e2b9d00014d282c", role: "\u961F\u5458", info: "\u6211\u80FD\u80DC\u4EFB...." };
      common_vendor.pn.callFunction({
        name: "dict",
        data,
        success: (res) => {
          console.log(" \u8FD4\u56DE\u7ED3\u679C === ", res);
        },
        complete: (res) => {
          console.log(" complete === ", res);
          common_vendor.index.hideLoading();
        }
      });
    }
    function addJob() {
      const data = { table: "job", action: "add", position: "\u524D\u7AEF", payment: 100, need_skill_list: ["Node", "uni-app"], need_people: 20, registration_info: ["631edf58df92af0001e453d0"] };
      common_vendor.pn.callFunction({
        name: "dict",
        data,
        success: (res) => {
          console.log(" \u8FD4\u56DE\u7ED3\u679C === ", res);
        },
        complete: (res) => {
          console.log(" complete === ", res);
          common_vendor.index.hideLoading();
        }
      });
    }
    function addProject() {
      const data = { table: "project", action: "add", name: "\u6D4B\u8BD5\u9879\u76EE", payment: 1e3, registration_deadline: 1662979541058, need_people: 200, desc: "\u8FD9\u662F\u4E00\u4E2A\u5F88\u7B80\u5355\u7684\u9879\u76EE\uFF0C\u5305\u62EC\u7BA1\u7406\u540E\u53F0\uFF0C\u5C0F\u7A0B\u5E8F...", job_list: ["631f095033d8bd0001606323"], status: "\u62A5\u540D\u4E2D" };
      common_vendor.pn.callFunction({
        name: "dict",
        data,
        success: (res) => {
          console.log(" \u8FD4\u56DE\u7ED3\u679C === ", res);
        },
        complete: (res) => {
          console.log(" complete === ", res);
          common_vendor.index.hideLoading();
        }
      });
    }
    function addBaseInfo() {
      let baseInfoList = [
        {
          table: "skill",
          action: "add",
          infoList: ["Node", "uni-app", "uniClound", "three.js", "PHP", "Go", "Python", "iOS", "Android"]
        },
        {
          table: "project-status",
          action: "add",
          infoList: ["\u62A5\u540D\u4E2D", "\u62A5\u540D\u7ED3\u675F", "\u9879\u76EE\u8FDB\u884C\u4E2D", "\u9879\u76EE\u7ED3\u675F"]
        },
        {
          table: "user-status",
          action: "add",
          infoList: ["\u505A\u5355\u4E2D", "\u62D2\u7EDD\u63A5\u5355", "\u7A7A\u95F2\u4E2D"]
        },
        {
          table: "job-position",
          action: "add",
          infoList: ["\u524D\u7AEF", "\u540E\u7AEF", "\u9879\u76EE\u7ECF\u7406"]
        },
        {
          table: "registration-role",
          action: "add",
          infoList: ["\u961F\u957F", "\u961F\u5458"]
        }
      ];
      for (const item of baseInfoList) {
        for (const val of item.infoList) {
          common_vendor.index.showLoading({ title: "\u6B63\u5728\u52A0\u8F7D..." });
          common_vendor.pn.callFunction({
            name: "dict",
            data: { name: val, action: item.action, table: item.table },
            success: (res) => {
              console.log(" \u8FD4\u56DE\u7ED3\u679C === ", res);
            },
            complete: (res) => {
              console.log(" complete === ", res);
              common_vendor.index.hideLoading();
            }
          });
        }
      }
    }
    function addresume() {
      db.collection("resume").add({
        "name": "1",
        "birth_year": 1949,
        "tel": "1",
        "email": "1"
      }).then((res) => {
        console.log(res);
      }).catch((err) => {
        console.log(err.message);
      });
    }
    function login() {
      console.log("login ====");
      let data = { openid: "cc", status: "abc", action: "login" };
      common_vendor.index.showLoading({ title: "\u6B63\u5728\u52A0\u8F7D..." });
      common_vendor.pn.callFunction({
        name: "user",
        data,
        success: (res) => {
          console.log(" \u8FD4\u56DE\u7ED3\u679C === ", res);
        },
        complete: (res) => {
          console.log(" complete === ", res);
          common_vendor.index.hideLoading();
        }
      });
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(common_vendor.unref(title)),
        b: common_vendor.o(addresume),
        c: common_vendor.o(login),
        d: common_vendor.o(addUser),
        e: common_vendor.o(addRegistration),
        f: common_vendor.o(addJob),
        g: common_vendor.o(addProject),
        h: common_vendor.o(addBaseInfo),
        i: common_vendor.o(checkProject),
        j: common_vendor.o(checkProjectDetail),
        k: common_vendor.o(updateRegistration),
        l: common_vendor.o(publishProject)
      };
    };
  }
};
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/code/unapp/dispatchOrder/pages/test/test.vue"]]);
wx.createPage(MiniProgramPage);
