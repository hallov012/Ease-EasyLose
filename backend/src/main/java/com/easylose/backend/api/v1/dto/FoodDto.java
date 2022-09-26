package com.easylose.backend.api.v1.dto;

import com.easylose.backend.api.v1.domain.User;
import javax.persistence.*;
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

    private User user;

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
    private Float trasnFat;
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
}
