#!/bin/bash

export PATH=/sbin:/bin:/usr/sbin:/usr/bin:/usr/local/sbin:/usr/local/bin
USER_NAME=$(whoami)

cd /home/$USER_NAME/cron_job

python -m venv venv
. ./venv/bin/activate

pip install -r requirements.txt


echo "*/5 * * * * PATH=/sbin:/bin:/usr/sbin:/usr/bin:/usr/local/sbin:/usr/local/bin cd /home/$USER_NAME/cron_job && python update_ip.py > /var/log/ip_update.log 2>&1" >> /home/$USER_NAME/cron_job/crontab
crontab -u $USER_NAME crontab