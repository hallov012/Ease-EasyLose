package com.easylose.backend.api.v1.dto;

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
    //    private User user;
    private Long userId;
  }

  @AllArgsConstructor
  @Builder
  @Getter
  @Setter
  @ToString
  public static class MeasureLogRequestDto {
    private String startDate;
    private String endDate;
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
    private Long userId;
    //    private User user;

  }
}
