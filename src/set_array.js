export const SetArray = () => {
    let resDataSplice = [];
    let resObjDataSplice = [];
   
    // data：add new item
    // num： Maximum length
    // pay one's respects to my once leader, memo, lottery project
    let spliceItem = (data, num) => {
        resDataSplice = resDataSplice.reduce((pre, cur) => {
            if(data != cur) {
               return pre.concat(cur) 
            }else {
                return pre
            }
        }, [])

        let len = resDataSplice.length;
        if(len < num) {
            resDataSplice.unshift(data);
        }else {
            resDataSplice.splice(len-1, 1)
            resDataSplice.unshift(data);
        }
        
        return resDataSplice;
    };
    let spliceObjItem = (obj, key, num) => {
        resObjDataSplice = resObjDataSplice.reduce((pre, cur) => {
            if(obj[key] != cur[key]) {
                return pre.concat(cur)
            }else {
                return pre
            }   
        }, [])

        let len = resObjDataSplice.length;
        if(len < num) {
            resObjDataSplice.unshift(obj);
        }else {
            resObjDataSplice.splice(len-1, 1)
            resObjDataSplice.unshift(obj);
        }

        return resObjDataSplice
    }

    return {
        resDataSplice,
        resObjDataSplice,
        spliceItem,
        spliceObjItem
    }
}