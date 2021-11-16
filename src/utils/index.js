export const keysJoin = (obj, keys) => {
    let n = keys.length, key = [];
    while(n--) {
        key.push(obj[keys[n]]);
    }

    return key.join("|");
}

export const sortBy1 = (props) => {
    return (a, b) => {
        return a[props] - b[props]
    }
}

export const sortBy2 = (props1, props2) => {
    return (a, b) => {
        if(a[props1] == b[props1]) {
            return a[props2] - b[props2]
        }
        return a[props1] - b[props1]
    }
}