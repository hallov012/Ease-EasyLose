FROM ubuntu:20.04

SHELL ["/bin/bash", "-c"]
RUN echo 'root:1' | chpasswd
RUN adduser hadoop
RUN echo 'hadoop:1' | chpasswd
RUN usermod -aG sudo hadoop
RUN apt update
RUN apt install sudo -y
USER hadoop

# hadoop install
# RUN sudo apt update
RUN echo '1' | sudo -S apt install wget -y
RUN cd ~
RUN echo '1' | sudo -S wget http://kdd.snu.ac.kr/~kddlab/Project.tar.gz
RUN echo '1' | sudo -S tar zxf Project.tar.gz
RUN echo '1' | sudo -S chown -R hadoop:hadoop Project
RUN echo '1' | sudo -S mv ./Project/hadoop-3.2.2 /usr/local/hadoop
RUN echo '1' | sudo -S rm Project.tar.gz
RUN echo '1' | sudo -S apt install ssh openjdk-8-jdk ant -y
RUN ./Project/set_hadoop_env.sh
ENV JAVA_HOME /usr/lib/jvm/java-8-openjdk-amd64
ENV HADOOP_HOME /usr/local/hadoop
ENV PATH $HADOOP_HOME/bin:$HADOOP_HOME/sbin:$PATH
RUN source ~/.bashrc
RUN hadoop namenode -format
RUN start-dfs.sh

# hbase install
RUN stop-all.sh
RUN cd /usr/local
RUN echo '1' | sudo -S wget https://dlcdn.apache.org/hbase/2.4.14/hbase-2.4.14-bin.tar.gz
RUN echo '1' | sudo -S tar zxvf hbase-2.4.14-bin.tar.gz
RUN echo '1' | sudo -S mv hbase-2.4.14 /usr/local/hbase
RUN echo '1' | sudo -S rm ./hbase-2.4.14-bin.tar.gz
COPY ./hbase-env.sh /usr/local/hbase/conf/hbase-env.sh
COPY ./hbase-site.xml /usr/local/hbase/conf/hbase-site.xml
ENV HBASE_HOME /usr/local/hbase
ENV HADOOP_OPTS -Djava.library.path=$HADOOP_HOME/lib/native
ENV LD_LIBRARY_PATH $HADOOP_HOME/lib/navtive
ENV HADOOP_CLASSPATH $HBASE_HOME/lib/*

# zookeeper install
RUN echo '1' | sudo -S wget https://dlcdn.apache.org/zookeeper/zookeeper-3.7.1/apache-zookeeper-3.7.1-bin.tar.gz
RUN echo '1' | sudo -S tar xvf apache-zookeeper-3.7.1-bin.tar.gz
RUN echo '1' | sudo -S rm apache-zookeeper-3.7.1-bin.tar.gz
RUN echo '1' | sudo -S ln -s apache-zookeeper-3.7.1-bin zookeeper
RUN echo '1' | sudo -S mkdir -p /data
RUN echo '1' | sudo -S chmod 777 /data
RUN cd /data
COPY ./myid /data/myid
COPY ./zoo.cfg /usr/local/zookeeper/conf/zoo.cfg

COPY .bashrc ~/.bashrc
RUN source ~/.bashrc
COPY ./data/food_nutrition_DB_without_alias.csv ~/data/food_nutrition_DB_without_alias.csv
COPY ./src/ease.jar ~/Project/ease.jar

# start hadoop, hbase
RUN cd ~
RUN start-all.sh
RUN $HBASE_HOME/bin/start-hbase.sh
RUN jps

# # hbase shell
# #COPY ./hbase_set ~/hbase_set
# RUN echo "create 'nutrition_DB', 'nutrition'; create 'food_recommend', 'foods_num'" | $HBASE_HOME/bin/hbase shell -n
# # RUN exit

# # move data file

# RUN $HBASE_HOME/bin/hbase org.apache.hadoop.hbase.mapreduce.ImportTsv -Dimporttsv.separator="," -Dimporttsv.columns="HBASE_ROW_KEY,nutrition:carbon,nutrition:protein,nutrition:fat" nutrition_DB ~/data/food_nutrition_DB_without_alias.csv

# # run mapreduce func

# RUN hadoop jar ease.jar foodpernutrition