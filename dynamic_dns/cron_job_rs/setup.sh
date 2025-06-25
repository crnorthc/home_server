#!/bin/bash

export PATH=/sbin:/bin:/usr/sbin:/usr/bin:/usr/local/sbin:/usr/local/bin
USER_NAME=$(whoami)

cd /home/$USER_NAME/cron_job_rs

cargo build --release

echo "*/5 * * * * PATH=/sbin:/bin:/usr/sbin:/usr/bin:/usr/local/sbin:/usr/local/bin cd /home/$USER_NAME/cron_job_rs && ./target/release/cron_job_rs > /var/log/ip_update.log 2>&1" >> /home/$USER_NAME/cron_job_rs/crontab
crontab -u $USER_NAME crontab