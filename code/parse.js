/**
 * JSON.parse() 方法用来解析JSON字符串，构造由字符串描述的JavaScript值或对象
 * 提供可选的 reviver 函数用以在返回之前对所得到的对象执行变换(操作)
 */

// JSON.parse(text[, reviver])

let json = '{"result":true, "count":42}'
let obj1 = JSON.parse(json)

console.log(obj1)


function reviver(key, value) {
    if (key === "result") {
        return false
    } else if (key === "count") {
        return 81
    }
    return value
}

let obj2 = JSON.parse(json, reviver)
console.log(obj2)

// JSON.parse()
// JSON.parse("[1, 2, 3, 4, ]") 是不合理的