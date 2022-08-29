package ssafy;

import java.io.IOException;
import java.util.StringTokenizer;

import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.Path;
import org.apache.hadoop.io.IntWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.Job;
import org.apache.hadoop.mapreduce.Mapper;
import org.apache.hadoop.mapreduce.Reducer;
import org.apache.hadoop.mapreduce.lib.input.FileInputFormat;
import org.apache.hadoop.mapreduce.lib.output.FileOutputFormat;
import org.apache.hadoop.util.GenericOptionsParser;

public class Wordcount1char {
    /*
     * Object, Text : input key-value pair type (always same (to get a line of input
     * file))
     * Text, IntWritable : output key-value pair type
     */
    // static을 쓰면 class 안에서 class를 만들지 않고 새로운 클래스 사용 가능
    // 한 record 마다 실행됨
    public static class TokenizerMapper
            // 타입 정의 : 입력 key, value, 출력 key, value
            // Object는 최상위 type으로 모든 거 포함
            extends Mapper<Object, Text, Text, IntWritable> {

        // variable declairations
        // final: 이 값을 바꾸지 말것(const와 비슷)
        private final static IntWritable one = new IntWritable(1);
        private Text word = new Text();

        // map function (Context -> fixed parameter)
        public void map(Object key, Text value, Context context)
                throws IOException, InterruptedException { // hadoop 쓸 때 필요한 형식

            // value.toString() : get a line
            StringTokenizer itr = new StringTokenizer(value.toString()); // str을 단어 단위로 자름
            while (itr.hasMoreTokens()) {
                word.set(itr.nextToken().substring(0, 1)); // 출력 key 세팅

                // emit a key-value pair
                context.write(word, one); // 출력 value 세팅
            }
        }
    }

    /*
     * Text, IntWritable : input key type and the value type of input value list
     * Text, IntWritable : output key-value pair type
     */
    // machine 마다 실행
    public static class IntSumReducer
            extends Reducer<Text, IntWritable, Text, IntWritable> {

        // variables
        private IntWritable result = new IntWritable();

        // 세팅을 위해 가장 먼저 실행되는 setup 함수
        /*
         * protected void setup(Context context) thros IOException, InterruptedException
         * {
         * Configuration config = context.getConfiguration();
         * name = config.get("name", "kim"); // kim은 default
         * point = config.getInt("one", 1);
         * }
         */

        // key : a disticnt word
        // values : Iterable type (data list)
        // IntSumReducer의 type이 그대로
        public void reduce(Text key, Iterable<IntWritable> values, Context context)
                throws IOException, InterruptedException {

            int sum = 0;
            for (IntWritable val : values) {
                sum += val.get(); // val은 int므로 sum 가능
            }
            result.set(sum);
            context.write(key, result);
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
        Job job = new Job(conf, "word count");
        job.setJarByClass(Wordcount1char.class);

        // let hadoop know my map and reduce classes
        job.setMapperClass(TokenizerMapper.class);
        // job.setCombinerClass(IntSumReducer.class); // combiner 사용할 때
        job.setReducerClass(IntSumReducer.class);

        job.setOutputKeyClass(Text.class); // reduce의 output 지정, map과 동일할 땐 map 꺼는 생략 가능
        job.setOutputValueClass(IntWritable.class);

        // job.setMapOutputKeyClass(Text.class);
        // job.setMapOutputValueClass(IntWritable.class);

        // set number of reduces
        job.setNumReduceTasks(2);

        // main 함수에서 mapper, reducer에 값 broadcast 가능
        /*
         * Configuration config = job.getConfiguration();
         * config.set("name", "Shim");
         * config.setInt("one", 1);
         * config.setFloat("point_file", (float)0.5);
         */

        // set input and output directories
        FileInputFormat.addInputPath(job, new Path(otherArgs[0])); // 입력 데이터 path
        FileOutputFormat.setOutputPath(job, new Path(otherArgs[1])); // 출력 데이터 path
        System.exit(job.waitForCompletion(true) ? 0 : 1); // 실행
    }
}