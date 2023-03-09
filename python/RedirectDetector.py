import requests
import sys
sys.dont_write_bytecode = True
r = requests.get(sys.argv[1])

for x in r.history:
    print(x.url, end="\n\n", flush=True)