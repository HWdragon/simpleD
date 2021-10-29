const simpArr_Num = (dataArr, paramsObj) => {
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

    // get max || min    
    // only element is a number or string number  || [1 ,'1']
    let hasMax = paramsObj ? paramsObj["getMax"] : null
    let hasMin = paramsObj ? paramsObj["getMin"] : null
    let maxVal, minVal;
    // delete [null,undefined,NaN,'']
    resultData = resultData.filter(x => !!x == true || x == 0);
    if(hasMax && (isStringItem || isNumberItem)) {
        maxVal = resultData.reduce((prev, next) => {
            return Math.max(prev, next)
        })
    }
    if(hasMin && (isStringItem || isNumberItem)) {
        minVal = resultData.reduce((prev, next) => {
            return Math.min(prev, next)
        })
    }

    return {
        resultData: resultData,
        maxVal: maxVal,
        minVal: minVal
    }
}