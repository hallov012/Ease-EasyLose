## HBase & Spring 연결

- Spring에서 HBase 연결 API를 사용

### 코드 1

```java
package org.springframework.hbase;

import org.apache.hadoop.hbase.client.HTable;
import org.apache.hadoop.hbase.client.HTablePool;

@Configuration public class HBaseConfig {
	@Value("#{config['hbase.zookeeper.quorum']}")

		 private String hbaseZooKeeperQuorum = null;
			@Bean public Configuration defaultHBaseConfig() throws IOException{
				Configuration conf = null;
				try{
					conf = HBaseConfiguration.create();
					conf.set("hbase.zookeeper.quorum", hbaseZooKeeperQuorum);
				}catch(Exception ex){

				}

				return conf;
			}

		@Bean public HTablePool defaultHTablePool() throws IOException {
			HTablePool tablePool = new HTablePool(defaultHBaseConfig(), 30);
			return tablePool;
		}

} //사용하실 때는 HTablePool을 autowired 하시면 됩니다.

@Repository public class HBaseDAO{
	@Autowired private HTablePool htablePool;
	public void test(String tableName, String rowKey) throws Exception{
		//Pool에서 테이블 객체를 얻어옴
		HTable hTable = (HTable) htablePool.getTable(tableName);
		//테이블에서 특정 Row를 얻어오기 위한 Get객체 생성
		Get get = new Get(Bytes.toBytes(rowKey));
		//테이블에서 결과를 가져옴.
		Result r = htable.get(get);
		System.out.println(r); }
		}

```

### 코드 2

- spring boot에서 pom.xml을 통해 필요 dependency를 설치해준다.

```java
package hbase;

import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.hbase.HBaseConfiguration;
import org.apache.hadoop.hbase.client.Connection;
import org.apache.hadoop.hbase.client.ConnectionFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.io.IOException;

@SpringBootApplication
public class Application {
	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}

	@Bean
	public Connection connect() throws IOException {
		Configuration conf = HBaseConfiguration.create();
		conf.set("hbase.zookeeper.property.clientPort", "2181");
		conf.set("hbase.zookeeper.quorum", "127.0.0.1");
		conf.set("zookeeper.znode.parent", "/hbase-unsecure");
		Connection conn = ConnectionFactory.createConnection(conf);
		return conn;
	}
}
```

### 코드 3

```java
import java.io.IOException;

import org.apache.hadoop.conf.Configuration;

import org.apache.hadoop.hbase.HBaseConfiguration;
import org.apache.hadoop.hbase.client.Get;
import org.apache.hadoop.hbase.client.HTable;
import org.apache.hadoop.hbase.client.Result;
import org.apache.hadoop.hbase.util.Bytes;

public class RetriveData{

   public static void main(String[] args) throws IOException, Exception{

      // Instantiating Configuration class
      Configuration config = HBaseConfiguration.create();

      // Instantiating HTable class
      HTable table = new HTable(config, "food_recommend");

      // Instantiating Get class
      Get g = new Get(Bytes.toBytes("0.0,0.0,115.0"));

      // Reading the data
      Result result = table.get(g);

      // Reading values from Result class object
      byte [] value = result.getValue(Bytes.toBytes("foods_num"),Bytes.toBytes("food_index"));

      // Printing the values
      String food_num = Bytes.toString(value);

      System.out.println("food: " + food_num);
   }
}
```

## 고민

- Spring Boot를 잘 모르기 때문에, Spring Boot를 통해 여러 시도를 해보았지만, 어떻게 진행해야할지 감이 안잡힘
- 결과가 따로 나오지 않으니깐 코드 1,2,3을 합쳐서 작성해야 우리가 얻고자하는 결과를 얻을 수 있을지 막힌 상황

## 참고사이트

- https://www.baeldung.com/hbase
- https://astrod.github.io/HBase%20%EB%A1%9C%EC%BB%AC%20%EC%84%A4%EC%B9%98%EC%99%80%20%EC%97%B0%EB%8F%99/

### hbase - spring 관련 github

- https://github.com/jeonguk/SpringBootHbase
- https://github.com/astrod/hbase-in-action
