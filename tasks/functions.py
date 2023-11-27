# Store all sleeper functions in here from all 3 tasks.
import time

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


def recalibrate(table):
    return 0
    for i in table:
        for j in i:
            time.sleep(0.1)
            print(j, flush=True)
    time.sleep(0.72)

def verify(table):
    for i in table:
        j = reversed(i)
        s = max(j)
        # if s != 0:
            # print("Good", s, flush=True)
    # time.sleep(1.123)