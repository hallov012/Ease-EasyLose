package com.easylose.backend.api.v1.dto;

import com.easylose.backend.api.v1.domain.Food;
import com.easylose.backend.api.v1.domain.FoodSet;
import javax.persistence.*;
import lombok.Getter;

@Getter
public class FoodSetDetailDto {

  private Long id;
  private Float count;
  private Food food;
  private FoodSet foodSet;
}
