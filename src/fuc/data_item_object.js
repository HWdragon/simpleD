import { 
    keysJoin,
    sortBy1,
    sortBy2 
} from "../utils";

export const simpArr_Obj = (dataArr, paramsObj) => {
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

    // add key = index
    let hasKey = paramsObj && paramsObj["key"] ? paramsObj["key"] : false;
    if(hasKey && isObjItem) {
        // resultData = resultData.map((data, index) => {
        //     return {...data, key: index}
        // })
    }

    // filter data 
    // filterObj: { e: "test", f: "0f0"}, 
    // data里的单条obj里如果有 e: "test" 的话，则返回该obj  result : { e: [{……}, …… ……] }  
    let hasFilterObj = paramsObj && paramsObj["filterObj"] ? paramsObj["filterObj"] : []
    let filterObjKeys = Object.keys(hasFilterObj);
    let filterResult = {
        // selected index
        filterIndex: []
    };
    filterObjKeys.forEach(item => {
        filterResult[item] = []
    })
    if(hasFilterObj) { 
        resultData.forEach((cur, index) => {
            filterObjKeys.forEach(item => {
                if((item in cur) && (hasFilterObj[item] == cur[item])) {
                    filterResult[item].push(cur);
                    filterResult["filterIndex"].push(index)
                }
            })
        })
    }  

    // sort key
    let hasSort = paramsObj && paramsObj["sortKey"] ? paramsObj["sortKey"] : [] ;
    let desc = paramsObj && paramsObj["direction"] ? paramsObj["direction"] : "asc" ;
    let sortLen = hasSort.length;
    let sortResult= [];
    if(sortLen == 1) {
        sortResult = resultData.sort(sortBy1(hasSort[0], desc))
    }else if(sortLen == 2) {
        sortResult = resultData.sort(sortBy2(hasSort[0], hasSort[1], desc))
    }
    
    // no-repeat repeatKeys=[key1,key2]：repeatKeys为数组，key为item里的[key],以拿到对应key[value]的值, 拼接所选中的[value]值，来筛选
    let hasRepeatKeys = paramsObj && paramsObj["repeatKeys"] ? paramsObj["repeatKeys"] : null
    let repeatKeysHash = {}, repeatKeysResult = {res: [], repeat: []};
    if(hasRepeatKeys) {
        resultData.forEach(item => {
            let k = keysJoin(item, hasRepeatKeys);
       
            if(!(k in repeatKeysHash)) {
                repeatKeysHash[k] = true;
                repeatKeysResult["res"].push(item)
            }else {
                repeatKeysResult["repeat"].push(item)
            }
        })
    }

    // item为obj对象的去重
    let hasRepeat = paramsObj && paramsObj["repeat"] ? paramsObj["repeat"] : null
    let newSetRepeat = [];
    if(hasRepeat) {
        newSetRepeat = [...new Set(resultData.map(data => JSON.stringify(data)))].map(item => JSON.parse(item))
    }

    // get max min
    let hasMax = paramsObj && paramsObj["max"] ? paramsObj["max"] :[]
    let hasMin = paramsObj && paramsObj["min"] ? paramsObj["min"] :[]
    let maxObj = {}, minObj={};
    if(hasMax.length > 0 && isObjItem) {
        hasMax.forEach(item => {
            maxObj[item] = resultData.reduce((prev, next) => {
                if(prev[item] < next[item]) {
                    return next
                }else {
                    return prev
                }
            })
        })
    }
    if(hasMin.length > 0 && isObjItem) {
        hasMin.forEach(item => {
            minObj[item] = resultData.reduce((prev, next) => {
                if(prev[item] < next[item]) {
                    return prev
                }else {
                    return next
                }
            })
        })
    }

    // get [key]:[value] forEach  {A: [1,3,4,5,6]}
    let hasKeyVlaue = paramsObj && paramsObj["keyVlaue"] ? paramsObj["keyVlaue"] : null
    let keyVlaueObj = {};
    let keyArea, keyTarget, keyChild, keyChildLen;
    if(hasKeyVlaue && hasKeyVlaue["key"] && hasKeyVlaue["value"] && hasKeyVlaue["child"] && isObjItem) {
        keyArea = hasKeyVlaue["key"];  
        keyTarget = hasKeyVlaue["value"]; 
        keyChild = hasKeyVlaue["child"];
        keyChildLen = hasKeyVlaue["child"].length;

        if(keyChildLen > 2) {
            console.group("child lenght maximum 2")
            return;
        }

        resultData.forEach(item => {
            keyVlaueObj[item[keyArea]] = [];
        }) 
        // keyVlaue[child] maximum length = 2 
        resultData.forEach(item => {
            if(
                keyChildLen == 2 && 
                item.hasOwnProperty(keyChild[0]) && 
                item[keyChild[0]][0].hasOwnProperty(keyChild[1])
            ) {
                item[keyChild[0]].forEach(c1 => {
                    c1[keyChild[1]].forEach(c2 => {
                        keyVlaueObj[item[keyArea]].push(c2[keyTarget])
                    })
                })
            }else if(keyChildLen == 1) {
                item[keyChild[0]].forEach(c1 => {
                    keyVlaueObj[item[keyArea]].push(c1[keyTarget])
                })
            }
        })      
    }

    // get {[key]: amount}
    let hasSelectAmountKey = paramsObj && paramsObj["selectAmountKey"] ? paramsObj["selectAmountKey"] : null
    let selectAmountResult = {};
    if(hasSelectAmountKey && hasSelectAmountKey.length > 0) {
        resultData.forEach(item => {
            hasSelectAmountKey.forEach(ele => {
                if(!selectAmountResult[item[ele]]) {
                    selectAmountResult[item[ele]] = 1;
                }else {
                    selectAmountResult[item[ele]] = selectAmountResult[item[ele]] += 1;
                }
            })
        })
    }

    return {
        resultData: resultData,
        filterResult: filterResult,
        repeatKeysResult: repeatKeysResult,
        newSetRepeat: newSetRepeat,
        sortResult: sortResult,
        maxObj: maxObj,
        minObj: minObj,
        keyVlaueObj: keyVlaueObj,
        selectAmountResult: selectAmountResult
    }

} 