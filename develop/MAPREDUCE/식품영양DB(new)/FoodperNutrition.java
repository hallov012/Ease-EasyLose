/*
 * test not done
 */
package Ease;

import java.io.IOException;
import java.util.StringTokenizer;
import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.Path;
import org.apache.hadoop.fs.FileSystem;
import org.apache.hadoop.io.LongWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.Job;
import org.apache.hadoop.mapreduce.Mapper;
import org.apache.hadoop.mapreduce.Reducer;
import org.apache.hadoop.mapreduce.lib.input.FileSplit;
import org.apache.hadoop.mapreduce.lib.input.FileInputFormat;
import org.apache.hadoop.mapreduce.lib.output.FileOutputFormat;
import org.apache.hadoop.util.GenericOptionsParser;

public class FoodperNutrition {
  public static class TokenizerMapper extends Mapper<Object, Text, Text, Text> {
    // variable declarations
    private Text keypair = new Text();
    private String filename;
    private int carbon_max, carbon_unit, protein_max, protein_unit, fat_max, fat_unit;
    
    protected void setup(Context context) throws IOException, InterruptedException {
      filename = ((FileSplit) context.getInputSplit()).getPath().getName();
      Configuration config = context.getConfiguration();
      carbon_max = config.getInt("carbon_max", 1000);
      protein_max = config.getInt("protein_max", 200);
      fat_max = config.getInt("fat_max", 200);
      carbon_unit = config.getInt("carbon_unit", 50);
      protein_unit = config.getInt("protein_unit", 5);
      fat_unit = config.getInt("fat_unit", 5);
    }
    
    // map function (Context -> fixed parameter)
    public void map(Object key, Text value, Context context)
        throws IOException, InterruptedException {
      String[] tokens = new StringTokenizer(value.toString(), ",", true);
      String num = tokens[0];
      String carbon = tokens[1];
      String protein = tokens[2];
      String fat = tokens[3];
      
      double carbon_d = Double.parseDouble(carbon);
      double protein_d = Double.parseDouble(protein);
      double fat_d = Double.parseDouble(fat);
      for (int i = 0; i < carbon_max; i += carbon_unit) {
        if (carbon_d >= i && carbon_d < i + carbon_unit) {
          carbon_d = (double) i;
          break;
        }
      }
      for (int i = 0; i < protein_max; i += protein_unit) {
        if (protein_d >= i && protein_d < i + protein_unit) {
          protein_d = (double) i;
          break;
        }
      }
      for (int i = 0; i < fat_max; i += fat_unit) {
        if (fat_d >= i && fat_d < i + fat_unit) {
          fat_d = (double) i;
          break;
        }
      }
      
      carbon = Double.toString(carbon_d);
      protein = Double.toString(protein_d);
      fat = Double.toString(fat_d);
      keypair.set(carbon + ","+protein+","+fat);
      context.write(keypair, num);
    }
  }
  
  public static class ConcatenatorReducer extends Reducer<Text, Text, Text, Text> {
    private Text list = new Text();
    
    public void reduce(Text key, Iterable<Text> values, Context context)
        throws IOException, InterruptedException {
      String s = new String();
      int comma = 0;
      for (Text val : values) {
        if (comma == 0) {
          comma = 1;
          s += (":" + val.toString());
        } else {
          s += (",    " + val.toString());
        }
        list.set(s);
        context.write(key, list);
      }
    }
  }
  
  /* Main function */
  public static void main(String[] args) throws Exception {
    Configuration conf = new Configuration();
    String[] otherArgs = new GenericOptionsParser(conf, args).getRemainingArgs();
    if (otherArgs.length != 2) {
      System.err.println("Usage: <in> <out>");
      System.exit(2);
    }
    FileSystem hdfs = FileSystem.get(conf);
    Path output = new Path(otherArgs[1]);
    if (hdfs.exists(output))
      hdfs.delete(output, true);
    
    Job job = new Job(conf, "food per nutrition");
    job.setJarByClass(FoodperNutrition.class);
    
    // let hadoop know my map and reduce classes
    job.setMapperClass(TokenizerMapper.class);
    job.setReducerClass(ConcatenatorReducer.class);
    
    job.setOutputKeyClass(Text.class); // reduce의 output 지정, map과 동일할 땐 map 꺼는 생략 가능
    job.setOutputValueClass(Text.class);
    
    // set number of reduces
    job.setNumReduceTasks(2);
    
    
    Configuration config = job.getConfiguration();
    config.setInt("carbon_max", 1000);
    config.setInt("protein_max", 200);
    config.setInt("fat_max", 200);
    config.setInt("carbon_unit", 50);
    config.setInt("protein_unit", 5);
    config.setInt("fat_unit", 5);
    
    
    
    // set input and output directories
    FileInputFormat.addInputPath(job, new Path(otherArgs[0])); // 입력 데이터 path
    FileOutputFormat.setOutputPath(job, new Path(otherArgs[1])); // 출력 데이터 path
    FileSystem.get(job.getConfiguration()).delete(new Path(otherArgs[1]), true);
    System.exit(job.waitForCompletion(true) ? 0 : 1); // 실행
  }
  
}
