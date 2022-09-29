package com.easylose.backend.api.v1.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

public class MeasureLogDto {

  @AllArgsConstructor
  @Builder
  @Getter
  @Setter
  @ToString
  public static class MeasureLogResponseDto {
    private Long id;
    private LocalDateTime createdAt;
    private Integer dailyCalorie;
    private Integer dailyCarb;
    private Integer dailyProtein;
    private Integer dailyFat;
  }

  @AllArgsConstructor
  @Builder
  @Getter
  @Setter
  @ToString
  public static class AnalysisResponseDto {
    private LocalDate date;

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
