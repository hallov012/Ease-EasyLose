package com.easylose.backend.api.v1.mapper;

import com.easylose.backend.api.v1.domain.DailyMealLog;
import com.easylose.backend.api.v1.dto.DailyMealLogDto;
import com.easylose.backend.api.v1.dto.DailyMealLogDto.DailyMealFoodDto;
import com.easylose.backend.api.v1.dto.DailyMealLogDto.DailyMealRequestDto;
import com.easylose.backend.api.v1.dto.DailyMealLogDto.DailyMealResponseDto;
import com.easylose.backend.api.v1.dto.DailyMealLogDto.DailyMealResultDto;
import com.easylose.backend.api.v1.enums.MealType;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public abstract class DailyMealLogMapper {

  @BeanMapping(
      nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE,
      nullValueCheckStrategy = NullValueCheckStrategy.ALWAYS)
  public abstract void updateDailyMealLogFromRequestDto(
      DailyMealLogDto.DailyMealRequestDto dto, @MappingTarget DailyMealLog dailyMealLog);

  public abstract DailyMealLog toEntity(final DailyMealRequestDto dto);

  public abstract DailyMealResponseDto dailyMealLogToDto(final DailyMealLog dailyMeallog);

  public abstract DailyMealFoodDto foodToDto(final DailyMealLog dailyMeallog);

  public DailyMealResultDto dailyLogResultDto(
      final List<DailyMealLog> dailyMealLogs, LocalDate date) {
    DailyMealResultDto.DailyMealResultDtoBuilder dto = DailyMealResultDto.builder();
    dto.date(date);
    Map<MealType, List<DailyMealFoodDto>> details = new HashMap<MealType, List<DailyMealFoodDto>>();

    for (MealType mealType : MealType.values()) {
      details.put(mealType, new ArrayList<DailyMealFoodDto>());
    }
    for (DailyMealLog dailyMealLog : dailyMealLogs) {
      details.get(dailyMealLog.getMealType()).add(foodToDto(dailyMealLog));
    }
    dto.details(details);
    return dto.build();
  }
}
