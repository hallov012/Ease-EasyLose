---
author: Dongwon Kim
last_modified_on: 2022-09-20
---
# HBase Settings
```xml
<!-- hadoop core-site.xml -->
<configuration>
    <property>
        <name>fs.defaultFS</name>
        <value>hdfs://localhost:9000</value>
    </property>
    <property>
        <name>hadoop.tmp.dir</name>
        <value>/home/hadoop/hadoop_tmp</value>
    </property>
    <property> 
      <name>hadoop.proxyuser.hadoop.hosts</name> 
      <value>*</value> 
    </property> 
    <property> 
      <name>hadoop.proxyuser.hadoop.groups</name> 
      <value>*</value> 
    </property>
</configuration>
```

```xml
<!-- hbase hbase-site.xml -->
<configuration>
	<property>
	    <name>hbase.cluster.distributed</name>
	    <value>true</value>
	  </property>
	  <property>
	    <name>hbase.tmp.dir</name>
	    <value>${java.io.tmpdir}/hbase-${user.name}</value>
	  </property>
	  <property>
	    <name>hbase.rootdir</name>
	    <value>hdfs://127.0.0.1:9000/hbase</value>
	  </property>
	  <property>
	    <name>hbase.zookeeper.quorum</name>
	    <value>localhost</value>
	  </property>
	  <property>
	    <name>hbase.zookeeper.property.clientPort</name>
	    <value>2181</value>
	  </property>
	  <property>
	    <name>hbase.master</name>
	    <value>localhost:60000</value>
	  </property>
</configuration>
```

## zookeeper 설치

```bash
$ cd /usr/local
$ sudo wget https://dlcdn.apache.org/zookeeper/zookeeper-3.7.1/apache-zookeeper-3.7.1-bin.tar.gz
$ sudo tar xvf apache-zookeeper-3.7.1-bin.tar.gz
$ sudo ln -s apache-zookeeper-3.7.1-bin zookeeper
$ sudo mkdir -p /data
$ cd /data
$ sudo echo 1 > ./myid
$ cd /usr/local
$ sudo /usr/local/zookeeper/conf/zoo.cfg
```

```bash
tickTime=2000
initLimit=10
syncLimit=5
dataDir=/data
clientPort=2181
server.1=zk01:2888:3888
```

```bash
$ sudo ufw allow 2181
$ sudo ufw allow 2888
$ sudo ufw allow 3888
```

- HBase에서는 기본적으로 zookeeper가 hbase 실행될 때 실행되고 꺼질 때 꺼지게 설정되어 있음
- pseudo distributed mode로 실행
- 실행 순서

```bash
$ start-all.sh
$ hdfs dfsadmin -safemode leave
$ $HBASE_HOME/bin/start-hbase.sh
$ $HBASE_HOME/bin/hbase shell
```

## 그 외 에러

- KeeperErrorCode = ConnectionLoss for /hbase/master
    - zookeeper를 설치하고 hbase-site.xml을 잘 설정하니 밑 에러로 변경됨
- KeeperErrorCode = NoNode for /hbase/master”
    - hbase shell에서 status 실행했을 때 등장한 에러
    - HMaster가 실행되고 있지 않기 때문이라는 의견이 많았음
    - 실제로 시스템 내에서 HMaster가 실행되었다가 좀 있음 꺼짐
    - $HBASE_HOME/logs/hbase-***-haster.log에서 `[master/ubuntu:16000:become Active Master] master.HMaster: Failed to become active master` 확인
    - hbase 멈춘 채로 `hdfs dfs -rm -r /hbase/*` 진행하고 다시 실행하니 해결
- util.NativeCodeLoader: Unable to load native-hadoop library for your platform... using builtin-java classes where applicable
    - ~/.bashrc에 환경변수를 추가해주면 된다는 의견이 많아서 진행함
    - hadoop, hbase에서 모두 발생했는데 추가하니 hadoop에서는 아예 발생하지 않고 hbase에서는 처음에는 안 발생하다 다시 시작하니 발생 → 그러나 shell에 문제는 없었음
    
    ```bash
    # ~/.bashrc의 맨 밑에 추가
    export JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64
    export HADOOP_HOME="/usr/local/hadoop"
    export PATH="$HADOOP_HOME/bin:$HADOOP_HOME/sbin:$PATH"
    export HBASE_HOME="/usr/local/hbase"
    export HADOOP_OPTS="-Djava.library.path=$HADOOP_HOME/lib/native"
    export LD_LIBRARY_PATH="$HADOOP_HOME/lib/native"
    ```
