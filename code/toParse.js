function toParse(str){

    // 索引
    let i=0
    // ch是当前扫描光标所处位置的字符
    let ch = str[i]

    /////////////////////
    // 函数
    /////////////////////

    // c为字符，关键函数，进行匹配
    const next = c => {
        if(c&&str[i]!==ch){
            throw new Error("Expected '" + c + "' instead of '" + ch + "'")
        }
        i++
        ch=str[i]
        return ch
    }

    // 匹配{}
    const leftBrace=()=>next('{')
    const rightBrace=()=>next('}')

    // 匹配[]
    const leftBracket=()=>next('[')
    const rightBracket=()=>next(']')

    // 匹配标点符号
    const colon=()=> next(':')
    const comma=()=>next(',')
    const dot=()=>next('.')
    const quote=()=>next('\"')

    // 匹配布尔类型和null
    const boolNull=()=>{
        switch (ch) {
            case 't':
                next('t')
                next('r')
                next('u')
                next('e')
                return true
            case 'f':
                next('f')
                next('a')
                next('l')
                next('s')
                next('e')
                return false
            case 'n':
                next('n')
                next('u')
                next('l')
                next('l')
                return null
        }
    }

    // 处理空白字符
    const white=()=>{
        while (ch&&ch<=''){
            next()
        }
    }

    // 处理数字符号
    const sign=()=> {
        if(ch&&ch==='-'){
            next()
            return -1
        }else if(ch&&ch==='+'){
            next()
            return 1
        }
        return 1
    }

    // 在计算器中，数据较大时，用科学记数法表示，E或e后面数字表示10的次幂数
    // 用于判断是否存在这种情况
    const expo=()=> {
        if (ch && (ch === 'e' || ch === 'E')) {
            next()
            return 1
        }
        return 0
    }

    // 处理不带'\''的字符串
    const word=()=>{
        let parser=''
        while (ch && ch !=='\"'){
            parser+=ch
            next()
        }
        return parser
    }

    // 处理数字序列
    const digitSequence=()=>{
        let seq= 0
        while (ch && /[0-9]/.test(ch)){
            seq+=parseInt(ch)
            next()
        }
        return seq
    }

    // 处理数字
    const number=()=>{
        let parser=0
        // 如果是let sign = sign()会报错
        let s=sign()

        let integer,fractional,exponential

        // 处理整数
        integer=digitSequence()

        // 处理小数
        if (ch&& ch==='.'){
            dot()
            fractional=digitSequence()
        }

        // 处理特别大的数
        expo()?exponential=digitSequence():exponential=0

        parser=integer
        if(fractional) parser+=(fractional/10**fractional.toString().length)
        if(exponential) parser=10**exponential

        return s===-1?-parser:parser

    }

    // 处理字符串
    const string=()=>{
        quote()
        let parser=word()
        quote()
        return parser
    }


    /////////////////////
    // 适配类型
    /////////////////////

    const element=()=>{
        if(ch&&ch==='"'){
            return string()
        }else if(ch&&ch==='['){
            return array()
        }else if(ch&&ch==='{'){
            return object()
        }else if(ch&&/[+\-0-9]/.test(ch)){
            return number()
        }else if(ch&&/[tfn]/.test(ch)){
            return boolNull()
        }else {
            if(ch){
                throw new Error("Error in parsing. '" + ch + "' is invalid as an element in array at " + i + ".")
            }
        }
    }

    const elements=()=>{
        let ele=[]
        while (ch&&/["\[{+\-0-9tfn]/.test(ch)){
            ele.push(element())
            if(ch&&ch===','){
                comma()
            }else break
            white()
        }
        return ele
    }

    const keyValue=()=>{
        let result=[]
        result[0]=string()
        white()
        colon()
        white()
        result[1]=element()
        return result
    }

    const keyValues=()=>{
        let parser={}
        while (ch&&ch==='"'){
            let kv=keyValue()
            parser[kv[0]]=kv[1]
            white()
            if(ch&&ch===','){
                comma()
            }else break
            white()
        }
        return parser
    }

    /////////////////////
    // 处理引用类型
    /////////////////////

    const array=()=>{
        leftBracket()
        white()
        let ele=elements()
        white()
        rightBracket()
        return ele
    }

    const object=()=>{
        leftBrace()
        white()
        let kvs=keyValues()
        white()
        rightBrace()
        return kvs
    }

    return element()

}



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
    func: function () {},
    unknown: undefined,
    only: Symbol()
}

console.log(JSON.stringify(obj))
console.log(toParse(JSON.stringify(obj)))