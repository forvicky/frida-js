/*
基本能力Ⅱ：参数构造、方法重载、隐藏函数的处理
*/
console.log("Script loaded successfully ");
Java.perform(function x() {
    console.log("Inside java perform function");
    //定位类
    var my_class = Java.use("com.zdd.fridalearn.MainActivity2");
    console.log("Java.Find.Successfully!");//定位类成功！
    //在这里更改类的方法的实现（implementation）
    my_class.fun.overload("int","int").implementation = function(x,y){
        //打印替换前的参数
        console.log( "input: fun("+ x + ", " + y + ")");
        //把参数替换成2和5，依旧调用原函数
        var ret_value = this.fun(2, 5);
        return ret_value;
    }

    var string_class = Java.use("java.lang.String"); //获取String类型

    my_class.fun.overload("java.lang.String").implementation = function(x){
      console.log("*************************************");
      var my_string = string_class.$new("zdd test String#####"); //new一个新字符串
      console.log("Original arg: " +x );
      var ret =  this.fun(my_string); // 用新的参数替换旧的参数，然后调用原函数获取结果
      console.log("Return value: "+ret);
      console.log("*************************************");
      return ret;
    };

    //Java.choose直接到内存里去寻找的方法，也就是Java.choose(className, callbacks)函数，通过类名触发回掉函数
    Java.choose("com.zdd.fridalearn.MainActivity2" , {
      onMatch : function(instance){ //该类有多少个实例，该回调就会被触发多少次
        console.log("Found instance: "+instance);
        console.log("Result of secret func: " + instance.secret());
      },
      onComplete:function(){}
    });

});


