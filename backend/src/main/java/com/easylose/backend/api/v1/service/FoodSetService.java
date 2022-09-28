package com.easylose.backend.api.v1.service;

import com.easylose.backend.api.v1.dto.FoodSetDto.FoodSetDetailRequestDto;
import com.easylose.backend.api.v1.dto.FoodSetDto.FoodSetDetailResponseDto;
import com.easylose.backend.api.v1.dto.FoodSetDto.FoodSetResponseDto;
import java.util.List;

public interface FoodSetService {

  List<FoodSetResponseDto> getFoodSetAll(Long id);

  FoodSetResponseDto createFoodSet(Long id);

  boolean deleteFoodSet(Long id, Long foodSetId);

  FoodSetDetailResponseDto createFoodSetDetail(
      Long id, Long foodSetId, FoodSetDetailRequestDto body);

  FoodSetDetailResponseDto updateFoodSetDetail(
      Long id, Long foodSetId, Long foodSetDetailId, FoodSetDetailRequestDto body);

  boolean deleteFoodSetDetail(Long id, Long foodSetId, Long foodSetDetailId);
}
