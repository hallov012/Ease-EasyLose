package com.easylose.backend.api.v1.dto;

import com.easylose.backend.api.v1.domain.User;

import lombok.*;

import javax.persistence.*;


public class FoodDto {
  @AllArgsConstructor
  @Builder
  @Getter
  @Setter
  @ToString
  public static class ResponseDto{
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
  public static class RequestDto{
    private String name;
    private String barcode;
  }
}
