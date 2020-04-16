function frida_memory_scan(){
    Java.perform(function(){
        // 先获取so的module对象
        var module = Process.findModuleByName("libNLP_OCR.so");
        //??是通配符
        var pattern = "08B4??BC38";
 
        console.log("base:"+module.base+"   size"+module.size);

        //从so的基址开始搜索，搜索大小为so文件的大小，搜指定条件08B4??BC38的数据
        var rs = Memory.scan(module.base,module.size,pattern,{
            onMatch:function(address,size){
                console.log("搜索到 "+pattern+" 地址是："+address.toString());
            },
            onError:function(reason){
                console.log("搜索失败"+reason);
            },
            onComplete:function(){
                console.log("搜索完毕");

            }

        });

        var scanSync=Memory.scanSync(module.base,module.size,pattern);
        console.log("scanSync:"+JSON.stringify(scanSync));


    });

}

function frida_memory_alloc(){
    Java.perform(function(){
        const r=Memory.alloc(10);

        console.log(hexdump(r,{
            offset:0,
            length:10,
            header:true,
            ansi:false
        }));
    });


}

function frida_memory_copy(){
    Java.perform(function(){
        // 先获取so的module对象
        var module = Process.findModuleByName("libNLP_OCR.so");
        //??是通配符
        var pattern = "08B4??BC38";
    
        console.log("base:"+module.base+"   size"+module.size);

        //申请一个内存空间大小为10个字节
        const r=Memory.alloc(10);

        Memory.copy(r,module.base,10);

        console.log(hexdump(r,{
            offset:0,
            length:10,
            header:true,
            ansi:false
        }));
    });

}

function frida_memory_write_read(){
    Java.perform(function(){
        var arr=[0x7a,0x64,0x64];

        const r=Memory.alloc(arr.length);

        //将arr数组写入R地址中
        Memory.writeByteArray(r,arr);

        console.log(hexdump(r,{
            offset:0,
            length:arr.length,
            header:true,
            ansi:false
        }));

        //读取r指针，长度是arr.length
        var buffer = Memory.readByteArray(r,arr.length);

        console.log("Memory.readByteArray:");

        console.log(hexdump(buffer,{
            offset:0,
            length:arr.length,
            header:true,
            ansi:false
        }));


    });

}


setImmediate(frida_memory_write_read,0);