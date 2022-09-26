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
    private Float height;
    private Float weight;
  }

  //  @AllArgsConstructor
  //  @Builder
  //  @Getter
  //  @Setter
  //  @ToString
  //  public static class NutrientLogResponseDto {
  //    private Long id;
  //    private LocalDateTime createdAt;
  //    private Float dailyCalorie;
  //    private Float dailyCarb;
  //    private Float dailyProtein;
  //    private Float dailyFat;
  //  }

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
    private Boolean isNutrient;
    private User user;
  }

  //  @AllArgsConstructor
  //  @NoArgsConstructor
  //  @Builder
  //  @Getter
  //  @Setter
  //  @ToString
  //  public static class NutrientLogFormDto {
  //    private Float dailyCalorie;
  //    private Float dailyCarb;
  //    private Float dailyProtein;
  //    private Float dailyFat;
  //    private Boolean isNutrient;
  //    private User user;
  //  }
}
