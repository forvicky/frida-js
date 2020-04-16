setTimeout(function(){
    Java.perform(function(){
        console.log("\n[*] enumerating classes...");
        Java.enumerateLoadedClasses({
            onMatch:function(_className){
                if(_className.split(".")[1]=="bluetooth"){
                    console.log("[->] found instance of '" +_className+"'");
                }
        },
            onComplete:function(){
            console.log("[*] class enuemration complete");
        }});

        Java.choose("android.bluetooth.IBluetooth",{
            onMatch:function(instance){
                console.log("[* ]"+" android.bluetooth.IBluetooth instance found"+":=>'"+instance+"'");
                bluetoothDeviceInfo(instance);
    
            },
            onComplete:function(){
                console.log("[*]------");
            }
    
    
        });

    });


});