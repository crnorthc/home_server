import requests


def get_public_ip():
    try:
        response = requests.get("https://api.ipify.org?format=text", timeout=5)
        response.raise_for_status()
        return response.text.strip()
    except requests.RequestException as e:
        print(f"Error retrieving public IP: {e}")
        return None


if __name__ == "__main__":
    ip = get_public_ip()
    if ip:
        print(f"Public IP: {ip}")
