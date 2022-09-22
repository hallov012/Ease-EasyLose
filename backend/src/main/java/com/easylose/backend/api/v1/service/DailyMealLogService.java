package com.easylose.backend.api.v1.service;

import com.easylose.backend.api.v1.dto.DailyMealLogDto;
import java.util.Collection;

public interface DailyMealLogService {
  Collection getDailyMealAll(Long id, DailyMealLogDto.GetRequestDto getRequestDto);

  DailyMealLogDto.ResponseDto createDailyMeal(
      Long id, DailyMealLogDto.CreateAndUpdateRequestDto createRequestDto);

  DailyMealLogDto.ResponseDto updateDailyMeal(
      Long id, Long dailyMeal_id, DailyMealLogDto.CreateAndUpdateRequestDto updateRequestDto);

  void deleteDailyMeal(Long id, Long dailyMeal_id);
}
