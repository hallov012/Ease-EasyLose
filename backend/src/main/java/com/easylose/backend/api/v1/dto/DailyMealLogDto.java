package com.easylose.backend.api.v1.dto;

import com.easylose.backend.api.v1.domain.Food;
import com.easylose.backend.api.v1.domain.User;
import com.easylose.backend.api.v1.enums.MealType;
import com.fasterxml.jackson.annotation.JsonIgnore;
import java.time.LocalDate;
import lombok.*;
import org.springframework.web.bind.annotation.ResponseBody;

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
    private Long userId;
    private Long foodId;
    @JsonIgnore private User user;
    @JsonIgnore private Food food;
  }

  @AllArgsConstructor
  @Builder
  @Getter
  @Setter
  @ToString
  @ResponseBody
  public static class DailyMealResponseDto {
    private Long id;
    private LocalDate date;
    private MealType mealType;
    private Float count;
    //    private User user;
    //    private Food food;
  }
}
