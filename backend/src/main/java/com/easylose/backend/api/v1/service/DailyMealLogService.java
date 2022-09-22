package com.easylose.backend.api.v1.service;

import com.easylose.backend.api.v1.dto.DailyMealLogDto;
import java.util.Collection;

public interface DailyMealLogService {
  Collection getDailyMealAll(Long id, DailyMealLogDto.GetRequestDto getRequestDto);

  DailyMealLogDto.ResponseDto createDailyMeal(Long id, DailyMealLogDto.RequestDto requestDto);

  DailyMealLogDto.ResponseDto updateDailyMeal(
      Long id, Long dailyMeal_id, DailyMealLogDto.RequestDto requestDto);

  void deleteDailyMeal(Long id, Long dailyMeal_id);
}
