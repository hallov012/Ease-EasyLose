package com.easylose.backend.api.v1.dto;

import com.easylose.backend.api.v1.dto.FoodDto.FoodResponseDto;
import com.easylose.backend.api.v1.enums.MealType;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import lombok.*;

public class DailyMealLogDto {

  @AllArgsConstructor
  @Builder
  @Getter
  @Setter
  @ToString
  public static class DailyMealRequestDto {

    private LocalDate date;
    private MealType mealType;
    private Float count;
    private Long foodId;
  }

  @AllArgsConstructor
  @Builder
  @Getter
  @Setter
  @ToString
  public static class DailyMealResponseDto {
    private LocalDate date;
    private MealType mealType;
    private Float count;
    private FoodResponseDto food;
  }

  @AllArgsConstructor
  @Builder
  @Getter
  @Setter
  @ToString
  public static class DailyMealResultDto {
    private LocalDate date;
    private Map<MealType, List<DailyMealFoodDto>> details;
    private Map<MealType, Map<String, Integer>> sums;
    private DailyMealSumIntDto total;
  }

  @AllArgsConstructor
  @Builder
  @Getter
  @Setter
  @ToString
  public static class DailyMealFoodDto {
    private Float count;
    private FoodResponseDto food;
  }

  @AllArgsConstructor
  @NoArgsConstructor
  @Builder
  @Getter
  @Setter
  @ToString
  public static class DailyMealSumDto {
    private Float calorie;
    private Float carb;
    private Float protein;
    private Float fat;
    private Float sugar;
    private Float salt;
    private Float cholesterol;
    private Float saturatedFat;
    private Float transFat;
  }

  @AllArgsConstructor
  @NoArgsConstructor
  @Builder
  @Getter
  @Setter
  @ToString
  public static class DailyMealSumIntDto {
    private Integer calorie;
    private Integer carb;
    private Integer protein;
    private Integer fat;
    private Integer sugar;
    private Integer salt;
    private Integer cholesterol;
    private Integer saturatedFat;
    private Integer transFat;
  }
}
