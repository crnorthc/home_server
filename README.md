# Home Server and Dynamic DNS Updater

This project powers a **home server running on a Raspberry Pi 4B** that maintains a dynamic DNS entry by detecting changes to its public IP address and notifying an AWS Lambda function.

## 🧠 Overview

Since residential ISPs often change public IP addresses, this setup ensures a consistent domain can still be used to reach the Raspberry Pi. A background script monitors for IP changes and updates AWS Route 53 records via a serverless API endpoint.

## 🧩 How It Works

1. A **Python script** runs on the Raspberry Pi 4B.
2. It periodically checks the current public IP (e.g. using `https://api.ipify.org`).
3. If the IP has changed since the last check, the script:
   - Sends a `POST` request to an **AWS Lambda function**, exposed via **API Gateway**.
   - The Lambda updates a **Route 53 DNS record** to point to the new IP.

## 🌐 Components

- **Raspberry Pi 4B** (running 24/7 at home - hopefully 🙏)
- **Python script** for IP monitoring
- **AWS Lambda** function with permission to update Route 53
- **Custom domain** managed via AWS Route 53 (e.g., `dnsupdate.mydomain.com`)
- **API Gateway** to expose the Lambda function securely
- **FastAPI App**

## 🔐 Security Notes

- The API endpoint is protected via an API key.
- The Pi does not store AWS credentials — it only calls the Lambda.
- Only the Lambda function has DNS update permissions.

## 🛠️ Setup

1. Deploy the Lambda function (see `dynamic_dns/lambda.py`).
2. Configure your Route 53 zone and domain.
3. On your Raspberry Pi:
   - Clone this repo
   - Install dependencies: `pip install -r job_requirements.txt`
   - Set environment variables (e.g. `LAMBDA_ENDPOINT`)
   - Run the script manually or via `cron`

## 📁 Files

- `dynamic_dns/update_ip.py`: script run on the Raspberry Pi
- `dynamic_dns/lambda.py`: AWS Lambda function code
- `.env`: environment config for local secrets (not committed)
- `lambda_requirements.txt`: Python dependencies for lambda function
- `job_requirements.txt`: Python dependencies for cron job script

## 📅 Example Cron Entry

```cron
*/5 * * * * /usr/bin/python3 /home/pi/update_ip.py >> /var/log/ip_update.log 2>&1
```
