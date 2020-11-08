/**
 * 实现JSON.stringify()方法
 */

function toStringify(params) {

    // 删除倒数最后的字符，用于stringify引用类型
    const removeLastStr = str => str.substring(0, str.length - 1)

    const str = p => `"${p}"`
    const num = p => p.toString()
    const bool = p => p.toString()
    const func = p => undefined
    const un = p => undefined
    const sym = p => undefined
    const obj = p => forObject(p)
    const big = p => {
        throw new TypeError('Do not know how to serialize a BigInt')
    }

    /////////////////////
    // 由于在数组或对象内，某些类型会与外界表现不一样，甚至在数组和对象表现均不一样，因此需要定制方法
    /////////////////////
    const forObject = p => {
        if (typeof p === 'number' || typeof p === 'string' || typeof p === 'boolean' || typeof p === 'bigint') {
            return result(p)
        } else if (typeof p === 'object') {
            // 三种可能 null，object，array
            switch (Object.prototype.toString.call(p)) {
                case '[object Null]':
                    return 'null'
                case '[object Array]':
                    let str1 = '['
                    p.forEach(item => str1 += `${forObject(item)},`)
                    str1 = removeLastStr(str1)
                    str1 += ']'
                    return str1
                case '[object Object]':
                    if (p.toJSON) {
                        p = p.toJSON()
                    }
                    let str2 = '{'
                    for (const [key, value] of Object.entries(p)) {
                        switch (typeof value) {
                            case "object":
                                if (Object.prototype.toString.call(value) === '[object Object]') {
                                    Object.keys(value).length !== 0 ? str2 += `"${key}":${forObject(value)},` : str2 += `"${key}":{},`
                                } else {
                                    str2 += `"${key}":${forObject(value)},`
                                }
                                break
                            case "string":
                                str2 += `"${key}":"${value}",`
                                break
                            case "boolean":
                                str2 += `"${key}":${value},`
                                break
                            case "number":
                                str2 += `"${key}":${value},`
                                break
                            default:
                                break
                        }
                    }
                    str2 = removeLastStr(str2)
                    str2 += '}'
                    return str2
            }
        } else {
            return 'null'
        }
    }

    const result = params => {
        switch (typeof params) {
            case "string":
                return str(params)
            case "number":
                return num(params)
            case "boolean":
                return bool(params)
            case "function":
                return func(params)
            case "undefined":
                return un(params)
            case "symbol":
                return sym(params)
            case "bigint":
                return big(params)
            case "object":
                return obj(params)
        }
    }

    return result(params)

}


let a = 'tcl',
    b = 17,
    c = false,
    d = function () {
    },
    e = undefined,
    f = Symbol(3),
    g = 10n,
    h = null,
    i = {a: 3},
    j = [1, 3, 5]

// console.log('string类型',JSON.stringify(a),toStringify(a))
// console.log('number类型',JSON.stringify(b),toStringify(b))
// console.log('boolean类型',JSON.stringify(c),toStringify(c))
// console.log('function类型',JSON.stringify(d),toStringify(d))
// console.log('undefined类型',JSON.stringify(e),toStringify(e))
// console.log('symbol类型',JSON.stringify(f),toStringify(f))
// console.log('bigint类型',JSON.stringify(g),toStringify(g))
// console.log('null类型',JSON.stringify(h),toStringify(h))
// console.log('array类型',JSON.stringify(i),toStringify(i))
// console.log('object类型',JSON.stringify(j),toStringify(j))


let arr = [13, 'beef', false, Symbol(3), null, {a: 3, b: 6}, function () {
}, undefined, [5, 'str', {c: 'cs'}]]

console.log(JSON.stringify(arr))
console.log(toStringify(arr))
// console.log(JSON.parse(toStringify(arr)))

let obj = {
    name: 'ZES',
    age: 24,
    sex: 'man',
    arr: [1, 5, 3, 7],
    child: {
        son: {},
        daughter: {
            a: 3,
            b: 4
        }
    },
    empty: null,
    bool: true,
    func: function () {
    },
    unknown: undefined,
    only: Symbol(),
    newArr: [
        5, 'str', {c: 'cs'}
    ]
}

console.log(JSON.stringify(obj))
console.log(toStringify(obj))
// console.log(JSON.parse(toStringify(obj)))

// 多层嵌套对象
let nestObj = {
    b: {
        c: {
            d: {
                e: {
                    g: 'GG'
                }
            }
        }
    }
}

console.log(JSON.stringify(nestObj))
console.log(toStringify(nestObj))

// 循环引用对象
let loopObj={
    a:'abc'
}
loopObj.myself=loopObj
console.log(loopObj)

// 报错 TypeError: Converting circular structure to JSON
// console.log(JSON.stringify(loopObj))
// 报错 RangeError: Maximum call stack size exceeded
// console.log(toStringify(loopObj))

