# 설치환경

가상머신 OS : Ubuntu 22.04.1 LTS (64bit)

JDK : java-8-openjdk-amd64

Hadoop : 2.7.1

HBase : 1.2.3

Zookeeper : 3.7.1

Hive : 2.3.9

# 설치

## JDK 설치

### JDK 삭제 & 설치

```java
sudo apt-get -y remove "java-*"
sudo apt-get install openjdk-8-jdk
```

### 자동 로그인 SSH 설정

```java
ssh-keygen -t rsa -P ""
cat $HOME/.ssh/id_rsa.pub >> $HOME/.ssh/authorized_keys
```

## 하둡 설치

### 설치

```java
/home/hadoop[계정명]
wget https://archive.apache.org/dist/hadoop/core/hadoop-2.7.1/hadoop-2.7.1.tar.gz
tar -xzf hadoop-2.7.1.tar.gz
```

## HBase 설치

### 설치

```java
wget http://archive.apache.org/dist/hbase/1.2.3/hbase-1.2.3-bin.tar.gz
tar -xzf hbase-1.2.3-bin.tar.gz
mv hbase-1.2.3 hbase
```

## Zookeeper 설치

### 설치

```java
wget https://dlcdn.apache.org/zookeeper/zookeeper-3.7.1/apache-zookeeper-3.7.1-bin.tar.gz
tar -zxf apache-zookeeper-3.7.1-bin.tar.gz
```

## Hive 설치

### 설치

```java
wget https://downloads.apache.org/hive/hive-2.3.9/apache-hive-2.3.9-bin.tar.gz
tar -xzf apache-hive-2.3.9-bin.tar.gz
mv apache-hive-2.3.9-bin hive
```

## 환경변수 설정

```java
sudo apt-get install vim
sudo vi /etc/profile
```

- 다음 코드 추가

```java
export JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64/
export HADOOP_HOME=/home/hadoop/hadoop-2.7.1
export HIVE_HOME=/home/hadoop/hive
export HBASE_HOME=/home/hadoop/hbase
export PATH=$PATH:/usr/bin:$JAVA_HOME/bin:$HADOOP_HOME/bin:$HIVE_HOME/bin:$HBASE_HOME/bin
export HADOOP_PID_DIR=/home/hadoop/hadoop-2.7.1/pids
export HADOOP_CLASSPATH=$JAVA_HOME/lib/tools.jar
export HADOOP_HOME=/home/hadoop/hadoop-2.7.1
export HADOOP_INSTALL=$HADOOP_HOME
export HADOOP_MAPRED_HOME=$HADOOP_HOME
export HADOOP_COMMON_HOME=$HADOOP_HOME
export HADOOP_HDFS_HOME=$HADOOP_HOME
export HADOOP_YARN_HOME=$HADOOP_HOME
export HADOOP_COMMON_LIB_NATIVE_DIR=$HADOOP_HOME/lib/native
export PATH=$PATH:$HADOOP_HOME/sbin:$HADOOP_HOME/bin
export JAVA_LIBRARY_PATH=$HADOOP_HOME/lib/native:$JAVA_LIBRARY_PATH
```

```java
source /etc/profile
```

## 하둡 환경설정

- 192.168.80.130 : 본인 IP 주소

```java
cd $HADOOP_HOME/etc/hadoop
```

### vi hdfs-site.xml

```java
<configuration>
 <property>
  <name>dfs.replication</name>
  <value>1</value>
 </property>
 <property>
  <name>dfs.name.dir</name>
  <value>file:///home/hadoop/hadoopdata/hdfs/namenode</value>
 </property>
 <property>
  <name>dfs.data.dir</name>
  <value>file:///home/hadoop/hadoopdata/hdfs/datanode</value>
 </property>
 <property>
  <name>dfs.http.address</name>
  <value>192.168.80.130:50160</value>
 </property>
</configuration>
```

### vi core-site.xml

```java
<configuration>
    <property>
        <name>fs.default.name</name>
        <value>hdfs://192.168.80.130:9000/</value>
    </property>
    <property>
        <name>dfs.permissions</name>
        <value>false</value>
    </property>
    <property>
        <name>hadoop.tmp.dir</name>
        <value>/home/hadoop/tmp/</value>
    </property>
</configuration>
```

