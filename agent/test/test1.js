function frida_test(){
    Java.perform(function (){

        if(Java.available){
            console.log("hello java vm");
        }else{
            console.log("error");
        }

        console.log("this test");
    });
}

frida_test();