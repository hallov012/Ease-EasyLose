package com.easylose.backend.api.v1.mapper;

import com.easylose.backend.api.v1.domain.Recommend;
import com.easylose.backend.api.v1.domain.User;
import com.easylose.backend.api.v1.dto.FoodSetDto.FoodSetResponseDto;
import com.easylose.backend.api.v1.dto.RecommendDto.RecommendResponseDto;
import com.easylose.backend.api.v1.repository.RecommendRepository;
import com.easylose.backend.api.v1.repository.specification.RecommendSpecification;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import lombok.extern.slf4j.Slf4j;
import org.mapstruct.Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

@Slf4j
@Mapper(componentModel = "spring")
public abstract class RecommendMapper {

  @Autowired private FoodMapper foodMapper;
  @Autowired private RecommendRepository recommendRepository;

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

  public List<RecommendResponseDto> fromFoodSetToDto(User user, FoodSetResponseDto foodSetDto) {
    int dailyCarb = user.getDailyCarb();
    int dailyProtein = user.getDailyProtein();
    int dailyFat = user.getDailyFat();

    float totalCarb = foodSetDto.getTotal().getCarb();
    float totalProtein = foodSetDto.getTotal().getProtein();
    float totalFat = foodSetDto.getTotal().getFat();

    int carbDiff = Math.round(dailyCarb - totalCarb);
    int proteinDiff = Math.round(dailyProtein - totalProtein);
    int fatDiff = Math.round(dailyFat - totalFat);

    List<RecommendResponseDto> resList = new ArrayList<RecommendResponseDto>();

    log.info("carb / protein / fat : {} {} {}", carbDiff, proteinDiff, fatDiff);
    carbDiff = carbDiff > 0 ? Math.floorDiv(carbDiff, 50) * 50 : 0;
    proteinDiff = proteinDiff > 0 ? Math.floorDiv(proteinDiff, 5) * 5 : 0;
    fatDiff = fatDiff > 0 ? Math.floorDiv(fatDiff, 5) * 5 : 0;

    log.info("carb / protein / fat : {} {} {}", carbDiff, proteinDiff, fatDiff);
    carbDiff = carbDiff > 950 ? 950 : carbDiff;
    proteinDiff = proteinDiff > 100 ? 100 : proteinDiff;
    fatDiff = fatDiff > 399 ? 399 : fatDiff;

    log.info("carb / protein / fat : {} {} {}", carbDiff, proteinDiff, fatDiff);
    if (carbDiff > 0 || proteinDiff > 0 || fatDiff > 0) {
      List<Recommend> recommendList =
          recommendRepository.findAllByCarbAndProteinAndFat(carbDiff, proteinDiff, fatDiff);
      if (recommendList.isEmpty()) {
        Specification<Recommend> spec = (root, query, builder) -> null;
        spec = spec.and(RecommendSpecification.lessThanList(carbDiff, proteinDiff, fatDiff));
        Pageable limit = PageRequest.of(0, 1);
        Recommend recommend = recommendRepository.findAll(spec, limit).toList().get(0);
        recommendList =
            recommendRepository.findAllByCarbAndProteinAndFat(
                recommend.getCarb(), recommend.getProtein(), recommend.getFat());
        log.info("recommend List : {}", recommendList);
      }
      if (recommendList.size() > 4) {
        log.info("Here is more than 4");
        List<Recommend> randomList = new ArrayList<>();
        Random rand = new Random();
        for (int i = 0; i < 4; i++) {
          int randomIndex = rand.nextInt(recommendList.size());
          randomList.add(recommendList.get(randomIndex));
          recommendList.remove(randomIndex);
        }
        recommendList = randomList;
      }
      resList = this.toDtoAll(recommendList);
    }

    return resList;
  }
}
