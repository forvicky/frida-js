import time
import frida

def my_message_handler(message, payload):
    print(message)
    print(payload)

device = frida.get_usb_device()
pid = device.spawn(["com.zdd.fridalearn"])
device.resume(pid)
time.sleep(1)
session = device.attach(pid)
with open("D:\\ASWorkSpace\\Fridalearn\\frida\\s3.js",encoding='UTF-8') as f:
    script = session.create_script(f.read())
script.on("message", my_message_handler)
script.load()

command = ""
while 1 == 1:
    command = input("Enter command:\n1: Exit\n2: Call secret function\nchoice:")
    if command == "1":
        break
    elif command == "2": #在这里调用
        script.exports.callsecretfunction()