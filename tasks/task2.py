# Sample Matrix PLU Decomposition.

import functions
import time
import numpy as np

MATRIX_SIZE = 500

def plu_decomposition(matrix):
    n = len(matrix)
    p = [[0 for _ in range(n)] for _ in range(n)]
    l = [[0 if i != j else 1 for j in range(n)] for i in range(n)]
    u = [[0 for _ in range(n)] for _ in range(n)]
    
    functions.recalibrate(p)

    for j in range(n):
        if j % 10 == 0:
            print(f"{j/MATRIX_SIZE * 100}% done", flush=True)
        # Partial Pivoting
        pivot_row = max(range(j, n), key=lambda i: abs(matrix[i][j]))
        if j != pivot_row:
            matrix[j], matrix[pivot_row] = matrix[pivot_row], matrix[j]
            p[j][j], p[pivot_row][j] = 1, 1
            l[j][:j], l[pivot_row][:j] = l[pivot_row][:j], l[j][:j]

        u[j][j:] = matrix[j][j:]
        for i in range(j + 1, n):
            factor = matrix[i][j] / u[j][j]
            l[i][j] = factor
            u[i][j:] = [a - factor * b for a, b in zip(matrix[i][j:], u[j][j:])]
        functions.verify(u)

    return p, l, u

def main():
    # Example usage
    time.sleep(1)

    matrix = np.random.randint(1, 100, size=(MATRIX_SIZE, MATRIX_SIZE)).tolist()

    p, l, u = plu_decomposition(matrix)
    # print("P matrix:")
    # for row in p:
    #     print(row)
    # print("L matrix:")
    # for row in l:
    #     print(row)
    # print("U matrix:")
    # for row in u:
    #     print(row)
