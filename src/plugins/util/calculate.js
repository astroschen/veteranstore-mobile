// 重写计算方法
/**
 * 重写加法
 * @param {*} arg1
 * @param {*} arg2
 * @returns
 */
 export function accAdd (arg1, arg2) {
  var r1, r2, m;
  try { r1 = arg1.toString().split(".")[1].length } catch (e) { r1 = 0 }
  try { r2 = arg2.toString().split(".")[1].length } catch (e) { r2 = 0 }
  m = Math.pow(10, Math.max(r1, r2))
  return (arg1 * m + arg2 * m) / m
}
/**
 * 重写减法
 * @param {*} arg1
 * @param {*} arg2
 * @returns
 */
export function accSub (arg1, arg2) {
  return accAdd(arg1, -arg2);
}
/**
 * 重写乘法
 * @param {*} arg1
 * @param {*} arg2
 * @returns
 */
export function accMul (arg1, arg2) {
  var m = 0; var s1 = arg1.toString(); var s2 = arg2.toString();
  try { m += s1.split(".")[1].length } catch (e) {
    console.log(e) 
  }
  try { m += s2.split(".")[1].length } catch (e) {
    console.log(e) 
  }
  return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)
}
/**
 * 除法重写
 * @param {*} arg1
 * @param {*} arg2
 * @returns
 */
export function accDiv (arg1, arg2) {
  var t1 = 0; var t2 = 0; var r1; var r2;
  try { t1 = arg1.toString().split(".")[1].length } catch (e) {
    console.log(e) 
  }
  try { t2 = arg2.toString().split(".")[1].length } catch (e) {
    console.log(e) 
  }
  r1 = Number(arg1.toString().replace(".", ""))
  r2 = Number(arg2.toString().replace(".", ""))
  return (r1 / r2) * Math.pow(10, t2 - t1);
}