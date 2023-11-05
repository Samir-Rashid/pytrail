import time

def func1():
    time.sleep(1.2)
    print("Hello World")
    func2()

def func2():
    time.sleep(1.1)
    print("Goodnight World")

def func3():
    time.sleep(2.1)
    print("Good Morning World")

def func4():
    time.sleep(1.4)
    print("Hello Mars")