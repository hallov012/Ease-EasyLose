---
author: Dongwon Kim
last_modified_on: 2022-09-06
---
# Hbase
## HBase 설치

- hbase 버전 선택
    - jdk version: 1.8
    - JDK8과 호환되는 hbase: 2.3+, 2.0~ 2.2, 1.2+, 0.94
    - stable version인 **2.4.14** 버전을 선택
    - src.tar.gz말고 bin.tar.gz를 설치
    
    `wget [https://dlcdn.apache.org/hbase/2.4.14/hbase-2.4.14-bin.tar.gz](https://dlcdn.apache.org/hbase/2.4.14/hbase-2.4.14-bin.tar.gz)`
    
- unzip
    
    ```
    $ tar xzvf hbase-3.0.0-alpha-4-SNAPSHOT-bin.tar.gz
    $ cd hbase-2.4.14/
    ```
    
- java home 설정
    
    ```
    // jdk 경로 알아내기
    $ which javac
    $ readlink -f /usr/bin/javac
    ```
    
    - conf/hbase-env.sh의 `export JAVA_HOME=` 부분 수정
    - 이대로 시작하면 `GETJAVAPROPERTY_USER: invalid variable name` 에러 발생
    - `export HBASE_DISABLE_HADOOP_CLASSPATH_LOOKUP="true"` 주석 해제하면 에러 해결됨
- hbase shell version: 2.4.14
- hbase 시작 & 종료
    - hbase dir에서 ./bin/start-hbase.sh
    - hbase dir에서 ./bin/stop-hbase.sh

## HBase의 Data Model

- table
    - 여러 개의 row로 이뤄짐
- row
    - key, 하나 이상의 column과 value로 이뤄짐
    - key로 알파벳 순서 대로 저장할 때 sort 됨
        - row key를 어떤 걸로 할지가 매우 중요
        - 연관된 데이터가 인근에 위치하도록 디자인 하는 게 좋음
        - 주로 website domain
            - website의 경우 org.apache.www 처럼 거꾸로 저장하는 게 좋음
        - row, column family, column qualifier, timestamp의 우선순위에 의해 sort 됨
- column
    - column family, qualifier로 이뤄짐
- column family
    - 물리적으로 column을 같은 set으로 만들어 같은 위치에 넣음
    - 성능적인 측면에서 활용 가능
    - column family마다 storage property가 정해짐
        - 어떤 게 cache에 저장될지, 어떤 게 compressed 될지, key를 어떻게 encode할지 등
    - column family는 테이블이 만들어질 때 정해짐(중간 변경 불가)
    - 공식 문서에 따르면 2 ~ 3 개 이상의 column family 가 형성 되면 제대로 동작을 하지 않기 때문에 최대한 적게 유지하는 것을 권장
    - 가능한 한 1개로 유지 권장
- column Qualifier
    - family에 index 정보 주려고 만듦
    - 통상적으로 쓰는 col 이름
    - column family:column qualifier 형식으로 사용(content:pdf, content: html 등)
    - row마다 설정할 수 있고 table이 만들어지고 나서도 추가될 수 있음
- cell
    - row, column family, column qualifier의 집합
    - value, timestamp(version 나타내기용)가 포함됨
- version
    - get으로 데이터를 읽을 시 가장 최신, 가장 버전 번호가 높은 게 읽힘
    - 저장될 최대 버전 개수를 정할 수 있음
    - default는 버전 0.96은 3, 나머지는 1임
    - minimum 개수도 설정 가능
    - default로 버전을 세팅하면 밀리초 단위까지 들어간 timestamp가 version으로 설정됨
    - TTL 등 계산을 위해 timestamp가 HBase 내부적으로 사용되는 경우가 많으므로 되도록 직접 version을 설정하진 않는 것을 권장
        - 필요하다면 row key에 version을 포함하는 형식으로 쓰기

## get

```java
public static final byte[] CF = "cf".getBytes();
public static final byte[] ATTR = "attr".getBytes();
...
Get get = new Get(Bytes.toBytes("row1"));
Result r = table.get(get);
byte[] b = r.getValue(CF, ATTR); // returns current version of value
```

## put

```java
// default
public static final byte[] CF = "cf".getBytes();
public static final byte[] ATTR = "attr".getBytes();
...
Put put = new Put(Bytes.toBytes(row));
put.add(CF, ATTR, Bytes.toBytes( data));
table.put(put);

// version 지정
public static final byte[] CF = "cf".getBytes();
public static final byte[] ATTR = "attr".getBytes();
...
Put put = new Put( Bytes.toBytes(row));
long explicitTimeInMs = 555; // just an example
put.add(CF, ATTR, explicitTimeInMs, Bytes.toBytes(data));
table.put(put);
```

## join

- hbase에서 support 안 됨
- denormalize 해서 한 테이블에 합쳐 넣기
- lookup table 만들어서 처리하기
- 등의 방식을 이용하여 직접 처리해야 함

## schema

```java
Configuration config = HBaseConfiguration.create();
Admin admin = new Admin(conf);
TableName table = TableName.valueOf("myTable");
admin.disableTable(table);
HColumnDescriptor cf1 = ...;
admin.addColumn(table, cf1); // adding new ColumnFamily
HColumnDescriptor cf2 = ...;
admin.modifyColumn(table, cf2); // modifying existing ColumnFamily
admin.enableTable(table);
```

