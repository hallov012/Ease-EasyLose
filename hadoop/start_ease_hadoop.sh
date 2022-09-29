#!/bin/bash

echo '1' | sudo -S service ssh start

cd /home/hadoop
pwd
/usr/local/hadoop/sbin/start-all.sh
echo "start-all done"
/usr/local/hbase/bin/start-hbase.sh
echo "start-hbase done"
ssh localhost
# /usr/local/hbase/bin/hbase shell
