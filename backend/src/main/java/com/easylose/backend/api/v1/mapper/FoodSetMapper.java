package com.easylose.backend.api.v1.mapper;

import com.easylose.backend.api.v1.domain.Food;
import com.easylose.backend.api.v1.domain.FoodSet;
import com.easylose.backend.api.v1.domain.FoodSetDetail;
import com.easylose.backend.api.v1.dto.FoodDto.FoodResponseDto;
import com.easylose.backend.api.v1.dto.FoodSetDto.FoodSetDetailCreateRequestDto;
import com.easylose.backend.api.v1.dto.FoodSetDto.FoodSetDetailRequestDto;
import com.easylose.backend.api.v1.dto.FoodSetDto.FoodSetDetailResponseDto;
import com.easylose.backend.api.v1.dto.FoodSetDto.FoodSetRequestDto;
import com.easylose.backend.api.v1.dto.FoodSetDto.FoodSetResponseDto;
import com.easylose.backend.api.v1.dto.FoodSetDto.FoodSetSumDto;
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
    foodSetDto.name(foodSet.getName());

    Map<MealType, List<FoodSetDetailResponseDto>> details =
        new HashMap<MealType, List<FoodSetDetailResponseDto>>();
    Map<MealType, FoodSetSumDto> sums = new HashMap<MealType, FoodSetSumDto>();
    FoodSetSumDto total = FoodSetSumDto.builder().build();

    for (MealType mealType : MealType.values()) {
      details.put(mealType, new ArrayList<FoodSetDetailResponseDto>());
      sums.put(mealType, FoodSetSumDto.builder().build());
    }

    for (FoodSetDetail detail : foodSet.getDetails()) {
      MealType mealType = detail.getMealType();
      details.get(mealType).add(foodSetDetailToDto(detail));
      sums.get(mealType).addFromDetail(detail);
    }

    for (MealType mealType : MealType.values()) {
      total.addFromDto(sums.get(mealType));
    }

    foodSetDto.details(details);
    foodSetDto.sums(sums);
    foodSetDto.total(total);

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

  @BeanMapping(
      nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE,
      nullValueCheckStrategy = NullValueCheckStrategy.ALWAYS)
  public abstract void updateFoodSetDetail(
      FoodSetDetailCreateRequestDto dto, @MappingTarget FoodSetDetail foodSetDetail);

  @BeanMapping(
      nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE,
      nullValueCheckStrategy = NullValueCheckStrategy.ALWAYS)
  public abstract void updateFoodSet(FoodSetRequestDto dto, @MappingTarget FoodSet foodSet);
}
