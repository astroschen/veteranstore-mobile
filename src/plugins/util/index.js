/**
 * 工具类合集
 */
export default {
  /**
   * 排序 大到小
   * @param data
   */
  sortArrBs: function (data, key) {
    const sequence = (a, b) => {
      return b[key] - a[key]
    }
    data.sort(sequence)
    return data
  },

  /**
   * 排序 小到大
   * @param data
   */
  sortArrSb: function (data, key) {
    const sequence = (a, b) => {
      return a[key] - b[key]
    }
    data.sort(sequence)
    return data
  },

  /**
   * 根据数组里的某个对象的字段变成key的json格式
   * @param arr
   * @param key
   * @returns {{}}
   */
  setArrToJson (arr, key) {
    arr = arr || []
    const json = {}
    arr.map((val) => {
      json[val[key]] = val
    })
    return json
  },

  /**
   * 数组里单对象相同的key合并成数组并以{key:[]}输出
   * @param arr
   * @param key
   * @returns {{}}
   */
  setArrToKeyArr (arr, key) {
    arr = arr || []
    const json = {}
    arr.map((val) => {
      if (!json[val[key]]) {
        json[val[key]] = []
      }
      json[val[key]].push(val)
    })
    return json
  },

  /**
   * 将数组里的多个对象相同key合并成数组并以{key:[]}输出
   * @param {f} arr
   * @param {*} key
   * @returns
   */
  setArrJsonToKeyArr (arr, key) {
    arr = arr || []
    const json = {}
    arr.map(val => {
      if (val[key]) {
        for (const keys in val[key]) {
          if (!Array.isArray(json[keys])) {
            json[keys] = []
          }
          json[keys].push(val)
        }
      }
    })
    return json
  },

  /**
   * 将数组里多个对象相同key合并成数组并以该对象的value做key{value:[]}输出
   * @param {*} arr
   * @param {*} key
   * @returns
   */
  setArrJsonToValueArr (arr, key) {
    arr = arr || []
    const json = {}
    arr.map(val => {
      if (val[key]) {
        for (const keys in val[key]) {
          if (!Array.isArray(json[val[key][keys]])) {
            json[val[key][keys]] = []
          }
          json[val[key][keys]].push(val)
        }
      }
    })
    return json
  },

  /**
   * 相同的key合并成数组并以{key:[]}输出 深度
   * @param arr
   * @param key  ’a.b.c‘
   * @returns {{}}
   */
  setArrToKeyArrDeep (arr, key) {
    const json = {}
    arr.map(val => {
      let obj = val
      key.split('.').map(vals => {
        obj = obj[vals]
      })
      if (!json[obj]) {
        json[obj] = []
      }
      json[obj].push(val)
    })
    return json
  },

  /**
   * 将多层嵌套的数组转换为一层数组
   * @param {*} arr
   * @param {*} newArr
   * @returns
   */
  arrOfOneDimension (arr, newArr) {
    for (const key of arr) {
      if (Array.isArray(key)) {
        // 如果还是数组继续递归调用
        this.arrOfOneDimension(key, newArr)
      } else {
        newArr.push(key)
      }
    }
    return newArr
  },

  /**
   * 小数点工具
   * @param num
   * @param max
   * @returns {string|number}
   */
  keepPoint: function (num, max) {
    num = parseFloat(num)
    // 获取小数点的位置
    const y = String(num).indexOf('.') + 1
    // 获取小数点后的个数
    const count = String(num).length - y
    if (y > 0) {
      return parseFloat(parseFloat(num).toFixed((max || count)))
    } else {
      return parseInt(num)
    }
  },

  /**
   * 返回限定范围随机数
   * @param {*} min
   * @param {*} max
   */
  getRandomNum: function (min, max) {
    return Math.floor(Math.random() * (max - min)) + min
  },

  /**
   * 返回随机的颜色数组
   * @param num 数量
   * @param max 最大
   * @param min 最小
   */
  getRandomColor: function (num, min, max) {
    const arr = []
    for (let i = 0; i < num; i++) {
      arr.push([this.getRandom(min, max), this.getRandom(min, max), this.getRandom(min, max)])
    }
    return arr
  },

  /**
   * 深拷贝
   *  @param source Array/Object  对象/数组
   */
  deepClone: function (source) {
    // 定义一个变量
    let result
    // 如果当前需要深拷贝的是一个对象的话
    if (typeof source === 'object') {
      // 如果是一个数组的话
      if (Array.isArray(source)) {
        result = [] // 将result赋值为一个数组，并且执行遍历
        for (const i in source) {
          // 递归克隆数组中的每一项
          result.push(this.deepClone(source[i]))
        }
        // 判断如果当前的值是null的话；直接赋值为null
      } else if (source === null) {
        result = null
        // 判断如果当前的值是一个RegExp对象的话，直接赋值
      } else if (source.constructor === RegExp) {
        result = source
      } else {
        // 否则是普通对象，直接for in循环，递归赋值对象的所有值
        result = {}
        for (const i in source) {
          result[i] = this.deepClone(source[i])
        }
      }
      // 如果不是对象的话，就是基本数据类型，那么直接赋值
    } else {
      result = source
    }
    // 返回最终结果
    return result
  },

  /**
   * 十六进制颜色转换为带透明度的颜色
   * @param _color 十六进制颜色
   * @param _opactity 透明度
   * @returns {string} rgba
   */
  hexToRGBA (_color, _opacity) {
    let sColor = _color.toLowerCase()
    // 十六进制颜色值的正则表达式
    const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/
    // 如果是16进制颜色
    if (sColor && reg.test(sColor)) {
      if (sColor.length === 4) {
        let sColorNew = '#'
        for (let i = 1; i < 4; i += 1) {
          sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1))
        }
        sColor = sColorNew
      }
      // 处理六位的颜色值
      const sColorChange = []
      for (let i = 1; i < 7; i += 2) {
        sColorChange.push(parseInt('0x' + sColor.slice(i, i + 2)))
      }
      return 'rgba(' + sColorChange.join(',') + ',' + _opacity + ')'
    }
    return sColor
  },

  /**
   * 判断所有类型是否空值
   * 空返回true
   * @param a
   * @returns {boolean}
   */
  isEmpty: function (a) {
    /* 检验空字符串 */
    if (a === '') return true
    /* 检验字符串类型的null */
    if (a === 'null') return true
    /* 检验字符串类型的 undefined */
    if (a === 'undefined') return true
    /* 检验 undefined 和 null */
    if (!a && a !== 0 && a !== '') return true
    /* 检验空数组 */
    if (Array.isArray(a) && a.length === 0) return true
    /* 检验空对象  */
    if (Object.isObject(a) && Object.keys(a).length === 0) return true

    return false
  },

  /**
   * 返回随机数组
   * @param min
   * @param max
   * @param hasDecimal
   * @param fixed
   * @returns {*}
   */
  getRandom: function (min, max, hasDecimal, fixed) {
    fixed = fixed || 2
    const factor = hasDecimal ? Math.pow(10, fixed) : 1
    const temp = Math.max(Math.min(Math.floor((Math.random() * (max - min) + min) * factor) / factor, max), min)
    return hasDecimal ? temp.toFixed(fixed) : temp
  },

  /**
   * 判读字符串是否为空<br>
   *
   * <pre>
   * StringUtil.isBlank(' ') = true;
   * StringUtil.isBlank('') = true;
   * StringUtil.isBlank(' A') = false;
   * StringUtil.isBlank('AAAA') = false;
   * </pre>
   *
   * @param {string} strVal
   */
  isBlank: function (strVal) {
    return strVal == null || this.trim(strVal).length === 0
  },

  /**
   * 判读字符串是否不为空
   *
   * <pre>
   * StringUtil.isNotBlank(' ') = false;
   * StringUtil.isNotBlank('') = false;
   * StringUtil.isNotBlank(' A') = true;
   * StringUtil.isNotBlank('AAAA') = true;
   * </pre>
   *
   * @param {string} strVal
   */
  isNotBlank: function (strVal) {
    return !this.isBlank(strVal)
  },

  /**
   * 去掉前后空格
   *
   * <pre>
   * StringUtil.trim(' ') = '';
   * StringUtil.trim('A B ') = 'A B';
   * StringUtil.trim('A B') = 'A B';
   * StringUtil.trim(' AB ') = 'AB';
   * </pre>
   *
   * @param {string} strVal
   */
  trim: function (strVal) {
    if (!this.checkType(strVal)) {
      return strVal
    }
    return (strVal || '').replace(/^(\s|\u00A0)+|(\s|\u00A0)+$/g, '')
  },

  /**
   * 是否字符串类型
   *
   * @param {string} strVal
   * @return {Boolean}
   */
  checkType: function (strVal) {
    return typeof (strVal) === 'string'
  },

  /**
   * 生成随机字符串
   * @param num 长度，默认为32
   * @returns 字符串
   */
  getRandomString: function (num) {
    var len = num || 32
    /** 默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1 **/
    var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
    var maxPos = $chars.length
    var pwd = ''
    for (var i = 0; i < len; i++) {
      pwd += $chars.charAt(Math.floor(Math.random() * maxPos))
    }
    return pwd
  },

  /**
   * 格式化日期格式
   * @param date Date对象
   * @param format 时间格式
   * @returns 指定格式的时间字符串
   */
  setDateFormat: function (date, format) {
    if (!date) return
    date = this.getDateObj(date)
    if (date == null) return
    if (!(date instanceof Date)) return
    const paddNum = function (num) {
      num += ''
      return num.replace(/^(\d)$/, '0$1')
    }
    // 指定格式字符
    const cfg = {
      // 年 : 4位
      yyyy: date.getFullYear(),
      // 年 : 2位
      yy: date.getFullYear().toString().substring(2),
      // 月 : 如果1位的时候不补0
      M: date.getMonth() + 1,
      // 月 : 如果1位的时候补0
      MM: paddNum(date.getMonth() + 1),
      // 日 : 如果1位的时候不补0
      d: date.getDate(),
      // 日 : 如果1位的时候补0
      dd: paddNum(date.getDate()),
      // 时
      h: date.getHours(),
      hh: paddNum(date.getHours()),
      // 分
      m: date.getMinutes(),
      mm: paddNum(date.getMinutes()),
      // 秒
      s: date.getSeconds(),
      ss: paddNum(date.getSeconds())
    }
    format || (format = 'yyyy-MM-dd hh:mm:ss')
    return format.replace(/([a-z])(\1)*/ig, function (m) {
      return cfg[m]
    })
  },

  /**
   * 获取时间对象
   */
  getDateObj: function (date) {
    switch (typeof date) {
      case 'string':
        date = (date || '').replace(/^(\s|\u00A0)+|(\s|\u00A0)+$/g, '')
        if (date.length >= 20) {
          date = date.substring(0, 19)
        }
        date = new Date(date.replace(/-/ig, '/'))
        break
      case 'number':
        date = new Date(date)
        break
    }
    return date instanceof Date && date !== 'Invalid Date' ? date : null
  },

  /**
   * 深度合并 兼容数组
   * @param target 第一个参数为合并的目标参数
   * @returns {*}
   */
  deepAssign: function (target) {
    function isObj (x) {
      const type = typeof x
      return x !== null && (type === 'object' || type === 'function')
    }
    const hasOwnProperty = Object.prototype.hasOwnProperty
    const propIsEnumerable = Object.prototype.propertyIsEnumerable
    function toObject (val) {
      if (val === null || val === undefined) {
        throw new TypeError('Cannot convert undefined or null to object')
      }
      return Object(val)
    }
    function assignKey (to, from, key) {
      const val = from[key]
      if (val === undefined || val === null) {
        return
      }
      if (hasOwnProperty.call(to, key)) {
        if (to[key] === undefined || to[key] === null) {
          throw new TypeError('Cannot convert undefined or null to object (' + key + ')')
        }
      }
      if (!hasOwnProperty.call(to, key) || !isObj(val)) {
        // 如果是单纯的对象赋值，to[key] = val;里是不会创建新的对象给to[key]的，也就是只是引用了这个对象 如果要给一个新的对象就要用Object.assign
        if (isObj(val)) {
          to[key] = Object.assign({}, val)
        } else {
          to[key] = val
        }
      } else {
        to[key] = assign(Object(to[key]), from[key])
      }
    }
    function assign (to, from) {
      if (to === from) {
        return to
      }
      from = Object(from)
      for (var key in from) {
        if (hasOwnProperty.call(from, key)) {
          assignKey(to, from, key)
        }
      }
      if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(from)
        for (var i = 0; i < symbols.length; i++) {
          if (propIsEnumerable.call(from, symbols[i])) {
            assignKey(to, from, symbols[i])
          }
        }
      }
      return to
    }
    target = toObject(target)
    for (var s = 1; s < arguments.length; s++) {
      assign(target, arguments[s])
    }
    return target
  },

  /**
   * 计时器测试工具
   */
  timer: {},
  startTimer: function (key) {
    this.timer[key] = new Date()
  },
  stopTimer: function (key) {
    const time = this.timer.data[key]
    if (time) {
      this.timer.data[key] = new Date() - time
    }
  },
  getTimer: function (key) {
    return this.timer.data[key]
  },

  /**
   * 返回对象类型
   * @param value
   * @returns {string}
   */
  toRawType: function (value) {
    return Object.prototype.toString.call(value).slice(8, -1)
  },

  /**
   * 添加位数单位
   * @param value
   * @param type
   */
  numConvert: function (value, type, min) {
    const obj = {
      亿: 100000000,
      千万: 10000000,
      百万: 1000000,
      十万: 100000,
      万: 10000,
      千: 1000,
      百: 100
    }
    const obj1 = {
      4: '千',
      5: '万',
      6: '万',
      7: '万',
      8: '万',
      // '6': '十万',
      // '7': '百万',
      // '8': '千万',
      9: '亿'
    }
    const arr = []
    if (this.toRawType(value) === 'Array') {
      for (let i = 0; i < value.length; i++) {
        arr.push(this.numConvert(value[i], type, min))
      }
      return arr
    } else if (this.toRawType(value) === 'Number' || !isNaN(parseInt(value))) {
      const len = '' + value
      let par = '1'
      let str = ''
      if (type) {
        par = obj[type]
        str = this.keepPoint(value / parseInt(par), min) + type
      } else {
        if (len.length > 3) {
          par = (len.length > 9 ? 9 : len.length)
          str = this.keepPoint(value / obj[obj1[par]], min) + obj1[par]
        } else {
          str = this.keepPoint(value, min)
        }
      }
      return str.toString()
    } else {
      return value.toString()
    }
  },

  /**
   * 获取随机HSL数组
   * @param {*} hslLength
   */
  getHslArray (hslLength) {
    const HSL = []
    hslLength = hslLength || 9
    for (let i = 0; i < hslLength; i++) {
      // 获取随机HSL
      let ret = [Math.random(), Math.random(), Math.random()]

      // 颜色相邻颜色差异须大于 0.25
      if (i > 0 && Math.abs(ret[0] - HSL[i - 1][0]) < 0.25) {
        i--
        // 重新获取随机色
        continue
      }
      // [0.7 - 0.9] 排除过灰颜色
      ret[1] = 0.7 + (ret[1] * 0.2)
      // [0.4 - 0.8] 排除过亮过暗色
      ret[2] = 0.4 + (ret[2] * 0.4)

      // 数据转化到小数点后两位
      ret = ret.map(function (item) {
        return parseFloat(item.toFixed(2))
      })
      HSL.push(ret)
    }
    return HSL
  },

  /**
   * HSL颜色值转换为RGB
   * H，S，L 设定在 [0, 1] 之间
   * R，G，B 返回在 [0, 255] 之间
   *
   * @param H 色相
   * @param S 饱和度
   * @param L 亮度
   * @returns Array RGB色值
   */
  hslToRgb ([H, S, L]) {
    let R, G, B
    if (+S === 0) {
      // 饱和度为0 为灰色
      R = G = B = L
    } else {
      const hue2Rgb = function (p, q, t) {
        if (t < 0) t += 1
        if (t > 1) t -= 1
        if (t < 1 / 6) return p + (q - p) * 6 * t
        if (t < 1 / 2) return q
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
        return p
      }
      const Q = L < 0.5 ? L * (1 + S) : L + S - L * S
      const P = 2 * L - Q
      R = hue2Rgb(P, Q, H + 1 / 3)
      G = hue2Rgb(P, Q, H)
      B = hue2Rgb(P, Q, H - 1 / 3)
    }
    return [Math.round(R * 255), Math.round(G * 255), Math.round(B * 255)]
  },

  /**
   * 颜色rgb [255,255,255]
   * 转成hsl [1,1,1]
   * @param {*} r
   * @param {*} g
   * @param {*} b
   * @returns
   */
  rgbToHsl (r, g, b) {
    return [+r / 255, +g / 255, +b / 255]
  },

  /**
   * 颜色插值
   * @param color1
   * @param color2
   * @param num
   * @param type
   * @returns {[]}
   */
  colorInterpolation (color1, color2, num, type) {
    // let rgb1 = []
    // let rgb2 = []
    const inter = []
    const outputHex = []
    const outputRgb = []
    const outputRgba = []
    const outputHsl = []
    let output = []
    if (!Array.isArray(color1)) {
      // rgb1 = color1.colorRgb()
    }
    if (!Array.isArray(color2)) {
      // rgb2 = color2.colorRgb()
    }
    for (let i = 0; i < 3; i++) {
      inter.push((color2[i] - color1[i]) / num)
    }
    for (let j = 0; j < num; j++) {
      const r = Math.round(color1[0] += inter[0])
      const g = Math.round(color1[1] += inter[1])
      const b = Math.round(color1[2] += inter[2])
      outputRgb.push(r, g, b)
      outputRgba.push(r, g, b, 1)
      outputHsl.push(...this.rgbToHsl(r, g, b))
      outputHex.push('rgb(' + r + ',' + g + ',' + b + ')')
    }
    switch (type) {
      // ['#fffff', '#000000']
      case 'hex':
        output = outputHex
        break
      // [255,255,255,1, 0,0,0,1]
      case 'rgba':
        output = outputRgba
        break
      // [1,1,1,1, 0,0,0,1]
      case 'hsl':
        output = outputHsl
        break
      //  [255,255,255, 0,0,0]
      case 'rgb':
      default:
        output = outputRgb
        break
    }
    return output
  },

  /**
   * 唯一id
   * @returns
   */
  createGuid () {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = (Math.random() * 16) | 0
      var v = c === 'x' ? r : (r & 0x3) | 0x8
      return v.toString(16)
    })
  },

  /**
   * uuid
   * @returns
   */
  createUuid () {
    const tempUrl = URL.createObjectURL(new Blob())
    var uuid = tempUrl.toString()
    URL.revokeObjectURL(tempUrl)
    return uuid.substr(uuid.lastIndexOf('/') + 1)
  },

  /**
   * 是否是Object
   * @param {*} obj
   * @returns
   */
  isObject (obj) {
    return Object.prototype.toString.call(obj) === '[object Object]'
  },

  /**
   * 是否是String
   * @param {*} str
   * @returns
   */
  isString (str) {
    return Object.prototype.toString.call(str) === '[object String]'
  },

  /**
   * 获取值
   * @param {*} obj
   * @param {*} path
   * @param {*} defaultValue
   * @returns
   */
  getValue (obj, path, defaultValue) {
    if (!this.isObject(obj)) {
      return defaultValue
    }
    if (path === '' || !path || !path.length) {
      return obj
    }
    let pathArr = path
    if (this.isString(path)) {
      // 结尾 aa.bb[1].cc[0] -> aa.bb[1].cc.0
      const endReg = /(\w+)\[(\d+)\]$/gi
      path = path.replace(endReg, '$1.$2')
      // 路径 aa.bb[1].cc.0 -> aa.bb.1.cc.0
      const reg = /(\w+)\[(\d+)\](.)/gi
      path = path.replace(reg, '$1.$2$3')
      pathArr = path.split('.')
    }
    const len = pathArr.length
    for (let i = 0; i < len; i++) {
      const key = pathArr[i]
      if (obj[key] == null) return defaultValue
      obj = obj[key]
    }
    return obj
  },

  setMap (obj, path, key, value) {
    if (path === '' || !path || !path.length) {
      return obj
    }
    let pathArr = path
    if (this.isString(path)) {
      // 结尾 aa.bb[1].cc[0] -> aa.bb[1].cc.0
      const endReg = /(\w+)\[(\d+)\]$/gi
      path = path.replace(endReg, '$1.$2')
      // 路径 aa.bb[1].cc.0 -> aa.bb.1.cc.0
      const reg = /(\w+)\[(\d+)\](.)/gi
      path = path.replace(reg, '$1.$2$3')
      pathArr = path.split('.')
    }
    let lastKey
    pathArr = pathArr || []
    pathArr.map((val, index) => {
      if (!this.isObject(obj[val])) {
        obj[val] = {}
      }
      if (index !== pathArr.length - 1) {
        obj = obj[val]
      }
      lastKey = val
    })
    if (!this.isObject(obj[lastKey])) {
      obj[lastKey] = {}
    }
    obj = obj[lastKey]
    obj[key] = value
  },

  /**
   * 获取随机色 十六进制
   * @returns
   */
  getRandomColorSix () {
    // 定义字符串变量colorValue存放可以构成十六进制颜色值的值
    var colorValue = '0,1,2,3,4,5,6,7,8,9,a,b,c,d,e,f'
    // 以","为分隔符，将colorValue字符串分割为字符数组["0","1",...,"f"]
    var colorArray = colorValue.split(',')
    // 定义一个存放十六进制颜色值的字符串变量，先将#存放进去
    var color = '#'
    // 使用for循环语句生成剩余的六位十六进制值
    for (var i = 0; i < 6; i++) {
      // colorArray[Math.floor(Math.random()*16)]随机取出
      // 由16个元素组成的colorArray的某一个值，然后将其加在color中，
      // 字符串相加后，得出的仍是字符串
      color += colorArray[Math.floor(Math.random() * 16)]
    }
    return color
  },

  /**
     * @Description 比较两个对象键值全等
     * @author joe
     * @date 2020-11-15 14:59:03
     * @param {Object} objOne 对象1
     * @param {Object} objTwo 对象2
     * @return {Boolean} 是否键值全等
     **/
  objKeyValueIsSame (objOne, objTwo) {
    // 获取对象1所有键数组
    const keysOne = Object.keys(objOne)
    // 获取对象1所有键数组
    const keysTwo = Object.keys(objTwo)
    // 对比一下键得长度是否相等，如果不等则直接返回true
    if (keysOne.length !== keysTwo.length) return false
    // 开始遍历键去获取对象值对比，我们思路是值不匹配则返回false，但是如果匹配则则什么都不要，继续循环，直到循环结束，没有返回false就行了
    for (const key of keysOne) {
      // 如果是对象，则再递归对比，如果递归返回false，则直接方法也直接返回false
      if (typeof objOne[key] === 'object' && objOne[key] !== null) {
        if (!this.objKeyValueIsSame(objOne[key], objTwo[key])) return false
        // 如果是function或symbol，转字符串再对比，不匹配则直接返回false
      } else if (typeof objOne[key] === 'function' || typeof objOne[key] === 'symbol') {
        if (String(objOne[key]) !== String(objTwo[key])) return false
        // 最后其他类型用es6得Object.is()来比较，不匹配直接返回false
      } else {
        if (!Object.is(objOne[key], objTwo[key])) return false
      }
    }
    // 遍历结束了没有返回false，说明没有问题，这里直接返回true，表示键值全等了
    return true
  },

  mergeSameJson (json1, json2) {
    const json = {}
    if (json1 && json2) {
      let min
      let max
      if (Object.keys(json1).length > Object.keys(json2).length) {
        max = json1
        min = json2
      } else {
        max = json2
        min = json1
      }
      Object.keys(min).map(key => {
        if (max[key] && max[key] === min[key]) {
          json[key] = min[key]
        }
      })
    }
    return json
  }
}
/* eslint-disable */
/**
 * "rgb(255,255,255)".colorHex();  // #ffffff
 * @returns {*}
 */
