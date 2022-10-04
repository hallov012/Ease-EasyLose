package com.easylose.backend.util;

import com.easylose.backend.api.v1.dto.UserDto.AutoDto;
import com.easylose.backend.api.v1.dto.UserDto.ResultDto;
import com.easylose.backend.api.v1.enums.ActivityLevel;
import com.easylose.backend.api.v1.enums.Gender;
import com.easylose.backend.api.v1.enums.Goal;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Setter
@Getter
@Slf4j
public class BMI {

  private double basic;
  private Float height;
  private Float weight;

  private Float bmi;

  private Gender gender;
  private Integer age;

  private Goal goal;
  private ActivityLevel activityLevel;
  private Float calPerKg;

  private double calory;
  private double carb;
  private double protein;
  private double fat;

  public ResultDto calculation(AutoDto dto) {
    this.height = dto.getHeight();
    this.weight = dto.getWeight();
    this.goal = dto.getGoal();
    this.gender = dto.getGender();
    this.activityLevel = dto.getActivityLevel();
    this.bmi = (10000 * weight) / (height * height);
    this.age = dto.getAge();

    log.info("age : {}", age);
    if (gender.toString() == "MALE") {
      this.basic = 66 + (13.7 * weight) + (5 * height) - (6.8 * age);
    } else {
      this.basic = 655 + (9.6 * weight) + (1.8 * height) - (4.7 * age);
    }
    log.info("your Basic Calory = {}", basic);
    if (activityLevel.toString() == "LOWEST") {
      basic *= 1.2;
    } else if (activityLevel.toString() == "LOW") {
      basic *= 1.375;
    } else if (activityLevel.toString() == "HIGH") {
      basic *= 1.55;
    } else {
      basic *= 1.725;
    }

    if (goal.toString() == "DIET") {
      this.calory = 0.85 * basic;
      this.carb = 0.3;
      this.protein = 0.4;
      this.fat = 0.3;
    } else if (goal.toString() == "BULK") {
      this.calory = 1.15 * basic;
      this.carb = 0.4;
      this.protein = 0.4;
      this.fat = 0.2;
    } else {
      this.calory = basic;
      this.carb = 0.5;
      this.protein = 0.3;
      this.fat = 0.2;
    }
    carb *= (calory / 4);
    protein *= (calory / 4);
    fat *= (calory / 9);

    return ResultDto.builder()
        .dailyCalorie((int) calory)
        .dailyProtein((int) protein)
        .dailyCarb((int) carb)
        .dailyFat((int) fat)
        .build();
  }
}
