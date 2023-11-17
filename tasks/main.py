from time import sleep
import functions

def foo():
    sleep(1.01)
    return 3

def foo2(x, y, z):
    sleep(x)
    sleep(y)
    g = []
    for i in range(2):
        functions.func1()
        sleep(z)
        m = i*i + i / 10 + 3246
        if m % 2 == 0:
            functions.func2()
            functions.func3()
    return x * y * z

def main(x, y, z):
    arr = list(range(250000))
    tmp = []
    cnt = foo()

    for row in arr:
        if row % cnt == 0:
            tmp.append(row)
    result = (sum(tmp * 200) + len(arr)) / len(tmp)  
    result2 = foo2(x, y, z)
    return result * result2

