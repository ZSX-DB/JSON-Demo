/**
 * 提升JSON.stringify()的性能
 */

// 由于 JavaScript 是动态性很强的语言，所以对于一个 Object 类型的变量，其包含的键名、键值、键值类型最终只能在运行时确定。
// 因此，执行JSON.stringify()很多开销花费在这上面

// 但如果知道这个 Object 中的键名、键值信息,我们可以定制化stringify

let obj = {
    name: 'ZES',
    age: 24,
    sex: '男'
}


function objToStringify(obj) {
    return `{"name":"${obj.name}","age":${obj.age},"sex":"${obj.sex}"}`
}

//可以看出，定制的stringify方法是效率很高的，因此有以下优化思路
// 1、需要先确定对象的结构信息
// 2、根据其结构信息，为该种结构的对象创建“定制化”的stringify方法，其内部实际是通过字符串拼接生成结果的；
// 3、最后，使用该“定制化”的方法来 stringify 对象即可

