import sys
import base64
import re

def getArg(argDefiner):
    for index, arg in enumerate(sys.argv):
        if argDefiner == arg:
            return sys.argv[index + 1]

filePath = getArg("-p")
flagType = getArg("-f")

def printSolve(original, decoded):
    if original:
        print("Original: " + original, flush=True)
    if decoded:
        print("Decoded: " + decoded, flush=True)
    print("")

def checkForFlag(line):
    try:
        if flagType in line:
            printSolve(line, line)
    except:
        pass
    try:
        if flagType in line[::-1]:
            printSolve(line, line[::-1])
    except:
        pass
    try:
        if flagType in base64.b64decode(line.encode("ascii")).decode("ascii"):
            printSolve(line, base64.b64decode(line.encode("ascii")).decode("ascii"))
    except:
        pass
    try:
        if flagType in base64.b64decode(line[::-1].encode("ascii")).decode("ascii"):
            printSolve(line, base64.b64decode(line[::-1].encode("ascii")).decode("ascii"))
    except:
        pass

if filePath and flagType:
    with open(filePath, encoding="utf8", errors='ignore') as f:
        content = f.read()
        for word in re.sub("[^0-9a-zA-Z+/=_}{]+", " ", content).split(" "):
            checkForFlag(word)
else:
    print("You have to upload a file and type a flagtype", flush=True)