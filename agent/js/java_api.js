function frida_java(){
    Java.perform(function(){
        //判断java虚拟机是否可用
        if(Java.available){
            //打印android系统版本号
            console.log("",Java.androidVersion);

            //枚举当前加载的所有类
            Java.enumerateLoadedClasses({
                onMatch:function(className,handle){
                    console.log("",className);
                },
                onComplete:function(){
                    console.log("","输出完毕");
                }

            });

            //枚举当前加载的类加载器
            Java.enumerateClassLoaders({
                onMatch:function(loader){
                    console.log("",loader);
                },
                onComplete:function(){
                    console.log("","输出完毕");
                }
            });

            //获取android.app.Activity类
            var Activity = Java.use('android.app.Activity');
            var Exception = Java.use('java.lang.Exception');

            //拦截Activity类的onResume方法
            Activity.onResume.implementation=function(){
                //调用$new()来调用构造函数从而实例化对象;当想要回收类时调用$Dispose()方法显式释放
                throw Exception.$new('oh noes!');
            };

            //在堆上查找实例化的对象
            Java.choose("com.zdd.fridalearn.MainActivitySo",{
                onMatch:function(instance){
                    console.log(instance);
                },
                onComplete:function(){
                    console.log("end");
                }

            });

            //Java.registerClass可用于绕过证书和构造okhttp拦截器
            // var MainActivity4 = Java.registerClass({
            //     name:'com.zdd.fridalearn.MainActivity4',
            //     methods:{
            //         getPassword:function(){
            //             var Activity = Java.use('com.zdd.fridalearn.MainActivity4');
            //             return password_et.$new().getText().toString();
            //         }
            //     }
            // });

            // console(MainActivity4.getPassword());

            //同名的so文件会导致崩溃
            console.log("dizhi=",Module.findExportByName("libnative-lib.so","Java_com_zdd_fridalearn_MainActivitySo_stringFromJNI"));

            Interceptor.attach(Module.findExportByName("libnative-lib.so","Java_com_zdd_fridalearn_MainActivitySo_stringFromJNI"),{
                onEnter:function(args){
                    console.log(args[0].toInt32());
                    console.log(args[1].toString());

                    //输出上下文因其是一个Objection对象，需要它进行接送、转换才能正常看到值
                    console.log('Context  : ' + JSON.stringify(this.context));
                    //输出返回地址
                    console.log('Return   : ' + this.returnAddress);
                    //输出线程id
                    console.log('ThreadId : ' + this.threadId);
                    console.log('Depth    : ' + this.depth);
                    console.log('Errornr  : ' + this.err);

                },
                onLeave:function(retval){
                    var env = Java.vm.getEnv();

                    var jstring=env.newStringUtf('hello zdd!');

                    retval.replace(jstring);
                     console.log("返回值改为zdd");

                }

            });
        }else{
            console.log("error");
        }


    });

}

setImmediate(frida_java,0);