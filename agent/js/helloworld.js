//frida -U -l frida\script\helloworld.js com.android.systemui 附加脚本到android进程中
function hello_console(){
    Java.perform(function(){
        console.log("");
        console.log("hello-log");
        console.warn("hello-warn");
        console.error("hello-error");

    });
}

function hello_hexdump(){
    var libc=Module.findBaseAddress('libc.so');
    console.log(hexdump(libc,{
        offset:0,
        length:64,
        header:true,
        ansi:true
    }));
}

function hello_var(){
    Java.perform(function(){
        console.log("");
        console.log("new Int64(1):"+new Int64(1));
        console.log("new UInt64(1):"+new UInt64(1));
        console.log("new NativePointer(0xEC644071):"+new NativePointer(0xEC644071));
        console.log("new ptr('0xEC644071'):"+new ptr(0xEC644071));

    });
}

function hello_type(){
    Java.perform(function(){
        console.log("");
        console.log("8888+1:"+new Int64("8888").add(1));
        console.log("8888-1:"+new Int64("8888").sub(1));
        console.log("8888<<1:"+new Int64("8888").shr(1));
        // 1是false
        console.log("8888 == 22:"+new Int64("8888").compare(22));
        console.log("8888 toString:"+new Int64("8888").toString());

    });
}


setTimeout(hello_type);
//setImmediate(hello_printf,0);