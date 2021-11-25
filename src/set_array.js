export function SetArray () {
    this.resDataSplice = [];
    this.resObjDataSplice = [];
}

SetArray.prototype.spliceItem = function(data, num) {
    this.resDataSplice = this.resDataSplice.reduce((pre, cur) => {
        if(data != cur) {
            return pre.concat(cur) 
        }else {
            return pre
        }
    }, [])

    let len = this.resDataSplice.length;
    if(len < num) {
        this.resDataSplice.unshift(data);
    }else {
        this.resDataSplice.splice(len-1, 1)
        this.resDataSplice.unshift(data);
    }
    
    return this.resDataSplice;
}

SetArray.prototype.spliceObjItem = function(obj, key, num) {
    this.resObjDataSplice = this.resObjDataSplice.reduce((pre, cur) => {
        if(obj[key] != cur[key]) {
            return pre.concat(cur)
        }else {
            return pre
        }   
    }, [])

    let len = this.resObjDataSplice.length;
    if(len < num) {
        this.resObjDataSplice.unshift(obj);
    }else {
        this.resObjDataSplice.splice(len-1, 1)
        this.resObjDataSplice.unshift(obj);
    }

    return resObjDataSplice
}
