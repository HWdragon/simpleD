import { 
    keysJoin,
    sortBy1,
    sortBy2 
} from "./utils";

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
        resultData = resultData.map((data, index) => {
            return {...data, key: index}
        })
    }

    // filter data 
    // result : { filterKey1: [{……}，{……}] }
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
    
    // no-repeat 
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

    return {
        resultData: resultData,
        filterResult: filterResult,
        repeatKeysResult: repeatKeysResult,
        sortResult: sortResult,
        maxObj: maxObj,
        minObj: minObj
    }

} 