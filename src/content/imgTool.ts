// 计算图片大小
function getByte(src: string) {
  return fetch(src).then(function (res) {
    return res.blob()
  }).then(function (data) {
    return (data.size / (1024)).toFixed(2) + 'kB';
  })
}
// 在页面上的图片的title属性上显示出来
function showInfo(el: any, byte: string) {
  const html = `真实尺寸:${el.naturalWidth}*${el.naturalHeight}\n显示尺寸:${el.width}*${el.height}\n存储大小:${byte}`;
  el.title = html;
}
document.addEventListener('mouseover', function (e: any) {
  //移动到图片元素上时、则显示信息
  if (e.target.tagName == 'IMG') {
    getByte(e.target.src).then(async (byte) => {
      showInfo(e.target, byte)
      // const res = await chrome.runtime.sendMessage({ type: 'get_info', url: 'http://yanfee.com', greeting: "hello" })
      // console.log(res)
    });
  }
}, true)

// // 接收数据
// chrome.runtime.onMessage.addListener(
//   (request, sender, sendResponse) => {
//     console.log(sender.tab ?
//                 "from a content script:" + sender.tab.url :
//                 "from the extension");
//     if (request.greeting === "hello")
//       //处理完消息后、通知发送方
//       sendResponse({farewell: "goodbye"});
//   }
// );