String.prototype.colorHex = function () {
  // RGB颜色值的正则
  var reg = /^(rgb|RGB)/
  var color = this
  if (reg.test(color)) {
    var strHex = "#"
    // 把RGB的3个数值变成数组
    var colorArr = color.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",")
    // 转成16进制
    for (var i = 0; i < colorArr.length; i++) {
      var hex = Number(colorArr[i]).toString(16)
      if (hex === "0") {
        hex += hex
      }
      strHex += hex
    }
    return strHex
  } else {
    return String(color)
  }
}

/**
 * "#fff".colorRgb();  // rgb(255,255,255)
 "#ffffff".colorRgb();  // rgb(255,255,255)
 * @returns {string}
 */
String.prototype.colorRgb = function () {
  // 16进制颜色值的正则
  let reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/
  // 把颜色值变成小写
  let color = this.toLowerCase();
  if (reg.test(color)) {
    // 如果只有三位的值，需变成六位，如：#fff => #ffffff
    if (color.length === 4) {
      let colorNew = "#"
      for (let i = 1; i < 4; i += 1) {
        colorNew += color.slice(i, i + 1).concat(color.slice(i, i + 1))
      }
      color = colorNew
    }
    // 处理六位的颜色值，转为RGB
    let colorChange = []
    for (let i = 1; i < 7; i += 2) {
      colorChange.push(parseInt("0x" + color.slice(i, i + 2)))
    }
    return colorChange//"RGB(" + colorChange.join(",") + ")";
  } else {
    return color
  }
}

