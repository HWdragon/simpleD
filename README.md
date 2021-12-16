# Simple Data

主要是集合的处理，收集一些以及工作中用到过，或者会用到的一些集合处理方法，不喜勿喷，励志做一个合格的小开发

let a = [
    {"a":"aaaa", "b": "bbbbbbb", "c": "cccccccccccc", "d": "dddddddddd", e: "test", f: "1ee", num: 12, num1: -45},
    {"a":"wer", "b": "11313", "c": "s3fdd", "d": "041", e: "e", f: "f",num: 3, num1: -60},
    {"a":"aa", "b": "bb", "c": "cc", "d": "dd", num: 100, num1: 2},
    {"a":"aa1", "b1": "bb1", "c1": "cc1", "d1": "dd1", num: 100, num1: 21},
    {"a":"a112", "b": "b11", "c": "c00", "d": "dkc",  e: "test", f: "test1",num: -100, num1: 1},
    {"a":"aa", "b": "bb", "c": "000", "d00": "7800",  e: "e", f: "0f0",num: -10, num1: 10},
    {"a":"aa", "b": "bb", "c": "asd", "d": "dd",  e: "eyt", f: "0f0",num: -17, num1: 11},
    {"a":"f", "b": "u", "c": "c", "d": "k",  e: "!", f: "!!",num: 5, num1: 5}
];
let b = [2,"ad", undefined,null,"2", 2, 4, 5, "e12", 1, 3, 3, 2, "sdf", "12",null, undefined,"fuck", "fuckup", "sdf"]
let b_1 = [100,"qwe", "as","sd",-911, 2, "12ds","sd","fd","ds","as","sd","dx1","100t","50g","128g","256g","100t","100","1001","1022"]
let b_2 = [12,343,44,33,-132,0,-1,31,3,4,65,-9,0,3,11,1,2]
let b_3 = ['12', '3430', '44', 33, '-132', 0, -1, 31, 3, '4', 65, -9, 0, '3', 11, '1', '2', 0, undefined, false, null,NaN,'']
let c = [
    {name:"dragon", win:3, lose:2, status: false},
    {name:"jack", win:3.5, lose:1, status: false},
    {name:"ben", win:1, lose:1.5, status: true},
    {name:"skip", win:4, lose:0.5, status: false},
    {name:"bobi", win:1.1, lose:1.6, status: true}
]

## data_item_array

## data_item_number
数组里的元素为 `number` 元素 
最大值 getMax: true 
最小值 getMin: true

```bash
simpArr_Num(b_3, {getMax: true, getMin: true});
```

## data_item_string
数组里的元素为 `string` 元素
去重 repeat:true 
得到集合每个元素出现的次数 same: true ，100 和 "100" 视为同一个

```bash
simpArr_Str(b_1, {same: true, repeat:true});
```

## data_item_object
数组里的元素为 `object` 元素
为每个item添加索引：key:true （渲染列表时有时需要key=index）
filterObj: {[key]:[value]} 筛选得到，对应所出现的item阵列：{e: [{……}，{……}], f: …… ……, filterIndex;[]} ，filterResult为出现的索引集合
sortKey:[arg1, arg2]  排序默认取`arg1的值`排序，相同值的话则取`arg2的值`排序
repeatKeys: ["a", "b","f"]  以repeatKeys里的元素为key取得每条item对应key的`value`值，拼接在一起，查看是否有相同的 repeatKeysResult["res"]为最终不重复的集合，repeatKeysResult["repeat"]为筛选出重复的item
max:["num"]: 得到数组里[num]对应key的最大值的那条item
min:["num"]: 得到数组里[num]对应key的最小值的那条item

```bash
simpArr_Obj(a, {
    key:true, 
    filterObj:{e: "test",f: "0f0"}, 
    sortKey:["num", "num1"],
    repeatKeys: ["a", "b","f"],
    max:["num"], 
    min:["num"] 
})
```