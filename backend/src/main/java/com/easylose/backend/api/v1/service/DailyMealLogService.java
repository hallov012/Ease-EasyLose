package com.easylose.backend.api.v1.service;

import com.easylose.backend.api.v1.dto.DailyMealLogDto;
import java.util.Collection;

public interface DailyMealLogService {
  Collection getDailyMealAll(Long id, DailyMealLogDto.DailyMealGetRequestDto getRequestDto);

  DailyMealLogDto.DailyMealResponseDto createDailyMeal(
      Long id, DailyMealLogDto.DailyMealRequestDto requestDto);

  DailyMealLogDto.DailyMealResponseDto updateDailyMeal(
      Long id, Long dailyMeal_id, DailyMealLogDto.DailyMealRequestDto requestDto);

  void deleteDailyMeal(Long id, Long dailyMeal_id);
}
