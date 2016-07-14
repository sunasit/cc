/*判断数据类型
  1.javascript基础数据类型：number，string，bool，undefined，null
  2.使用typeof检测基本数据类型，返回: "number", "string", "boolean", "undefined"
  3.null，array和object使用 typeof返回的都是"object",复杂数据类型使用 Object.prototype.toString.call检测
*/
function jstypeof(o){
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
  
  var _gettype = Object.prototype.toString;
  return _type[typeof o] || _type[_gettype.call(o)];
};


/*
  使用原生javascript实现jQuery的$.getJson
*/
function jsgetJson(url){
  var xmlHTTP = new XMLHttpRequest();
  xmlHTTP.open("GET", url, true);
  xmlHTTP.onreadystatechange = function(){
    if(this.readyState == 4){
      if(this.status >= 200 && this.status <= 400){
        console.log(JSON.parse(this.responseText));
      }else{
        alert("failed");
      }
    }
  };
  xmlHTTP.send();
}

/*
  javascript面向对象
*/
//1.普通的函数定义
function breath(){
  alert("animal can breath");
}

//2.利用原型链实现类和实例方法的定义
var Animal = function(){};
Animal.prototype.breath = function(){
  alert("animal can breath");
};

var animal = new Animal();
animal.breath();

//3.方法2的优化
var Animal = function(){};
Animal.prototype = {
  walk: function(){
    alert("animal can walk");
  },
  moo: function(){
    alert("animal can moo");
  }
};

var animal = new Animal();
animal.walk();

//4.定义通用方法
var Animal = function(){};
Animal.prototype.method = function(name, fn){
  Animal.prototype[name] = fn;
};
Animal.prototype.method("eat", function(){ 
  alert("animal can eat");
})

var animal = new Animal();
animal.eat();

//5.面向对象：构造函数和继承,TBD
var Animal = function(name){
  this.name = name;
};
Animal.prototype.getName = function(){
  return this.name;
};

var Cat.prototype = Animal();

var cat = new Cat("cat");
cat.getName();
