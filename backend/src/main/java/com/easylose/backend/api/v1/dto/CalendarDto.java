package com.easylose.backend.api.v1.dto;

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
  }
}
