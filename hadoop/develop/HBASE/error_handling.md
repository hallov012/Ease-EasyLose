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

- Master is initializing
    - `$HBASE_HOME/bin/hbase zkcli`
        >> `deleteall /hbase`
    - hbase, zookeeper stop
    - safemode 해제
    - `hdfs dfs -rm -r /hbase`
    - zookeeper 파일이 저장된 장소(`/data`)의 myid 제외 모두 삭제
    - 다시 hbase, zookeeper 시작