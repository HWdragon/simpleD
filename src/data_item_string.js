;
const simpArr_Str = (dataArr, paramsObj) => {
    // copy source data
    let resultData = [...dataArr];
    // [{"a":"aa"}, {"b":"bb"}, …… ……]
    let isObjItem = Object.prototype.toString.call(dataArr[0]) == "[object Object]";
    // ["11","22", …… ……]
    let isStringItem = Object.prototype.toString.call(dataArr[0]) == "[object String]";
    // [11,22, …… ……]
    let isNumberItem = Object.prototype.toString.call(dataArr[0]) == "[object Number]";
    // [["aa","aa"],["bb"], …… ……]
    let isArraryItem = Object.prototype.toString.call(dataArr[0]) == "[object Array]";

    // array no-repeat
    // 1.hash no-repeat --- 3ms
    // 2.jquery $.each $.inArrary no-repeat --- 115ms
    // 3.indexOf no-repeat --- 71ms
    // es6.7 newSet() no-repeat --- 6ms
    // tag：https://blog.csdn.net/weixin_30342209/article/details/99208791?utm_medium=distribute.pc_relevant.none-task-blog-2~default~baidujs_baidulandingword~default-0.no_search_link&spm=1001.2101.3001.4242.1
    let hasRepeat = paramsObj ? paramsObj["repeat"] : null
    let repeatHash = {}, repeatData = [];
    if(hasRepeat && (isStringItem || isNumberItem)) {
        resultData.forEach(item => {
            if(!repeatHash[item] && item != null && item != undefined) {
                repeatData.push(item);
                repeatHash[item] = true
            }
        })
    }

    // number of times to get the same element
    let hasSame = paramsObj ? paramsObj["same"] : null
    let sameObj = {};
    if(hasSame && (isStringItem || isNumberItem)) {
        sameObj = resultData.reduce((obj, cur) => {
            if(cur in obj) {
                obj[cur]++;
            }else {
                obj[cur] = 1;
            }
            return obj
        }, {})
    }

    return {
        resultData: resultData,
        repeatData: repeatData,
        sameObj: sameObj
    }
}