package com.easylose.backend.api.v1.dto;

import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

public class WeightLogDto {
  @AllArgsConstructor
  @Builder
  @Getter
  @Setter
  @ToString
  public static class WeightResponseDto {
    private Long id;
    private LocalDateTime createdAt;
    private Float weight;
  }
}
