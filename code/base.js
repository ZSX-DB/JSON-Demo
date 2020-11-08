/**
 * JSON 是一种语法，用来序列化对象、数组、数值、字符串、布尔值和 null
 * 反序列化就是从有序字节流重建对象，恢复对象状态
 */

// JSON属性名称必须是双引号括起来的字符串；最后一个属性后不能有逗号
let personInfo={
    name:'ZES',
    age:24,
    sex:'man'
}

// 序列化
let newPersonInfo=JSON.stringify(personInfo)
console.log(newPersonInfo)

// 反序列化
console.log(JSON.parse(newPersonInfo))

let numObj={
    n1: 27,
    n2: 46
}
let newNumObj=JSON.stringify(numObj)
console.log(newNumObj)
