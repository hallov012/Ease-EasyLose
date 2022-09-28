package com.easylose.backend.api.v1.mapper;

import com.easylose.backend.api.v1.domain.Food;
import com.easylose.backend.api.v1.dto.FoodDto.FoodBarCodeDto;
import com.easylose.backend.api.v1.dto.FoodDto.FoodResponseDto;
import com.easylose.backend.api.v1.dto.FoodDto.FoodUserDto;
import java.util.List;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValueCheckStrategy;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface FoodMapper {
  FoodMapper INSTANCE = Mappers.getMapper(FoodMapper.class);

  Food toEntity(final FoodUserDto dto);

  FoodResponseDto toDto(final Food food);

  List<FoodResponseDto> toDtoAll(final List<Food> foods);

  @BeanMapping(
      nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE,
      nullValueCheckStrategy = NullValueCheckStrategy.ALWAYS)
  void updateFoodFromDto(FoodUserDto dto, @MappingTarget Food food);

  @BeanMapping(
      nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE,
      nullValueCheckStrategy = NullValueCheckStrategy.ALWAYS)
  void updateFoodFromBarCodeDto(FoodBarCodeDto dto, @MappingTarget Food food);
}
