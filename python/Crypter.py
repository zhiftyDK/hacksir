import json
import sys
sys.dont_write_bytecode = True
import base64
from Crypto.Cipher import AES
from Crypto.Protocol.KDF import PBKDF2

salt = b'\x03J\x91\xb5\x85\xa9\xa7\xd7\xd3\xc4\x1aZ!Bf\xf0\xd6\xba\xf7${ \xbb\x85T\xb8\xcf3C\xe5\xa3\xe5'

def encrypt(message, password):
    key = PBKDF2(password, salt, dkLen=32)
    cipher = AES.new(key, AES.MODE_GCM)
    ciphertext, tag = cipher.encrypt_and_digest(bytes(message, "utf-8"))
    json_k = ['nonce', 'ciphertext', 'tag']
    json_v = [base64.b64encode(x).decode('utf-8') for x in [cipher.nonce, ciphertext, tag]]
    result = json.dumps(dict(zip(json_k, json_v)))
    return base64.b64encode(bytes(result, "utf-8")).decode("utf-8")

def decrypt(message, password):
    try:
        key = PBKDF2(password, salt, dkLen=32)
        b64 = json.loads(base64.b64decode(message).decode("utf-8"))
        json_k = ['nonce', 'ciphertext', 'tag']
        jv = {k:base64.b64decode(b64[k]) for k in json_k}
        cipher = AES.new(key, AES.MODE_GCM, nonce=jv['nonce'])
        plaintext = cipher.decrypt_and_verify(jv['ciphertext'], jv['tag']).decode("utf-8")
        return plaintext
    except (ValueError, KeyError):
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
