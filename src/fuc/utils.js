// 取得URL上的参数
// 全部{a：111， b: 222}
export const getParameters = URL => JSON.parse(`{"${decodeURI(URL.split("?")[1]).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"')}"}`);
// str: 是url参数上的单个key, 得到key对应的单个值
export const getParameterURL = (str) => {
    var parameterURL = location.search.substring(1, location.search.length);
    var paramArr = parameterURL.split('&');
    var key, value, temp;
    var paramobj = {};
  
    for (var i = 0; i < paramArr.length; i++) {
      temp = paramArr[i].split('=');
      if (temp.length === 1) {
        paramobj[temp[0]] = '';
      } else if (temp.length > 1) {
        for (var j = 0; j < temp.length; j++) {
          paramobj[temp[0]] = decodeURIComponent(temp[1]);
        }
      }
    }
  
    return paramobj[str] == undefined ? '' : paramobj[str];
  };

// 检查对象是否为空
// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect
export const isEmpty = (obj) => Reflect.ownKeys(obj).length === 0 && obj.constructor === Object;

// 生成随机十六进制
// 生成随机数相信你能信手拈来，那随机生成十六进制，例如生成十六进制颜色值
export const randomHexColor = () => `#${Math.floor(Math.random() * 0xffffff).toString(16).padEnd(6, "0")}`

// 检查设备类型
// 使用navigator.userAgent 判断是移动设备还是电脑设备
const judgeDeviceType = () => /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|OperaMini/i.test(navigator.userAgent) ? 'Mobile' : 'PC';

// 文字复制到剪贴板
// 需要有事件触发 copyText("xxxx") ,然后[Ctrl+v]就会粘贴到 "xxxx"
const copyText = async (text) => await navigator.clipboard.writeText(text);

// 获取选定的文本
// getSelectedText()返回 表示用户选择的文本范围或光标的当前位置
const getSelectedText = () => window.getSelection().toString();

// 两日期之间相差的天数 需要显示剩余天数
// dayDiff(new Date("2021-10-21"), new Date("2022-02-12")) 结果：114
const dayDiff = (date1, date2) => Math.ceil(Math.abs(date1.getTime() - date2.getTime()) / 86400000);

