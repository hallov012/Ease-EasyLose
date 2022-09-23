package com.easylose.backend.api.v1.dto;

import com.easylose.backend.api.v1.domain.User;
import java.time.LocalDateTime;
import javax.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
public class MeasureLogDto {

  private Long id;
  private Float height;
  private Float weight;
  private User user;
  private LocalDateTime createdAt;

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
    private User user;
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
}
