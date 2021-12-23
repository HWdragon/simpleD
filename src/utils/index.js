export const keysJoin = (obj, keys) => {
    let n = keys.length, key = [];
    while(n--) {
        key.push(obj[keys[n]]);
    }

    return key.join("|");
}

export const sortBy1 = (props, direction) => {
    return (a, b) => {
        if(direction == "asc") {
            return a[props] - b[props]
        }else {
            return b[props] - a[props]
        }
    }
}

export const sortBy2 = (props1, props2, direction) => {
    return (a, b) => {
        if(direction == "asc") {
            if(a[props1] == b[props1]) {
                return a[props2] - b[props2]
            }
            return a[props1] - b[props1]
        }else {
            if(a[props1] == b[props1]) {
                return b[props2] - a[props2]
            }
            return b[props1] - a[props1]
        }
    }
}