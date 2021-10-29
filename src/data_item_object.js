;
const simpArr_Obj = (dataArr, paramsObj) => {
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
    let hasKey = paramsObj ? paramsObj["key"] : false;
    if(hasKey && isObjItem) {
        resultData = resultData.map((data, index) => {
            return {...data, key: index}
        })
    }

    // sort data
    let hasSortItems = paramsObj ? paramsObj["sortItems"] : null
    if(hasSortItems) { 

    }   

    // get max min
    let hasMax = paramsObj ? paramsObj["max"] : []
    let hasMin = paramsObj ? paramsObj["min"] : []
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
        maxObj: maxObj,
        minObj: minObj
    }
} 