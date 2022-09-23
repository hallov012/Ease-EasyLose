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

## MariaDB 설치

```java
sudo apt-get install -y mariadb-server
sudo mysqladmin password [pw]
sudo mysql
select user, host, password, plugin from mysql.user;
//root 비밀번호 있을시 정상
create user 'root'@'%' identified by '[pw]';
GRANT ALL PRIVILEGES on *.* to 'root'@'%';
FLUSH PRIVILEGES;
exit
```

### 외부접속 환경설정

```java
sudo vi /etc/mysql/mariadb.conf.d/50-server.cnf
// bind-address 부분 주석처리 해주기
service mysql restart
sudo ufw allow 3306/tcp
```

### Import하는 Test용 Table 생성

```java
mysql -u root -p
create database test;

use test;

create table dept(
deptno int(10) not null,
deptname varchar(30) not null
);

insert into dept values( 1, 'aaa');
insert into dept values( 2, 'bbb');
insert into dept values( 3, 'ccc');
insert into dept values( 4, 'ddd');
insert into dept values( 5, 'eee');
insert into dept values( 6, 'fff');

select * from dept;
```

### MariaDB 연결 테스트

```java
sqoop/bin/sqoop list-databases --connect jdbc:mysql://127.0.0.1:3306 --username root --password [pw]
```

## MariaDB → HDFS 이관

```java
sqoop/bin/sqoop import --connect jdbc:mysql://127.0.0.1:3306/test --table dept --target-dir /user/hadoop/mysql_table --username root --P -m 1
hdfs dfs -cat /user/hadoop/mysql_table/part-m-00000

// 폴더 존재 시 에러발생
hdfs dfs -rm -r /user/hadoop/mysql_table/
```

### 에러

![image](https://user-images.githubusercontent.com/99601412/191803951-c144178f-c370-47c8-82ef-8ee8aa2dfb85.png)

- JDBC가 MySQL이라서 이지 않을까? 추축
- 근데 mariadb JDBC를 설치해봐도 크게 달라지지 않음
  ## Export 해서 저장되는 Table 생성
  ```java
  mysql -u root -p
  use test;
  create table dept2(
  deptno varchar(30) not null,
  deptname int(10) not null
  );
  ```

## HDFS → MariaDB이관

```java
sqoop/bin/sqoop export --connect jdbc:mysql://127.0.0.1:3306/test --table dept2 --export-dir /user/hadoop/wordcount_test_out/part-r-00000 --username root --P --fields-terminated-by “\t”
```

### 에러

![image](https://user-images.githubusercontent.com/99601412/191804747-b103a2c6-7bd6-4515-b2aa-6e3828409b01.png)

### 계정 추가 생성

```java
sudo mysql
create user 'hoon'@'%' identified by '[pw]';
grant all privileges on *.* to 'hoon'@'%';
FLUSH PRIVILEGES;

mysql -u hoon -p
```

### 참고사이트

[https://earthconquest.tistory.com/241](https://earthconquest.tistory.com/241)

### 에러 - 해결

![image](https://user-images.githubusercontent.com/99601412/191801452-cf622d1d-b583-45da-abce-862e9c640ccd.png)

### 해결

```java
cd ~
wget https://mirror.navercorp.com/apache//commons/lang/binaries/commons-lang-2.6-bin.tar.gz
tar -xvf commons-lang-2.6-bin.tar.gz
cd commons-lang-2.6

cp commons-lang-2.6.jar /sqoop/lib
```

### 정리

- Job 부분에서 에러가 발생하여 진행하지 못함
