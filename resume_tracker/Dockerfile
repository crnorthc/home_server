FROM python:3.11-bookworm

WORKDIR /app
COPY ./requirements.txt /app/requirements.txt

RUN pip install --prefer-binary -r requirements.txt

COPY ./main.py /app/main.py
COPY ./.env /app/.env

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--workers", "2"]