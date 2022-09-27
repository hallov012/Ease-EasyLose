FROM kdw324400/my_hadoop:2.0

SHELL ["/bin/bash", "-c"]
USER hadoop

RUN echo '1' | sudo -S /etc/init.d/ssh start
RUN ssh localhost
RUN start-all.sh
RUN $HBASE_HOME/bin/start-hbase.sh
