import time
from time import sleep

def foo():
    sleep(1.01)
    return 3

def foo2(x, y, z):
    sleep(x)
    sleep(y)
    g = []
    for i in range(2):
        func1()
        sleep(z)
        m = i*i + i / 10 + 3246
        if m % 2 == 0:
            func2()
            func3()
    return x * y * z

def main(x, y, z):
    print("Task1", flush=True)
    arr = list(range(250000))
    tmp = []
    cnt = foo()

    for row in arr:
        if row % cnt == 0:
            tmp.append(row)
    result = (sum(tmp * 200) + len(arr)) / len(tmp)
    result2 = foo2(x, y, z)
    return result * result2

def func1():
    time.sleep(1.2)
    print("Hello World", flush=True)
    func2()

def func2():
    time.sleep(1.1)
    print("Goodnight World", flush=True)

def func3():
    time.sleep(2.1)
    print("Good Morning World", flush=True)

def func4():
    time.sleep(1.4)
    print("Hello Mars", flush=True)
