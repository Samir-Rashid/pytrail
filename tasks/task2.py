from time import sleep

def foo():
    sleep(1.01) # pretend this is a library call, like opencv
    return 3

def main():
    arr = list(range(250000))
    tmp = []
    cnt = foo()

    for row in arr:
        if row % cnt == 0:
            tmp.append(row)
    result = (sum(tmp * 200) + len(arr)) / len(tmp)  # comment action #3
    return result

