package com.easylose.backend.api.v1.mapper;

import com.easylose.backend.api.v1.domain.Food;
import com.easylose.backend.api.v1.domain.FoodSet;
import com.easylose.backend.api.v1.domain.FoodSetDetail;
import com.easylose.backend.api.v1.dto.FoodDto;
import com.easylose.backend.api.v1.dto.FoodSetDto;
import com.easylose.backend.api.v1.enums.MealType;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public abstract class FoodSetMapper {
  public abstract List<FoodSetDto.FoodSetResponseDto> foodSetsToDto(List<FoodSet> foodSets);

  public FoodSetDto.FoodSetResponseDto foodSetToDto(FoodSet foodSet) {
    FoodSetDto.FoodSetResponseDto.FoodSetResponseDtoBuilder foodSetDto =
        FoodSetDto.FoodSetResponseDto.builder();

    foodSetDto.id(foodSet.getId());

    Map<MealType, List<FoodSetDto.FoodSetDetailResponseDto>> details =
        new HashMap<MealType, List<FoodSetDto.FoodSetDetailResponseDto>>();

    for (MealType mealType : MealType.values()) {
      details.put(mealType, new ArrayList<FoodSetDto.FoodSetDetailResponseDto>());
    }

    for (FoodSetDetail detail : foodSet.getDetails()) {
      details.get(detail.getMealType()).add(foodSetDetailToDto(detail));
    }

    foodSetDto.details(details);

    return foodSetDto.build();
  }

  public abstract FoodSetDto.FoodSetDetailResponseDto foodSetDetailToDto(
      FoodSetDetail foodSetDetail);

  public abstract FoodDto.FoodResponseDto foodToDto(Food food);
}
