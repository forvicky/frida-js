/*
中级能力：远程调用
*/
console.log("Script loaded successfully ");

Java.perform(function () {
    var tv_class = Java.use("android.widget.TextView");
    tv_class.setText.overload("java.lang.CharSequence").implementation = function (x) {
        var string_to_send = x.toString();
        var string_to_recv;
        send(string_to_send); // 将数据发送给kali主机的python代码
        recv(function (received_json_object) {
            console.log("this is recv");
            string_to_recv = received_json_object.my_data
            console.log("string_to_recv: " + string_to_recv);
        }).wait(); //收到数据之后，再执行下去

        var string_class = Java.use("java.lang.String"); //获取String类型
        var my_string = string_class.$new(string_to_recv); //new一个新字符串

        return this.setText(my_string);
    }
});