# Home Server and Dynamic DNS Updater

This project powers a **home server running on a Raspberry Pi 4B** that maintains a dynamic DNS entry by detecting changes to its public IP address and notifying an AWS Lambda function. The server is currently running a FastAPI application and a Vite+React portfolio website.

## 📄 Resume Link Tracker

Using a custom built tool to customize resumes for a given job description, I attach a url to view the project. This url first hits the FastAPI app to log the link click and notify me via email, then redirects to my github to view the project.

## 🧑🏽‍💻 Portfolio

The Vite+React static portfolio website is built then served using nginx. You can check it out here https://calebnorthcott.com

Using a custom built tool to customize resumes for a given job description, I attach a url to view the project. This url first hits the FastAPI app to log the link click and notify me via email, then redirects to my github to view the project.

## 🧠 Dynamic DNS Overview

Since residential ISPs often change public IP addresses, this setup ensures a consistent domain can still be used to reach the Raspberry Pi. A background script monitors for IP changes and updates AWS Route 53 records via a serverless API endpoint.

### 🧩 How It Works

1. A **Python script** runs on the Raspberry Pi 4B.
2. It periodically checks the current public IP (e.g. using `https://api.ipify.org`).
3. If the IP has changed since the last check, the script:
   - Sends a `POST` request to an **AWS Lambda function**, exposed via **API Gateway**.
   - The Lambda updates a **Route 53 DNS record** to point to the new IP.

### 🌐 Components

- **Raspberry Pi 4B** (running 24/7 at home - hopefully 🙏)
- **Python script** for IP monitoring
- **AWS Lambda** function with permission to update Route 53
- **Custom domain** managed via AWS Route 53 (e.g., `dnsupdate.mydomain.com`)
- **API Gateway** to expose the Lambda function securely
