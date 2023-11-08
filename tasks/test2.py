from time import sleep

def foo(x, y, z):
    g = [x for x in range(10)]
    sleep(x)
    sleep(y)
    for i in range(10):
        sleep(z)
        m = i*i + i / 10 + 3246
        g[i] = max(i, 5)
    return x * y * z

