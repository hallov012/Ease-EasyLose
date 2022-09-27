package com.easylose.backend.api.v1.dto;

import com.easylose.backend.api.v1.domain.Food;
import com.easylose.backend.api.v1.domain.User;
import com.easylose.backend.api.v1.dto.FoodDto.FoodResponseDto;
import com.easylose.backend.api.v1.enums.MealType;
import com.fasterxml.jackson.annotation.JsonIgnore;
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
    @JsonIgnore private User user;
    @JsonIgnore private Food food;
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
}
