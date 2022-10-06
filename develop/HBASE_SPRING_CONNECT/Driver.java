package ease;

import org.apache.hadoop.util.ProgramDriver;

public class Driver {
	public static void main(String[] args) {
		int exitCode = -1;
		ProgramDriver pgd = new ProgramDriver();
		try {
			pgd.addClass("foodpernutrition", FoodperNutritionHBase.class, "A inverted mat that map nutri to food");
			pgd.addClass("getrecommend", GetRecommend.class, "Get recommend from HBase");
			pgd.driver(args);
			exitCode = 0;
		} catch (Throwable e) {
			e.printStackTrace();
		}

		System.exit(exitCode);
	}
}
