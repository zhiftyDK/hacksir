import requests
import sys
sys.dont_write_bytecode = True

def get_location():
    ip_address = sys.argv[1]
    response = requests.get(f'https://ipapi.co/{ip_address}/json/').json()
    location_data = str({
        "ip": ip_address,
        "city": response.get("city"),
        "region": response.get("region"),
        "country": response.get("country_name")
    })
    return location_data


print(get_location(), flush=True)