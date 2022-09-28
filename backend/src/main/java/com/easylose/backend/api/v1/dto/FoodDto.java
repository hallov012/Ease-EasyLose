package com.easylose.backend.api.v1.dto;

import com.easylose.backend.api.v1.domain.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

public class FoodDto {
  @AllArgsConstructor
  @Builder
  @Getter
  @Setter
  @ToString
  public static class FoodResponseDto {
    private Long id;
    private String foodType;
    private String name;
    private String productId;
    private Float totalAmount;
    private String barcode;
    private Float calorie;
    private Float carb;
    private Float protein;
    private Float fat;
    private Float sugar;
    private Float salt;
    private Float cholesterol;
    private Float saturatedFat;
    private Float transFat;
  }

  @AllArgsConstructor
  @Builder
  @Getter
  @Setter
  @ToString
  public static class FoodRequestDto {
    private String name;
    private String barcode;
  }

  @AllArgsConstructor
  @Builder
  @Getter
  @Setter
  @ToString
  public static class FoodUserDto {
    private String foodType;
    private String name;

    @JsonIgnore private User user;
    private Float totalAmount;
    private Float calorie;
    private Float carb;
    private Float protein;
    private Float fat;
    private Float sugar;
    private Float salt;
    private Float cholesterol;
    private Float saturatedFat;
    private Float transFat;
  }

  @AllArgsConstructor
  @Builder
  @Getter
  @Setter
  @ToString
  public static class FoodBarCodeDto {
    private String barcode;
  }
}
