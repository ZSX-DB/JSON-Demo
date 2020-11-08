/**
 * JSON.stringify() 方法将一个 JavaScript 值（对象或者数组）转换为一个 JSON 字符串
 * JSON.stringify(value[, replacer [, space]])
 */

// value 将要序列化成 一个 JSON 字符串的值

// replacer
// 如果该参数是一个函数，则在序列化过程中，被序列化的值的每个属性都会经过该函数的转换和处理；
// 如果该参数是一个数组，则只有包含在这个数组中的属性名才会被序列化到最终的 JSON 字符串中；
// 如果该参数为 null 或者未提供，则对象所有的属性都会被序列化

// space
// 指定缩进用的空白字符串，用于美化输出（pretty-print）
// 如果参数是个数字，它代表有多少的空格；上限为10。该值若小于1，则意味着没有空格
// 如果该参数为字符串（当字符串长度超过10个字母，取其前10个字母），该字符串将被作为空格
// 如果该参数没有提供（或者为 null），将没有空格

let obj = {
    name: 'ZES',
    age: 24,
    sex: 'man',
    arr: [1, 5, 3, 7],
    child: {},
    empty: null,
    unknown: undefined,
    only: Symbol()
}

// 忽略了Symbol类型和undefined类型，当存在BigInt类型时，会报错
let obj1 = JSON.stringify(obj)
// console.log('obj1的值为 ', obj1)

// 当replacer为函数，它有两个参数，键（key）和值（value），它们都会被序列化
function replacer(key, value) {
    switch (typeof value) {
        case "string":
            return value + ' illegal'
        case "undefined":
            return 'If I defined'
        case "symbol":
            return 'I am only'
        default:
            return value
    }
}

let obj2 = JSON.stringify(obj, replacer)
// console.log('obj2的值为 ', obj2)

// 如果 replacer 是一个数组，数组的值代表将被序列化成 JSON 字符串的属性名

// 返回的只有age和sex两个属性
let obj3 = JSON.stringify(obj, ['age', 'sex'])
// console.log('obj3的值为 ', obj3)

let obj4 = JSON.stringify(obj, null, 4)
// console.log('obj4的值为 ', obj4)

// toJSON方法
// 如果一个被序列化的对象拥有 toJSON 方法，那么该 toJSON 方法就会覆盖该对象默认的序列化行为
// 不是该对象被序列化，而是调用 toJSON 方法后的返回值会被序列化

let newObj = {
    foo: 'foo',
    toJSON() {
        return {
            bar: 'bar'
        }
    }
}

let no1 = JSON.stringify(newObj)
// console.log('no1的值为', no1)


/////////////////////
// 其他类型
/////////////////////

let arr=[13,'beef',false,Symbol(3),null,{a:3,b:6},function () {},undefined]

// Symbol，function，undefined 会被转化为null
console.log(JSON.stringify(arr))

// arr和普通的引用类型对应的不一样，比如Symbol在外部为undefined，在arr为null
let a='tcl',b=17,c=false,d=function(){},e=10n,f=undefined,g=Symbol(3),h=null

console.log('string类型',JSON.stringify(a),typeof JSON.stringify(a))
console.log('number类型',JSON.stringify(b),typeof JSON.stringify(b))
console.log('boolean类型',JSON.stringify(c),typeof JSON.stringify(c))
console.log('function类型',JSON.stringify(d),typeof JSON.stringify(d))
// console.log('bigInt类型',JSON.stringify(e),typeof JSON.stringify(e))
console.log('undefined类型',JSON.stringify(f),typeof JSON.stringify(f))
console.log('symbol类型',JSON.stringify(g),typeof JSON.stringify(g))
console.log('null类型',JSON.stringify(h),typeof JSON.stringify(h))



