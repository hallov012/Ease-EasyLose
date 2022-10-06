import org.apache.hadoop.conf.Configuration;

import org.apache.hadoop.hbase.HBaseConfiguration;
import org.apache.hadoop.hbase.client.Get;
import org.apache.hadoop.hbase.client.HTable;
import org.apache.hadoop.hbase.client.Result;
import org.apache.hadoop.hbase.util.Bytes;

public class GetRecommend {
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
