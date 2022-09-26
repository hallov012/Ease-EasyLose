package com.easylose.backend.api.v1.dto;

import com.easylose.backend.api.v1.enums.MealType;
import java.util.List;
import javax.persistence.*;
import lombok.*;

public class FoodSetDto {
  @AllArgsConstructor
  @Builder
  @Getter
  @Setter
  @ToString
  public static class FoodSetResponseDto {
    private Long id;
    private MealType mealType;
    private Long userId;
    private List<FoodSetDetailResponseDto> details;
  }

  @AllArgsConstructor
  @Builder
  @Getter
  @Setter
  @ToString
  public static class FoodSetDetailResponseDto {
    private Long id;
    private Float count;
    private Long foodSetId;
    private FoodDto.FoodResponseDto food;
  }

  @AllArgsConstructor
  @Builder
  @Getter
  @Setter
  @ToString
  public static class FoodSetRequestDto {
    private MealType mealType;
  }
}
