package com.easylose.backend.api.v1.mapper;

import com.easylose.backend.api.v1.domain.Recommend;
import com.easylose.backend.api.v1.dto.RecommendDto.RecommendResponseDto;
import java.util.List;
import org.mapstruct.Mapper;
import org.springframework.beans.factory.annotation.Autowired;

@Mapper(componentModel = "spring")
public abstract class RecommendMapper {

  @Autowired private FoodMapper foodMapper;

  public abstract List<RecommendResponseDto> toDtoAll(List<Recommend> recommends);

  public RecommendResponseDto toDto(Recommend recommend) {
    String description = "";

    if (recommend.getCarb() != 0) {
      description += "carb ";
    }
    if (recommend.getProtein() != 0) {
      description += "protein ";
    }
    if (recommend.getFat() != 0) {
      description += "fat ";
    }
    description = description.trim();

    RecommendResponseDto dto =
        RecommendResponseDto.builder()
            .name(recommend.getFood().getName())
            .reason(description)
            .food(foodMapper.toDto(recommend.getFood()))
            .build();

    return dto;
  }
}
