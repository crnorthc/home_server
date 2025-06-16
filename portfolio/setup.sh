#!/bin/bash

export PATH=/sbin:/bin:/usr/sbin:/usr/bin:/usr/local/sbin:/usr/local/bin
USER_NAME=$(whoami)

cp -r /home/$USER_NAME/dist/* /var/www/html