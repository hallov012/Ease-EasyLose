## Sqoop 설치

- 스쿱 버전 1 설치

```java
wget http://archive.apache.org/dist/sqoop/1.4.7/sqoop-1.4.7.bin__hadoop-2.6.0.tar.gz
// 압축해제
tar xvf sqoop-1.4.7.bin__hadoop-2.6.0.tar.gz
ln -s sqoop-1.4.7.bin__hadoop-2.6.0 sqoop
// sqoop 실행확인
sqoop/bin/sqoop help
```

- 다음 이미지가 나오면, 정상 설치된 것

![https://user-images.githubusercontent.com/99601412/191288635-f92c67ce-36d1-48ae-8456-960d3be78127.png](https://user-images.githubusercontent.com/99601412/191288635-f92c67ce-36d1-48ae-8456-960d3be78127.png)

### 환경파일 설정

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

## Mysql-connector 설치

```java
wget http://dev.mysql.com/get/Downloads/Connector-J/mysql-connector-java-5.1.38.tar.gz
tar xzvf mysql-connector-java-5.1.38.tar.gz
cd mysql-connector-java-5.1.38/
cp mysql-connector-java-5.1.38-bin.jar ~/sqoop/lib
```

```java
sqoop list-databases --connect jdbc:mysql://IP_ADDRESS:3306/ --username root --password 123
```
