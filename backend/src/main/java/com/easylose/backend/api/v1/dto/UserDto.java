package com.easylose.backend.api.v1.dto;

import com.easylose.backend.api.v1.enums.ActivityLevel;
import com.easylose.backend.api.v1.enums.Gender;
import com.easylose.backend.api.v1.enums.Goal;
import java.time.LocalDateTime;
import javax.persistence.*;
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
    private String birthdate;
    private Float height;
    private Float weight;
    private ActivityLevel activityLevel;
    private Goal goal;
    private Float dailyCalorie;
    private Float dailyCarb;
    private Float dailyProtein;
    private Float dailyFat;
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
    private String birthdate;
    private Float height;
    private Float weight;
    private ActivityLevel activityLevel;
    private Goal goal;
    private Float dailyCalorie;
    private Float dailyCarb;
    private Float dailyProtein;
    private Float dailyFat;
    private Boolean isAutomatic;
  }
}
