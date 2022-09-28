package com.easylose.backend.api.v1.service;

import com.easylose.backend.api.v1.dto.FoodSetDto.FoodSetDetailRequestDto;
import com.easylose.backend.api.v1.dto.FoodSetDto.FoodSetDetailResponseDto;
import com.easylose.backend.api.v1.dto.FoodSetDto.FoodSetRequestDto;
import com.easylose.backend.api.v1.dto.FoodSetDto.FoodSetResponseDto;
import java.util.List;

public interface FoodSetService {

  List<FoodSetResponseDto> getFoodSetAll(Long id);

  FoodSetResponseDto createFoodSet(Long id, FoodSetRequestDto body);

  boolean deleteFoodSet(Long id, Long foodSetId);

  FoodSetResponseDto updateFoodSet(Long id, Long foodSetDetailId, FoodSetRequestDto body);

  FoodSetDetailResponseDto createFoodSetDetail(
      Long id, Long foodSetId, FoodSetDetailRequestDto body);

  FoodSetDetailResponseDto updateFoodSetDetail(
      Long id, Long foodSetId, Long foodSetDetailId, FoodSetDetailRequestDto body);

  boolean deleteFoodSetDetail(Long id, Long foodSetId, Long foodSetDetailId);
}
