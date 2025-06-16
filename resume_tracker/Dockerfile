# Start by pulling the python image
FROM python:3.13-rc-bookworm

# Copy the requirements and other necessary files first
WORKDIR /app
COPY ./requirements.txt /app/requirements.txt

# Install Python dependencies
RUN pip install -r requirements.txt

# Copy the rest of the application
COPY ./main.py /app/main.py
COPY ./.env /app/.env

# Custom script that starts cron and then your application
COPY start.sh /start.sh
RUN chmod +x /start.sh

# Expose the port the app runs on
EXPOSE 8000

# Run the start script
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--workers", "2"]