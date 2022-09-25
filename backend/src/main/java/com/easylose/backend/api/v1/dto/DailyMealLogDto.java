package com.easylose.backend.api.v1.dto;

import com.easylose.backend.api.v1.enums.MealType;
import java.time.LocalDate;
import javax.persistence.*;
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
    private Long userId;
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
    private Long userId;
    private Long foodId;
  }
}
