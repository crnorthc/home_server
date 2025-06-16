import os
import json

from fastapi import FastAPI, Request
from fastapi.responses import RedirectResponse
from dotenv import load_dotenv
import requests

app = FastAPI()
load_dotenv()


@app.get("/resume")
def record_and_redirect(request: Request, id: str):
    ip = request.headers.get("x-forwarded-for", request.client.host)
    ip = ip.split(",")[0].strip()

    extra_message = "No Ip Address."
    if ip:
        extra_message = f"Ip address: {ip}"
        ip_info_response = requests.get(
            f"https://ipinfo.io/{ip}/json?token={os.environ.get('IPINFO_API_KEY')}",
            timeout=15,
        )

        try:
            ip_info = ip_info_response.json()
            city = ip_info["city"]
            state = ip_info["region"]
            extra_message += f"\nLocation: {city}, {state}"
        except requests.exceptions.JSONDecodeError:
            extra_message += "\nFailed to get location."
        except KeyError:
            extra_message += (
                f"\nGot invalid ip response.\n\nResponse:\n{json.dumps(ip_info)}"
            )

    requests.post(
        f"https://api.mailgun.net/v3/{os.environ.get('MAILGUN_EMAIL')}/messages",
        auth=("api", os.environ.get("MAILGUN_API_KEY", "API_KEY")),
        data={
            "from": f"Resume Tracker <postmaster@{os.environ.get('MAILGUN_EMAIL')}>",
            "to": "Caleb Northcott <crnorthc99@gmail.com>",
            "subject": "New Resume View",
            "text": f"New resume view for {id}.\n{extra_message}",
        },
        timeout=15,
    )

    return RedirectResponse("https://github.com/crnorthc")
