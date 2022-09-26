package com.easylose.backend.api.v1.mapper;

import com.easylose.backend.api.v1.domain.DailyMealLog;
import com.easylose.backend.api.v1.dto.DailyMealLogDto;
import com.easylose.backend.api.v1.dto.DailyMealLogDto.DailyMealRequestDto;
import com.easylose.backend.api.v1.dto.DailyMealLogDto.DailyMealResponseDto;
import org.mapstruct.*;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface DailyMealLogMapper {

  DailyMealLogMapper INSTANCE = Mappers.getMapper(DailyMealLogMapper.class);

  @BeanMapping(
      nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE,
      nullValueCheckStrategy = NullValueCheckStrategy.ALWAYS)
  void updateDailyMealLogFromRequestDto(
      DailyMealLogDto.DailyMealRequestDto dto, @MappingTarget DailyMealLog dailyMealLog);

  DailyMealLog toEntity(final DailyMealRequestDto dto);

  DailyMealResponseDto toDto(final DailyMealLog entity);

  DailyMealLogDto.DailyMealResponseDto dailyMealLogToResponseDto(DailyMealLog dailyMealLog);
}