## Data type

- bytes in bytes out
- bytes로 바뀔 수 있는 건 어떤 것이듯 상관 없음(이미지도)

## mapreduce와 연결

- hbase의 dependency jar를 만들고 HADOOP_CLASSPATH를 사용하는 방법을 통해 연결 가능

## 사전 학습 hadoop

- 사전 학습한 내용에 따라 hadoop을 설치한 상태에서 진행함
- usr/local/hadoop/etc/hadoop에 core-site.xml, hadoop-env.sh가 있음

## HBase Stand-alone

- hbase를 설치한 dir에서 ./bin/hbase shell 실행
- create ‘test, ‘cf’로 test라는 이름의 테이블과 cf라는 column family 지정
- put ‘test’, ‘row1’, ‘cf:a’, ‘value1’
    - test라는 테이블에 row1이라는 키를 가지는 row를 만든다
    - a라는 column qualifier의 col에 value1을 저장한다
- scan ‘test’
    - test에 저장된 데이터를 불러올 수 있음
    - limit도 가능
- get ‘test’, ‘row1’
    - row 한 줄 읽기
- disable ‘test’
    - 테이블을 변경하거나 삭제하려면 테이블을 먼저 비활성화 해야 함

# HBase Pseudo Distributed
- 테스트, prototype을 위해 HBase daemon 여러 개를 한 개의 host에서 돌리는 것
→ 우리 프로젝트에는 어차피 server가 하나밖에 없기 때문에 이 모드를 사용하면 될 듯
- psuedo_distributed는 기존 파일 시스템 혹은 HDFS를 사용할 수 있음
- fully distributed는 실제로 여러 서버에서 HBase를 돌리는 것으로 HDFS만을 사용해야 함

## 모드 변경(HDFS 사용)

- vm 전원을 키고 나면 하둡 stop했다 시작하기
- hbase 중지 `~/hbase % ./bin/stop-hbase.sh`
- hbase-site.xml 수정(아래 내용만 남기고 있던 건 삭제)
    
    ```java
    // ~/hbase/conf/hbase-site.xml의 configuration 안
    <property>
      <name>hbase.cluster.distributed</name>
      <value>true</value>
    </property>
    <property>
      <name>hbase.rootdir</name>
      <value>hdfs://localhost:9000/hbase</value>
    </property>
    ```
    
    - 예제에서는 hdfs가 8020 포트로 설정되어 있음
        - 이대로 실행하면 권한 없다고 안됨
    - 사전 학습에서 설정한 hdfs는 9000 포트이므로 변경함
- hbase 시작
- jps로 HMaster, HRegionServer 실행 중인지 확인
- `~/hadoop $ ./bin/hadoop fs -ls /hbase` 로 실제로 hbase dir이 hdfs에 만들어졌는지 확인
    - 잘 만들어졌음을 확인 함
- 이 상태로 ~/hbase에서 이전에 했던 것처럼 shell을 실행하여 진행하면 됨.

# hbase에 csv 파일 불러오기

- virtual box가 너무 느리고 전원이 잘 켜지지 않아서 vmware를 다시 설치
- hadoop은 사전 학습에서 했던 그대로 설치
- hbase는 ~에서가 아니라 /usr/local/hbase 으로 옮김
- ~/.bashrc에 $HBASE_HOME=”usr/local/hbase” 등록
- hbase-site.xml에서 hdfs 사용하도록 설정
    
    ```java
    // ~/hbase/conf/hbase-site.xml의 configuration 안
    <property>
      <name>hbase.cluster.distributed</name>
      <value>true</value>
    </property>
    <property>
      <name>hbase.rootdir</name>
      <value>hdfs://localhost:9000/hbase</value>
    </property>
    ```
    
- import할 데이터 hdfs로 옮기기
    - 쓸 csv 데이터 ~/data에 넣어놓기
    
    ```java
    hdfs dfs -mkdir /data
    hdfs dfs -put ~/data/data_haccp_edit.csv /data/data_haccp.csv
    ```
    
- hbase shell에서 데이터 넣을 테이블 만들기
    
    `$HBASE_HOME/bin/hbase shell`
    
    `hbase:>> create "test", "cf_test"`
    
    `hbase:>> import org.apache.hadoop.hbase.mapreduce.ImportTsv`
    
- normal shell에서 
`$HBASE_HOME/bin/hbase org.apache.hadoop.hbase.mapreduce.ImportTsv -Dimporttsv.separator=',' -Dimporttsv.columns='HBASE_ROW_KEY,cf_test:row_name,cf_test:value' 'test' '/home/hadoop/data/test_data.csv’`
- hbase shell에서 scan해서 제대로 들어갔는지 확인
`hbase:>> scan ‘test’`


## reference

- [Apache HBase 공식 문서](https://hbase.apache.org/apache_hbase_reference_guide.pdf)
- [HADOOP_ORG.APACHE.HADOOP.HBASE.UTIL.GETJAVAPROPERTY_USER: invalid variable name 에러 해결](https://programmer.ink/think/6193d8c36c2bd.html)