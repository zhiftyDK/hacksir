import whois
import sys
res = whois.whois(sys.argv[1])
print(res, flush=True)