package com.easylose.backend.api.v1.service;

import com.easylose.backend.api.v1.dto.FoodDto.FoodResponseDto;
import com.easylose.backend.api.v1.dto.FoodDto.FoodUserDto;
import java.util.Collection;

public interface FoodService {
  Collection getFoodByName(Long id, String name);

  String getFoodByBarcode(Long id, String barcode);

  Collection getRecentFood(Long id);

  FoodResponseDto createFood(Long id, FoodUserDto dto);

  FoodResponseDto updateFood(Long id, Long food_id, FoodUserDto dto);

  void deleteFood(Long id, Long ood_id);
}
