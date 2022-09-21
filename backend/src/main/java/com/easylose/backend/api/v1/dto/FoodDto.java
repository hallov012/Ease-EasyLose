package com.easylose.backend.api.v1.dto;

import com.easylose.backend.api.v1.domain.User;
import com.easylose.backend.api.v1.enums.FoodType;
import javax.persistence.*;
import lombok.Getter;

@Getter
public class FoodDto {

  private Long id;
  private FoodType foodType;
  private String name;
  private User user;
  private String productId;
  private String barcode;
  private Float calorie;
  private Float carb;
  private Float protein;
  private Float fat;
}