/**
 * "#fff".colorRgb();  // rgb(255,255,255)
 "#ffffff".colorRgb();  // rgb(255,255,255)
 * @returns {string}
 */
String.prototype.colorHsl = function () {
  // 16进制颜色值的正则
  let reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/
  // 把颜色值变成小写
  let color = this.toLowerCase()
  if (reg.test(color)) {
    // 如果只有三位的值，需变成六位，如：#fff => #ffffff
    if (color.length === 4) {
      let colorNew = "#"
      for (let i = 1; i < 4; i += 1) {
        colorNew += color.slice(i, i + 1).concat(color.slice(i, i + 1))
      }
      color = colorNew
    }
    // 处理六位的颜色值，转为RGB
    let colorChange = []
    for (let i = 1; i < 7; i += 2) {
      colorChange.push(parseInt("0x" + color.slice(i, i + 2)) / 255)
    }
    return colorChange//"RGB(" + colorChange.join(",") + ")";
  } else {
    return color
  }
}

/**
 * @param poss      贝塞尔曲线控制点坐标,二维数组
 * @param precision 精度，需要计算的该条贝塞尔曲线上的点的数目
 * @return 该条贝塞尔曲线上的点（二维坐标）
 */
Math.calculate = function (poss, precision) {
  // 维度，坐标轴数（二维坐标，三维坐标...）
  const dimersion = poss[0].length

  // 贝塞尔曲线控制点数（阶数）
  const number = poss.length

  // 控制点数不小于 2 ，至少为二维坐标系
  if (number < 2 || dimersion < 2) {
    return null
  }
  // 贝塞尔曲线点二维数组
  const result = []

  // 计算杨辉三角
  const mi = []
  mi[0] = mi[1] = 1
  for (let i = 3; i <= number; i++) {
    const t = new Array(i - 1)
    for (let j = 0; j < t.length; j++) {
      t[j] = mi[j]
    }

    mi[0] = mi[i - 1] = 1
    for (let j = 0; j < i - 2; j++) {
      mi[j + 1] = t[j] + t[j + 1]
    }
  }

  // 计算坐标点
  for (let i = 0; i <= precision; i++) {
    result[i] = []
    const t = i / precision
    for (let j = 0; j < dimersion; j++) {
      let temp = 0.0
      for (let k = 0; k < number; k++) {
        temp += Math.pow(1 - t, number - k - 1) * poss[k][j] * Math.pow(t, k) * mi[k]
      }
      result[i][j] = temp
    }
  }
  return result
}

String.prototype.format = function () {
  var e = arguments;
  return !!this && this.replace(/\{(\d+)\}/g, function (t, n) { return e[n] ? e[n] : t })
}

// 数组
Array.prototype.remove = function (val) {
  var index = this.indexOf(val);
  if (index > -1) {
    this.splice(index, 1);
  }
}
/* eslint-disable */