### vi mapred-site.xml

```java
<configuration>
    <property>
        <name>mapreduce.framework.name</name>
        <value>yarn</value>
    </property>
</configuration>
```

### vi yarn-site.xml

```java
<configuration>
 <property>
  <name>yarn.nodemanager.aux-services</name>
  <value>mapreduce_shuffle</value>
 </property>
 <property>
  <name>yarn.resourcemanager.hostname</name>
  <value>192.168.80.130</value>
 </property>
</configuration>
```

### vi hadoop-env.sh

```java
export JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64/
export HADOOP_OPTS=-Djava.net.preferIPv4Stack=true
export HADOOP_CONF_DIR=/home/hadoop/hadoop-2.7.1/etc/hadoop
export HADOOP_HOME_WARN_SUPPRESS="TRUE"
export HADOOP_PID_DIR=/home/hadoop/hadoop-2.7.1/pids
```

### vi slaves

```java
localhost
```

## HBase 환경설정

```java
cd $HBASE_HOME/conf
```

### vi [hbase-env.sh](http://hbase-env.sh/)

```java
export JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64/
export HBASE_REGIONSERVERS=$HBASE_HOME/conf/regionservers
export HBASE_MANAGES_ZK=true
```

### vi hbase-site.xml

```java
<configuration>
   <property>
        <name>hbase.rootdir</name>
        <value>hdfs://192.168.80.130:9000/hbase</value>
   </property>
   <property>
        <name>hbase.master</name>
        <value>hdfs://192.168.80.130:60000</value>
   </property>
   <property>
        <name>hbase.zookeeper.quorum</name>
        <value>192.168.80.130</value>
   </property>
   <property>
        <name>hbase.zookeeper.property.dataDir</name>
        <value>/home/hadoop/zk_data</value>
   </property>
   <property>
        <name>hbase.cluster.distributed</name>
        <value>true</value>
   </property>
   <property>
        <name>dfs.support.append</name>
        <value>true</value>
   </property>
   <property>
        <name>dfs.datanode.max.xcievers</name>
        <value>4096</value>
   </property>
</configuration>
```

### vi regionservers

```java
192.168.80.130 # 본인 IP 추가
```

## Zookeeper 환경설정

```java
cd ~
ln -s ./apache-zookeeper-3.7.1 ./zookeeper

cd ~/zookeeper/conf
cp ./zoo_sample.cfg ./zoo.cfg
```

### vi zoo.cfg

```java
dataDir=/home/hadoop/zk_data

server.1=namenode 115.145.173.150:2888:3888
server.2=secondarynode 115.145.173.151:2888:3888
server.3=datanode1 115.145.173.152:2888:3888
server.4=datanode2 115.145.173.153:2888:3888
#server.5=datanode3 115.145.173.154:2888:3888
#server.6=datanode4 115.145.173.155:2888:3888
#server.7=datanode5 115.145.173.156:2888:3888
#server.8=datanode6 115.145.173.157:2888:3888
```

## Hive 환경설정

```java
cd $HIVE_HOME/conf
cp ./hive-env.sh.template ./hive-env.sh
```

### vi ./hive-env.sh

```java
export HADOOP_HOME=/home/hadoop/hadoop-2.7.1
```

## 동작확인

### 하둡 구동

```java
cd $HADOOP_HOME/sbin
./start-dfs.sh
./start-yarn.sh
```

### Zookeeper 구동

```java
cd ~/zookeeper/bin
./zkServer.sh start
```

### Hbase 구동

```java
cd $HBASE_HOME/bin
./start-hbase.sh
```

### Hive 구동

```java
cd $HIVE_HOME
./bin/schematool -initSchema -dbType derby
```

### Hive shell 구동

```java
cd $HIVE_HOME
./bin/hive
```

# 참고 사이트

[http://alphagong.blogspot.com/2016/11/hbase-installation-in-fully-distributed.html](http://alphagong.blogspot.com/2016/11/hbase-installation-in-fully-distributed.html)
