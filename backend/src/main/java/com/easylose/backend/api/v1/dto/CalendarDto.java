package com.easylose.backend.api.v1.dto;

import com.easylose.backend.api.v1.dto.RecommendDto.RecommendResponseDto;
import java.util.List;
import lombok.*;

public class CalendarDto {

  @AllArgsConstructor
  @Builder
  @Getter
  @Setter
  @ToString
  public static class CalendarResponseDto {
    private float score;

    private float totalCalorie;
    private float totalCarb;
    private float totalProtein;
    private float totalFat;

    private float dailyCalorie;
    private float dailyCarb;
    private float dailyProtein;
    private float dailyFat;

    private List<RecommendResponseDto> recommends;
  }
}
