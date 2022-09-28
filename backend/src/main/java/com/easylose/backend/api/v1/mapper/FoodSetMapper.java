package com.easylose.backend.api.v1.mapper;

import com.easylose.backend.api.v1.domain.Food;
import com.easylose.backend.api.v1.domain.FoodSet;
import com.easylose.backend.api.v1.domain.FoodSetDetail;
import com.easylose.backend.api.v1.dto.FoodDto.FoodResponseDto;
import com.easylose.backend.api.v1.dto.FoodSetDto.FoodSetDetailRequestDto;
import com.easylose.backend.api.v1.dto.FoodSetDto.FoodSetDetailResponseDto;
import com.easylose.backend.api.v1.dto.FoodSetDto.FoodSetResponseDto;
import com.easylose.backend.api.v1.enums.MealType;
import com.easylose.backend.api.v1.repository.FoodRepository;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.Named;
import org.mapstruct.NullValueCheckStrategy;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.springframework.beans.factory.annotation.Autowired;

@Mapper(componentModel = "spring")
public abstract class FoodSetMapper {
  @Autowired private FoodRepository foodRepository;

  public abstract List<FoodSetResponseDto> foodSetsToDto(List<FoodSet> foodSets);

  public FoodSetResponseDto foodSetToDto(FoodSet foodSet) {
    FoodSetResponseDto.FoodSetResponseDtoBuilder foodSetDto = FoodSetResponseDto.builder();

    foodSetDto.id(foodSet.getId());

    Map<MealType, List<FoodSetDetailResponseDto>> details =
        new HashMap<MealType, List<FoodSetDetailResponseDto>>();

    for (MealType mealType : MealType.values()) {
      details.put(mealType, new ArrayList<FoodSetDetailResponseDto>());
    }

    for (FoodSetDetail detail : foodSet.getDetails()) {
      details.get(detail.getMealType()).add(foodSetDetailToDto(detail));
    }

    foodSetDto.details(details);

    return foodSetDto.build();
  }

  public abstract FoodSetDetailResponseDto foodSetDetailToDto(FoodSetDetail foodSetDetail);

  public abstract FoodResponseDto foodToDto(Food food);

  @Named("foodIdToFood")
  public Food foodIdToFood(Long foodId) {
    return foodRepository.getReferenceById(foodId);
  }

  @BeanMapping(
      nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE,
      nullValueCheckStrategy = NullValueCheckStrategy.ALWAYS)
  @Mapping(source = "foodId", target = "food", qualifiedByName = "foodIdToFood")
  public abstract void updateFoodSetDetail(
      FoodSetDetailRequestDto dto, @MappingTarget FoodSetDetail foodSetDetail);
}
