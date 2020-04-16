Java.perform(function(){
    function enumMethods(targetClass){
        var hook = Java.use(targetClass);
        var ownMethods=hook.class.getDeclaredMethods();
        hook.$dispose;
    
        return ownMethods;
    }
    
    var a = enumMethods("android.app.Activity")
    a.forEach(function(s){
        console.log(s);
    });

});





// Java.perform(function(){
//     var Activity = Java.use("android.app.Activity");
//     Activity.onResume.implementation=function(){
//             send("this is onResume");
//             this.onResume();
//     };
// });
