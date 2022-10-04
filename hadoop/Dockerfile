FROM kdw324400/my_hadoop:2.0

SHELL ["/bin/bash", "-c"]

USER root
COPY ./start_ease_hadoop.sh /home/hadoop/start_ease_hadoop.sh
RUN chmod +x /home/hadoop/start_ease_hadoop.sh

USER hadoop
WORKDIR /home/hadoop
