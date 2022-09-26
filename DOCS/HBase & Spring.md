## HBase & Spring 연결

- Spring에서 HBase 연결 API를 사용

```
/*
 수정 중

*/

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
