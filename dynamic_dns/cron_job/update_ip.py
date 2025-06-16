import os
import requests


def get_public_ip():
    try:
        response = requests.get("http://checkip.amazonaws.com", timeout=5)
        response.raise_for_status()
        return response.text.strip()
    except requests.RequestException as e:
        print(f"Error retrieving public IP: {e}")
        return None


def read_stored_ip():
    if os.path.exists("./saved_ip.txt"):
        with open("./saved_ip.txt", "r") as f:
            return f.read().strip()

    return None


def write_ip(ip):
    with open("./saved_ip.txt", "w") as f:
        f.write(ip)


def submit_new_ip(new_ip):
    body = {"ip": new_ip}
    headers = {"x-api-key": os.environ.get("LAMBDA_API_KEY")}
    requests.post(
        os.environ.get("LAMBDA_ENDPOINT"), json=body, headers=headers, timeout=15
    )


if __name__ == "__main__":
    current_ip = get_public_ip()
    previous_ip = read_stored_ip()

    if current_ip != previous_ip:
        write_ip(current_ip)
        submit_new_ip(current_ip)

# Hello
