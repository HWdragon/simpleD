
import React from "react";
import { simpArr_arr } from "../data_item_array";
import { simpArr_Num } from "../data_item_number";
import { simpArr_Obj } from "../data_item_object";
import { simpArr_Str } from "../data_item_string";

let a = [
    {"a":"aaaa", "b": "bbbbbbb", "c": "cccccccccccc", "d": "dddddddddd", e: "test", num: 12, num1: -45},
    {"a":"wer", "b": "11313", "c": "s3fdd", "d": "041", e: "e", f: "f",num: 3, num1: -60},
    {"a":"aa", "b": "bb", "c": "cc", "d": "dd", num: 100, num1: 2},
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
    {name:"dragon", win:3, lose:2},
    {name:"jack", win:3.5, lose:1},
    {name:"ben", win:1, lose:1.5},
    {name:"skip", win:4, lose:0.5}
]
       
// var maxMin = simpArr_Obj(b,{key:true, max:["num"], min:["num"], repeat:true});
// var maxMin = simpArr_Obj(a,{key:true, max: ["num"], min: ["num1"], repeat: true});
// var maxMin = simpArr_Str(b,{key:true, max:["num"], min:["num"], repeat:true});
// var maxMin = simpArr_Str(b_1,{key:true, same: ["100t", "sd","as", "100"], max:["num"], min:["num"], repeat:true});
// var maxMin = simpArr_Num(b_3,{key:true, same:true,  repeat:true,getMax: true, getMin: true});


export const TestDemo = () => {

    var maxMin = simpArr_Obj(a,{
        // key:true, 
        // max:["num"], 
        // min:["num"], 
        sortKey:["num", "num1"],
        filterObj: {
            e: "test",
            f: "0f0"
        }, 
        repeatKeys: ["a", "b","f"],
        sort: "win"
    });

    console.log("maxmin=======", maxMin)

    return <div> 
                <span>人生充满无奈 what fuck up!!!67</span> 
                <div className="img1"></div>
                <div className="img2"></div>
                <div className="img3"></div>
                <img src={require('../images/4.png')}/> 
            </div>
}