import whois
import sys
sys.dont_write_bytecode = True
res = whois.whois(sys.argv[1])
print(res, flush=True)