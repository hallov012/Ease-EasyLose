```java
wget http://archive.apache.org/dist/sqoop/1.4.7/sqoop-1.4.7.bin__hadoop-2.6.0.tar.gz
// 압축해제
tar xvf sqoop-1.4.7.bin__hadoop-2.6.0.tar.gz
ln -s sqoop-1.4.7.bin__hadoop-2.6.0 sqoop
// sqoop 실행확인
cd sqoop-1.4.7.bin__hadoop-2.6.0
bin/sqoop help
```

[https://user-images.githubusercontent.com/99601412/191288635-f92c67ce-36d1-48ae-8456-960d3be78127.png](https://user-images.githubusercontent.com/99601412/191288635-f92c67ce-36d1-48ae-8456-960d3be78127.png)

```java
vi ~/.bashrc
```

```java
export SQOOP_HOME=/home/hadoop/sqoop
export SQOOP_CONF_DIR=$SQOOP_HOME/conf

export PATH=$PATH:$HADOOP_HOME/sbin:$HADOOP_HOME/bin:$SQOOP_HOME/bin
```

```java
cp sqoop/conf/sqoop-env-template.sh sqoop/conf/sqoop-env.sh
vi sqoop/conf/sqoop-env.sh
```

```java
export HADOOP_HOME=/usr/local/hadoop
export HADOOP_COMMON_HOME=/usr/local/hadoop
export HADOOP_MAPRED_HOME=/usr/local/hadoop

```

## 참고사이트

[https://earthconquest.tistory.com/241](https://earthconquest.tistory.com/241)