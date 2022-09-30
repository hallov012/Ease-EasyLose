package com.easylose.backend.api.v1.dto;

import com.easylose.backend.api.v1.dto.FoodDto.FoodResponseDto;
import com.easylose.backend.api.v1.enums.MealType;
import com.fasterxml.jackson.annotation.JsonIgnore;
import java.util.List;
import java.util.Map;
import lombok.*;

public class FoodSetDto {
  @AllArgsConstructor
  @Builder
  @Getter
  @Setter
  @ToString
  public static class FoodSetResponseDto {
    private Long id;
    private String name;
    private Map<MealType, List<FoodSetDetailResponseDto>> details;
  }

  @AllArgsConstructor
  @Builder
  @Getter
  @Setter
  @ToString
  public static class FoodSetRequestDto {
    private String name;
    @JsonIgnore private Object _placeholder;
  }

  @AllArgsConstructor
  @Builder
  @Getter
  @Setter
  @ToString
  public static class FoodSetDetailResponseDto {
    private Long id;
    private Float count;
    private FoodResponseDto food;
  }

  @AllArgsConstructor
  @Builder
  @Getter
  @Setter
  @ToString
  public static class FoodSetDetailRequestDto {
    private MealType mealType;
    private Long foodId;
    private Float count;
  }
}
