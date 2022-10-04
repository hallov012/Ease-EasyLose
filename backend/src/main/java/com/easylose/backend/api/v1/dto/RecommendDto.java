package com.easylose.backend.api.v1.dto;

import com.easylose.backend.api.v1.dto.FoodDto.FoodResponseDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

public class RecommendDto {

  @AllArgsConstructor
  @Builder
  @Getter
  @Setter
  @ToString
  public static class RecommendResponseDto {
    private String name;
    private String reason;
    private FoodResponseDto food;
  }
}
