package com.easylose.backend.api.v1.mapper;

import com.easylose.backend.api.v1.domain.Food;
import com.easylose.backend.api.v1.domain.FoodSet;
import com.easylose.backend.api.v1.domain.FoodSetDetail;
import com.easylose.backend.api.v1.dto.FoodDto;
import com.easylose.backend.api.v1.dto.FoodSetDto;
import java.util.List;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface FoodSetMapper {
  List<FoodSetDto.FoodSetResponseDto> foodSetsToDto(List<FoodSet> foodSets);

  FoodSetDto.FoodSetResponseDto foodSetToDto(FoodSet foodSet);

  List<FoodSetDto.FoodSetDetailResponseDto> foodSetDetailsToDto(List<FoodSetDetail> foodSetDetail);

  FoodSetDto.FoodSetDetailResponseDto foodSetDetailToDto(FoodSetDetail foodSetDetail);

  FoodDto.FoodResponseDto foodToDto(Food food);
}
