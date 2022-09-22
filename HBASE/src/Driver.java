package ease;

import org.apache.hadoop.util.ProgramDriver;

public class Driver {
	public static void main(String[] args) {
		int exitCode = -1;
		ProgramDriver pgd = new ProgramDriver();
		try {
			/*/
			pgd.addClass("wordcount", Wordcount.class, "A map/reduce program that performs word counting.");
			pgd.addClass("wordcount1char", Wordcount1char.class, "A map/reduce program that performs word counting.");
			pgd.addClass("wordcountsort", Wordcountsort.class, "A map/reduce program that output freq of the words");
			pgd.addClass("invertedindex", InvertedIndex.class, "A inverted index matches word:position");
			pgd.addClass("matrixadd", MatrixAdd.class, "A matrix add program");
			pgd.addClass("matmulti", MatrixMulti.class, "A 1 phase matrix multi prepare");
			pgd.addClass("itemcount", CommonItemCount.class, "Common item count using inverted index");
			pgd.addClass("topksearch", TopKSearch.class, "A map/reduce program that finds top k search");
			*/
			pgd.addClass("foodpernutrition", FoodperNutritionHBase.class, "A inverted mat that map nutri to food");
			pgd.driver(args);
			exitCode = 0;
		} catch (Throwable e) {
			e.printStackTrace();
		}

		System.exit(exitCode);
	}
}
