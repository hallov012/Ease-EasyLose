package com.easylose.backend.api.v1.mapper;

import com.easylose.backend.api.v1.domain.DailyMealLog;
import com.easylose.backend.api.v1.dto.DailyMealLogDto;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface DailyMealLogMapper {

  //    void createDailyMealLogFromRequestDto(DailyMealLogDto.RequestDto dto, @MappingTarget
  // DailyMealLog dailyMealLog);

  @BeanMapping(
      nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE,
      nullValueCheckStrategy = NullValueCheckStrategy.ALWAYS)
  void updateDailyMealLogFromRequestDto(
      DailyMealLogDto.RequestDto dto, @MappingTarget DailyMealLog dailyMealLog);

  DailyMealLogDto.ResponseDto dailyMealLogToResponseDto(DailyMealLog dailyMealLog);
}
