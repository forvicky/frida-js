import time
import frida
import base64


def my_message_handler(message, payload):
    print(message)
    print(payload)
    if message["type"] == "send":
        print(message["payload"])
        data = message["payload"].split(":")[1].strip()
        print('message:', message)
        data = base64.b64decode(data).decode()
        user, pw = data.split(":")
        data = base64.b64encode(("admin" + ":" + pw).encode(encoding="utf-8")).decode()
        print("encoded data:", data)
        script.post({"my_data": data})  # 将JSON对象发送回去
        print("Modified data sent")

device = frida.get_usb_device()
pid = device.spawn(["com.zdd.fridalearn"])
device.resume(pid)
time.sleep(1)
session = device.attach(pid)
with open("D:\\ASWorkSpace\\Fridalearn\\frida\\s4.js",encoding='UTF-8') as f:
    script = session.create_script(f.read())
script.on("message", my_message_handler)  # 注册消息处理函数
script.load()
input()