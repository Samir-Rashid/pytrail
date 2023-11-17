# Store all sleeper functions in here from all 3 tasks.
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


def recalibrate(table):
    return 0
    for i in table:
        for j in i:
            time.sleep(0.1)
            print(j)
    time.sleep(0.72)

def verify(table):
    for i in table:
        j = reversed(i)
        s = max(j)
        # if s != 0:
            # print("Good", s)
    # time.sleep(1.123)