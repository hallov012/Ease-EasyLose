package com.easylose.backend.api.v1.service;

import com.easylose.backend.api.v1.dto.DailyMealLogDto;
import com.easylose.backend.api.v1.dto.DailyMealLogDto.DailyMealResultDto;
import java.time.LocalDate;
import java.util.List;

public interface DailyMealLogService {
  List<DailyMealResultDto> getDailyMealAll(Long id, LocalDate date);

  //  List<DailyMealResponseDto> getDailyMealCalender(Long id, LocalDate date);

  DailyMealLogDto.DailyMealResponseDto createDailyMeal(
      Long id, DailyMealLogDto.DailyMealRequestDto requestDto);

  DailyMealLogDto.DailyMealResponseDto updateDailyMeal(
      Long id, Long dailyMeal_id, DailyMealLogDto.DailyMealRequestDto requestDto);

  void deleteDailyMeal(Long id, Long dailyMeal_id);
}
