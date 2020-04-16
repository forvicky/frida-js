//枚举当前加载的所有模块
function frida_process_modules(){
    Java.perform(function(){
        console.log("",Process.getCurrentThreadId());

        var process_obj_module_arr=Process.enumerateModules();

        for(var i=0;i<process_obj_module_arr.length;i++){
            console.log("模块名称：",process_obj_module_arr[i].name);
            console.log("模块地址：",process_obj_module_arr[i].base);
            console.log("大小：",process_obj_module_arr[i].size);
            console.log("文件系统路径：",process_obj_module_arr[i].path);

        }
    });
}

//加载指定so文件
function frida_process_module(){
    Java.perform(function(){
        const hooks=Module.load('libNLP_OCR.so');

        console.log("模块名称：",hooks.name);
        console.log("模块地址：",hooks.base);
        console.log("大小：",hooks.size);
        console.log("文件系统路径：",hooks.path);

    });
}

//枚举所有import函数
function frida_process_imports(){
    Java.perform(function(){
        const hooks=Module.load('libNLP_OCR.so');

        var Imports=hooks.enumerateImports();
        for(var i=0;i<Imports.length;i++){
            //函数类型
            console.log("type:",Imports[i].type);
            //函数名称
            console.log("name:",Imports[i].name);
            //属于的模块
            console.log("module:",Imports[i].module);
            //函数地址
            console.log("address:",Imports[i].address);

        }

    });
}

//枚举所有export函数
function frida_process_exports(){
    Java.perform(function(){
        const hooks=Module.load('libNLP_OCR.so');

        var Exports=hooks.enumerateExports();
        for(var i=0;i<Exports.length;i++){
            //函数类型
            console.log("type:",Exports[i].type);
            //函数名称
            console.log("name:",Exports[i].name);
            //函数地址
            console.log("address:",Exports[i].address);

        }

    });
}

//返回so文件中Export函数库中函数名称为exportName函数的绝对地址
function frida_find_export_by_name(){
    Java.perform(function(){
        console.log("init_engine address:",Module.findExportByName('libNLP_OCR.so','init_engine'));
        console.log("init_engine address:",Module.getExportByName('libNLP_OCR.so','init_engine'));

 

    });
}

function frida_so_addr(){
    Java.perform(function(){
        var name="libNLP_OCR.so";
        console.log("so address:",Module.findBaseAddress(name));
        console.log("so address:",Module.getBaseAddress(name));

    });
}

//枚举所有symbols
function frida_process_symbols(){
    Java.perform(function(){
        const hooks=Module.load('libNLP_OCR.so');

        var Symbols=hooks.enumerateSymbols();
        for(var i=0;i<Symbols.length;i++){
            console.log("isGlobal:",Symbols[i].isGlobal);
            console.log("type:",Symbols[i].type);
            console.log("section:",JSON.stringify(Symbols[i].section));
            console.log("name:",Symbols[i].name);
            console.log("address:",Symbols[i].address);
        }

    });

}



//枚举当前所有的线程
function frida_process_threads(){
    Java.perform(function(){
        var enumerateThreads=Process.enumerateThreads();
        for(var i=0;i<enumerateThreads.length;i++){
            console.log("id:",enumerateThreads[i].id);
            console.log("state:",enumerateThreads[i].state);
            console.log("context:",JSON.stringify(enumerateThreads[i].context));
        }
    });
}



setImmediate(frida_so_addr,0);