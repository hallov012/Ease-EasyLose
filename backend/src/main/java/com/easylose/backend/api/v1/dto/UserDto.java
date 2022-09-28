package com.easylose.backend.api.v1.dto;

import com.easylose.backend.api.v1.enums.ActivityLevel;
import com.easylose.backend.api.v1.enums.Gender;
import com.easylose.backend.api.v1.enums.Goal;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

public class UserDto {
  @AllArgsConstructor
  @Builder
  @Getter
  @Setter
  @ToString
  public static class UserResponseDto {
    private Long id;
    private String name;
    private Gender gender;
    private Integer age;
    private Float height;
    private Float weight;
    private ActivityLevel activityLevel;
    private Goal goal;
    private Integer dailyCalorie;
    private Integer dailyCarb;
    private Integer dailyProtein;
    private Integer dailyFat;
    private String profileImg;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
  }

  @AllArgsConstructor
  @Builder
  @Getter
  @Setter
  @ToString
  public static class UserRequestDto {
    private Gender gender;
    private Integer age;
    private Float height;
    private Float weight;
    private ActivityLevel activityLevel;
    private Goal goal;
    private Integer dailyCalorie;
    private Integer dailyCarb;
    private Integer dailyProtein;
    private Integer dailyFat;
    private Boolean isAutomatic;
  }

  @AllArgsConstructor
  @Builder
  @Getter
  @Setter
  @ToString
  public static class AutoDto {
    private Gender gender;
    private Integer age;
    private Float height;
    private Float weight;
    private ActivityLevel activityLevel;
    private Goal goal;
  }

  @AllArgsConstructor
  @Builder
  @Getter
  @Setter
  @ToString
  public static class ResultDto {
    private Integer dailyCalorie;
    private Integer dailyCarb;
    private Integer dailyProtein;
    private Integer dailyFat;
  }
}
