/*
基本能力Ⅰ：hook参数、修改结果
*/
console.log("Script loaded successfully ");
Java.perform(function x() {
    console.log("Inside java perform function");
    //定位类
    var my_class = Java.use("com.zdd.fridalearn.MainActivity");
    console.log("Java.Find.Successfully!");//定位类成功！
    //在这里更改类的方法的实现（implementation）
    my_class.fun.implementation = function(x,y){
        //打印替换前的参数
        console.log( "input: fun("+ x + ", " + y + ")");
        //把参数替换成2和5，依旧调用原函数
        var ret_value = this.fun(2, 5);
        return ret_value;
    }
});