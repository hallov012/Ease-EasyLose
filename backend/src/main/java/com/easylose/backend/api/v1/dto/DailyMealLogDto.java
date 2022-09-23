package com.easylose.backend.api.v1.dto;

import com.easylose.backend.api.v1.domain.DailyMealLog;
import com.easylose.backend.api.v1.domain.Food;
import com.easylose.backend.api.v1.domain.User;
import com.easylose.backend.api.v1.enums.MealType;
import javax.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
public class DailyMealLogDto {

  @AllArgsConstructor
  @Builder
  @Getter
  public static class GetRequestDto {
    private String year;
    private String month;
    private String date;
  }

  @AllArgsConstructor
  @Builder
  @Getter
  public static class CreateAndUpdateRequestDto {
    private String date;
    private MealType mealType;
    private Food food;

    public DailyMealLog toEntity() {
      return DailyMealLog.builder().date(date).mealType(mealType).food(food).build();
    }
  }

  @AllArgsConstructor
  @Builder
  @Getter
  public static class ResponseDto {
    private Long id;
    private String date;
    private MealType mealType;
    private Float count;
    private User user;
    private Food food;

    public ResponseDto(DailyMealLog dailyMealLog) {
      this.id = dailyMealLog.getId();
      this.date = dailyMealLog.getDate();
      this.count = dailyMealLog.getCount();
      this.mealType = dailyMealLog.getMealType();
      this.user = dailyMealLog.getUser();
      this.food = dailyMealLog.getFood();
    }
  }
}
