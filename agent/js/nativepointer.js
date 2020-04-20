function frida_nativepointer(){

    Java.perform(function(){
        //第一种字符串定义方式 十进制的100 输出为十六进制0x64
        const ptr1=new NativePointer("100");
        console.log("ptr1:",ptr1);

        //第二种字符串定义方式 直接定义0x64 
        const ptr2=new NativePointer("0x64");
        console.log("ptr2:",ptr2);

        //第三种定义数字int类型 十进制的100 是0x64
        const ptr3=new NativePointer(100);
        console.log("ptr3",ptr3);






        var pointer=Process.findModuleByName("libc.so").base;
        //读取从pointer地址开始的16个字节
        console.log(pointer.readByteArray(0x10));
        console.log("readPointer():"+pointer.readPointer());

        console.log("pointer:"+pointer);
        const r=Memory.alloc(5);
        //将pointer指针写入刚刚申请的r内
        r.writePointer(pointer);
        //读取r指针的数据
        var buffer=Memory.readByteArray(r,5);
        console.log(buffer);





        //从pointer地址读4个字节 有符号 1179403647=0x464c457f
        console.log(pointer.readS32());
        //从pointer地址读4个字节 无符号
        console.log(pointer.readU32());





        const r = Memory.alloc(4);
        r.writeS32(0x12345678);
        console.log(r.readByteArray(0x10));




        var arr=[0x7a,0x64,0x64];
        const rh=Memory.alloc(arr.length);
        //将arr数组写入rh地址中
        Memory.writeByteArray(rh,arr);

        console.log(hexdump(rh,{
            offset:0,
            length:arr.length,
            header:true,
            ansi:false
        }));

        //读取rh指针，长度是arr.length
        var buffer = Memory.readByteArray(rh,arr.length);

        console.log("Memory.readByteArray:");

        console.log(hexdump(buffer,{
            offset:0,
            length:arr.length,
            header:true,
            ansi:false
        }));

        console.log("readCString():"+rh.readCString());
        const newPtrstr=r.writeUtf8String("hah");
        console.log("readCString()"+newPtrstr.readCString());

    });

}

setImmediate(frida_nativepointer,0);