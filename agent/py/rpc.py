import frida

def on_message(message,data):
    if message['type']=='send':
        print(message['payload'])
    elif message['type']=='error':
        print(message['stack'])

session = frida.get_usb_device().attach('com.android.systemui')

# """ 表示有格式的字符串 """
source = """
    rpc.exports = {
        add:function(a,b){
            return a+b;
        },
        sub:function(a,b){
            return a-b;
        }
    };
"""

script = session.create_script(source)
#script.on('message',on_message)
script.load()
print(script.exports.add(2,3))
print(script.exports.sub(5,3))
session.detach()