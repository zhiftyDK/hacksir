import ipaddress
import socket
import sys
from multiprocessing import Process

def main():
    #Get ip subnet and split into array
    start_ip = ipaddress.IPv4Address(sys.argv[1])
    end_ip = ipaddress.IPv4Address(sys.argv[2])

    #Loop through ip range
    for ip_int in range(int(start_ip), int(end_ip) + 1):
        ip = str(ipaddress.IPv4Address(ip_int))
        try:
            p = Process(target=checkIP, args=(ip,))
            p.start()
        except:
            print("Exception is thrown")
            continue

#Check ip address hostname
def checkIP(ip):
    try:
        hostname = socket.gethostbyaddr(ip)[0]
        print(f"[Hostname: {hostname}, Ipaddress: {socket.gethostbyname(hostname).strip()}]")
    except:
        pass

if __name__ == '__main__':
    main()
