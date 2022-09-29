package com.easylose.backend.api.v1.dto;

import com.easylose.backend.api.v1.domain.User;
import java.time.LocalDate;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
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
  public static class MeasureLogRequestDto {
    private LocalDate startDate;
    private LocalDate endDate;
  }

  @AllArgsConstructor
  @NoArgsConstructor
  @Builder
  @Getter
  @Setter
  @ToString
  public static class MeasureLogFormDto {
    private Float height;
    private Float weight;
    private User user;
  }
}
