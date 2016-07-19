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


/*
  IIEF:立即执行函数表达式
*/
//1.IIEF方式1，推荐
(function(){
}());

//2.IIEF方式2，不推荐，破坏整体性
(function(){
})();

//3.IIEF方法定义
var add;
(function(a, b){
  add = function(){
    return a+b;
  };
}(1,2));

add();

//4.将IIEF赋给变量
var fn = (function(a, b){
  return {
    add: function(){
      return a+b;
    },
    subtract: function(){
      return (a>b)? (a-b) : (b-a);
    },
    multiply: function(){
      return a*b;
    },
    divide: function(){
      try{
        if(b==0){
          throw new error(a/b);
        }
        return a/b;
      }catch(e){
        alert("b is 0");
      }
    }
  }
}(1, 3));

/*
建议58：灵活使用Arguments
1.Arguments是伪数组，可以使用Array.prototype.slice.call将其转化为真正的数组
2.使用Arguments可以随时修改实参，实参个数少于形参的个数时，多余的形参为undefined；多的时候，多余的实参被删除
3.比较实参和形参
*/

//1
function sort(){
  var arr = Array.prototype.slice.call(arguments);
  return arr.sort();
}
sort(2,3,1);

//2
function F(a,b){
  console.log("实参:");
  for(var i=0,len=arguments.length;i<len;i++){
    console.log(arguments[i]);
  }
  console.log("形参:");
  console.log(a);
  console.log(b);
}
F(1,2,3);
/*
实参:
1
2
3
形参:
1
2
*/

F(1)
/*
实参:
1
形参:
1
undefined
*/

//3
function F(a,b){
  var sArgs = arguments.length;
  var xArgs = arguments.callee.length;
  console.log(sArgs === xArgs);
}
F(1,2); //true
F(1,2,3); //false
F(1); //false

/*
建议60：比较函数调用模式下的作用域
四种调用模式：
1.方法调用模式
2.函数调用模式
3.构造器调用模式
4.apply调用模式
*/

//1.方法调用模式:this被绑定到调用对象上
var student = {
  name: "tom",
  print: function(){
    return this.name;
  }
};
student.print();

//2.函数调用模式:this绑定到全局作用域
function Student(name){
  this.name = name;
  this.getName = function(){
    return this.name;
  };
}
Student("tom");
window.getName(); //"tom"

/*
3.构造器调用模式:如果在一个函数的前面使用new进行调用，
将创建一个隐式链接到该函数的prototype的实例对象，同时this会被绑定到该实例对象上
*/
function Animal(name){
  this.name = name;
}
Animal.prototype.get = function(){
  return this.name;
};

var cat = new Animal("cat");
cat.get();

//4.apply调用模式:第一个参数会重置作用域
function F(str){
  this.str = str;
}
F.prototype.get = function(){
  return this.str;
};

var obj = {
  str: "obj"
};
F.prototype.get.apply(obj); //"obj"
