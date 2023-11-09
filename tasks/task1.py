from time import sleep
import functions

def foo(x, y, z):
    sleep(x)
    sleep(y)
    g = []
    for i in range(10):
        functions.func1()
        sleep(z)
        m = i*i + i / 10 + 3246
        g[i] = max(i, 5)            # TODO: please fix, this doesn't run
        if i % 2 == 0:
            functions.func2()
            functions.func3()
    return x * y * z

foo(1, 3, 4)
functions.func1()