export const keysJoin = (obj, keys) => {
    let n = keys.length, key = [];
    while(n--) {
        key.push(obj[keys[n]]);
    }

    return key.join("|");
}