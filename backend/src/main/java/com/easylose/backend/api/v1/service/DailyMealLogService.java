package com.easylose.backend.api.v1.service;

import com.easylose.backend.api.v1.dto.DailyMealLogDto;
import com.easylose.backend.api.v1.dto.DailyMealLogDto.DailyMealResponseDto;
import java.time.LocalDate;
import java.util.List;

public interface DailyMealLogService {
  List<DailyMealResponseDto> getDailyMealAll(Long id, LocalDate date);

  //  List<DailyMealResponseDto> getDailyMealCalender(Long id, LocalDate date);

  DailyMealLogDto.DailyMealResponseDto createDailyMeal(
      Long id, DailyMealLogDto.DailyMealRequestDto requestDto);

  DailyMealLogDto.DailyMealResponseDto updateDailyMeal(
      Long id, Long dailyMeal_id, DailyMealLogDto.DailyMealRequestDto requestDto);

  void deleteDailyMeal(Long id, Long dailyMeal_id);
}
