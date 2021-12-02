import sys

def read(file,separator='\n'):
    code_raw = open(file, "r").read()
    code = code_raw.split(separator)
    return code

code = read("input1.txt")

nb_increase = 0

for i in range(1,len(code)):
    print(code[i])
    if(int(code[i]) > int(code[i-1])):
        nb_increase += 1

print(nb_increase)