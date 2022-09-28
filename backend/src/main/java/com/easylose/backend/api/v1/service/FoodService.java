package com.easylose.backend.api.v1.service;

import com.easylose.backend.api.v1.dto.FoodDto.FoodResponseDto;
import com.easylose.backend.api.v1.dto.FoodDto.FoodUserDto;
import java.util.List;

public interface FoodService {
  List<FoodResponseDto> getFoodByName(Long id, String name);

  String getFoodByBarcode(Long id, String barcode);

  List<FoodResponseDto> getRecentFood(Long id);

  FoodResponseDto createFood(Long id, FoodUserDto dto);

  FoodResponseDto updateFood(Long id, Long food_id, FoodUserDto dto);

  boolean deleteFood(Long id, Long ood_id);
}
