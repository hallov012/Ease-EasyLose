package com.easylose.backend.api.v1.service;

import com.easylose.backend.api.v1.dto.FoodDto.FoodResponseDto;
import com.easylose.backend.api.v1.dto.FoodDto.FoodUserDto;
import java.util.Collection;

public interface FoodService {
  Collection getFood(Long id, String name, String barcode);

  FoodResponseDto createFood(Long id, FoodUserDto dto);

  FoodResponseDto updateFood(Long id, Long food_id, FoodUserDto dto);

  void deleteFood(Long id, Long ood_id);
}
