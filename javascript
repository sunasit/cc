/*判断数据类型
  1.javascript基础数据类型：number，string，bool，undefined，null
  2.使用typeof检测基本数据类型，返回: "number", "string", "boolean", "undefined"
  3.null，array和object使用 typeof返回的都是"object",复杂数据类型使用 Object.prototype.toString.call检测
*/
function typeof(o){
  var _type = {
    "number": "number",
    "string": "string",
    "boolean": "boolean",
    "function": "function",
    "undefined": "undefined",
    "[object Object]": "object",
    "[object Null]": "null",
    "[object Array]": "array"
  };
  var _string = {
    
  };
  var gettype = Object.prototype.toString;
  return _typeof[typeof o] || _typeof(gettype.call(o));
};
