package com.easylose.backend.api.v1.mapper;

import com.easylose.backend.api.v1.domain.Food;
import com.easylose.backend.api.v1.dto.FoodDto.FoodResponseDto;
import com.easylose.backend.api.v1.dto.FoodDto.FoodUserDto;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface FoodMapper {
  FoodMapper INSTANCE = Mappers.getMapper(FoodMapper.class);

  Food toEntity(final FoodUserDto dto);

  FoodResponseDto toDto(final Food food);
}
