export class SetBroad  {
    resSort = {
        active: [],
        other: [],
        result: []
    };
    // pay one's respects to my "friend", jack.teng  [live broadcast]
    // if you remember? , my homie
    // it is better to use reduce
    sortObjItem = (data, key) => {
        let dataCopy = [...data];
        let { result,active,other } = this.resSort;

        dataCopy.forEach((item) => {
            if(item[key]) {
                active.push(item)
            }else {
                other.push(item);
            }
        })
        result.push(...active.concat(other));
        
        return this.resSort
    };
    subscribeMes = (mes, key, tit) => {
        let tag = mes[key];
        let name = mes[tit];
        let active = [], other = []; 
        let { result } = this.resSort;
        this.resSort.result = result.reduce((pre, cur) => {
            if(
                ((tag && cur[tit] == name) || (tag && cur[key])) ||
                (!tag && name != cur[tit] && cur[key])
            ) {
                active.push(Object.assign(cur, {[key]: true}))
            }else {
                other.push(Object.assign(cur, {[key]: false}))
            }   

            return active.concat(other);
        }, [])

        // reset
        this.resSort.active = active;
        this.resSort.other = other;

        return this.resSort
    }
}