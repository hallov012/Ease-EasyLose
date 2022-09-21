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

