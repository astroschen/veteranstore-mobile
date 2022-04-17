export const setItem = (name, content) => {
  const obj = {
    dataType: typeof content,
    content: content,
    since: new Date().getTime()
  }

  window.localStorage.setItem(name, JSON.stringify(obj))
}

// 计算表达式的值
function evil (fn) {
  // 一个变量指向Function，防止有些前端编译工具报错
  var Fn = Function
  return new Fn('return ' + fn)()
}

export const getItem = (name) => {
  let obj = window.localStorage.getItem(name)
  if (obj != null && obj !== '') {
    obj = JSON.parse(obj)

    switch (obj.dataType) {
      case 'number':
        return Number(obj.content)
      case 'boolean':
        return evil(obj.content)
      case 'string':
      case 'object':
      default:
        return obj.content
    }
  } else {
    return obj
  }
}

export const removeItem = (name) => {
  window.localStorage.removeItem(name)
}
