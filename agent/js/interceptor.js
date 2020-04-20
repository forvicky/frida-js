function frida_Interceptor() {
    Java.perform(function () {
 
       var add_method = new NativeFunction(Module.findExportByName('libnative-lib.so', 'Java_com_zdd_fridalearn_MainActivitySo_addNum'), 
       'int',['int','int']);
       
       //??? 不管什么参数都返回-1
       console.log("result:",add_method(0,0));
       //这里对原函数的功能进行替换实现
       Interceptor.replace(add_method, new NativeCallback(function (a, b) {
           //h不论是什么参数都返回123
            return 123;
       }, 'int', ['int', 'int']));
       //再次调用 则返回123
       console.log("result:",add_method(1,2));
    });
}



setImmediate(frida_Interceptor, 0);