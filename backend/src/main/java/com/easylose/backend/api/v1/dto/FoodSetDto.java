package com.easylose.backend.api.v1.dto;

import com.easylose.backend.api.v1.domain.User;
import com.easylose.backend.api.v1.enums.MealType;
import javax.persistence.*;
import lombok.*;

public class FoodSetDto {

  private Long id;
  private MealType mealType;
  private User user;

  @AllArgsConstructor
  @Builder
  @Getter
  @Setter
  @ToString
  public static class ResponseDto {
    private Long id;
    private MealType mealType;
    private User user;
  }

  @AllArgsConstructor
  @Builder
  @Getter
  @Setter
  @ToString
  public static class RequestDto {
    private MealType mealType;
  }
}
