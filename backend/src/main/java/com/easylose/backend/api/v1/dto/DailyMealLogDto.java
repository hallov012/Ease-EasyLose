package com.easylose.backend.api.v1.dto;

import com.easylose.backend.api.v1.domain.DailyMealLog;
import com.easylose.backend.api.v1.domain.Food;
import com.easylose.backend.api.v1.domain.User;
import com.easylose.backend.api.v1.enums.MealType;
import javax.persistence.*;
import lombok.*;

public class DailyMealLogDto {

  @AllArgsConstructor
  @Builder
  @Getter
  @Setter
  @ToString
  public static class DailyMealGetRequestDto {
    private String year;
    private String month;
    private String date;
  }

  @AllArgsConstructor
  @Builder
  @Getter
  @Setter
  @ToString
  public static class DailyMealRequestDto {
    private String date;
    private MealType mealType;
    private Food food;
    private User user;

    public DailyMealLog toEntity() {
      return DailyMealLog.builder().mealType(mealType).food(food).user(user).date(date).build();
    }
  }

  @AllArgsConstructor
  @Builder
  @Getter
  @Setter
  @ToString
  public static class DailyMealResponseDto {
    private Long id;
    private String date;
    private MealType mealType;
    private Float count;
    private User user;
    private Food food;
  }
}
