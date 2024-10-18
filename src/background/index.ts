console.info('chrome-ext template-vue-ts background script')

chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason !== "install" && details.reason !== "update") return;
  chrome.contextMenus.create({
    id: "open-deepal-permission",
    type: "normal",
    title: "权限配置",
    contexts: ["all"],
    // onclick(info, tab) {
    //   chrome.tabs.create({
    //     url: "https://www.yanfee.com/",
    //   });
    // },
  });
});
//   // 从扩展页面(background、options、actions) 发送数据到内容脚本(content_scripts)
//   (async () => {

//     // 需要先获取当前的tab页面
//     const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
//     if (tab?.id) {
//       const response = await chrome.tabs.sendMessage(tab.id, { greeting: "hello" });
//       console.log(response);
//     }
//   })();
// });

// // 接收数据
// chrome.runtime.onMessage.addListener(
//   (request, sender, sendResponse) => {
//     console.log(sender.tab ?
//       "from a content script:" + sender.tab.url :
//       "from the extension");
//     if (request.greeting === "hello")
//       //处理完消息后、通知发送方
//       sendResponse({ farewell: "goodbye" });
