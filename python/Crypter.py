from Crypto.Protocol.KDF import PBKDF2
from Crypto.Cipher import AES
from Crypto.Util.Padding import pad, unpad
import base64
import sys

def encrypt(message, password):
    data = bytes(password, "utf-8")
    salt = data + bytes(32 - len(data))
    iv = data + bytes(16 - len(data))
    key = PBKDF2(password, salt, dkLen=32)
    cipher = AES.new(key, AES.MODE_CBC, iv=iv)
    ciphered_data = cipher.encrypt(pad(bytes(message, "utf-8"), AES.block_size))
    base64_data = base64.b64encode(ciphered_data).decode("utf-8")
    return base64_data

def decrypt(message, password):
    try:
        data = bytes(password, "utf-8")
        salt = data + bytes(32 - len(data))
        iv = data + bytes(16 - len(data))
        key = PBKDF2(password, salt, dkLen=32)
        cipher = AES.new(key, AES.MODE_CBC, iv=iv)
        deciphered_data = unpad(cipher.decrypt(base64.b64decode(message)), AES.block_size).decode("utf-8")
        return deciphered_data
    except:
        return message

if "-e" in sys.argv:
    message = sys.argv[sys.argv.index("-e") + 1]
    password = sys.argv[sys.argv.index("-p") + 1]
    encrypted_message = encrypt(message, password)
    print(encrypted_message, flush=True)
elif "-d" in sys.argv:
    message = sys.argv[sys.argv.index("-d") + 1]
    password = sys.argv[sys.argv.index("-p") + 1]
    decrypted_message = decrypt(message, password)
    print(decrypted_message, flush=True)