package com.easylose.backend.api.v1.mapper;

import com.easylose.backend.api.v1.domain.DailyMealLog;
import com.easylose.backend.api.v1.dto.DailyMealLogDto;
import com.easylose.backend.api.v1.dto.DailyMealLogDto.DailyMealFoodDto;
import com.easylose.backend.api.v1.dto.DailyMealLogDto.DailyMealRequestDto;
import com.easylose.backend.api.v1.dto.DailyMealLogDto.DailyMealResponseDto;
import com.easylose.backend.api.v1.dto.DailyMealLogDto.DailyMealResultDto;
import com.easylose.backend.api.v1.dto.DailyMealLogDto.DailyMealSumDto;
import com.easylose.backend.api.v1.dto.DailyMealLogDto.DailyMealSumIntDto;
import com.easylose.backend.api.v1.enums.MealType;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import lombok.extern.slf4j.Slf4j;
import org.mapstruct.*;

@Slf4j
@Mapper(componentModel = "spring")
public abstract class DailyMealLogMapper {

  @BeanMapping(
      nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE,
      nullValueCheckStrategy = NullValueCheckStrategy.ALWAYS)
  public abstract void updateDailyMealLogFromRequestDto(
      DailyMealLogDto.DailyMealRequestDto dto, @MappingTarget DailyMealLog dailyMealLog);

  public abstract DailyMealLog toEntity(final DailyMealRequestDto dto);

  public abstract DailyMealResponseDto dailyMealLogToDto(final DailyMealLog dailyMeallog);

  public abstract DailyMealFoodDto foodToDto(final DailyMealLog dailyMeallog);

  @Mapping(source = "food.calorie", target = "calorie")
  @Mapping(source = "food.carb", target = "carb")
  @Mapping(source = "food.protein", target = "protein")
  @Mapping(source = "food.fat", target = "fat")
  @Mapping(source = "food.sugar", target = "sugar")
  @Mapping(source = "food.salt", target = "salt")
  @Mapping(source = "food.cholesterol", target = "cholesterol")
  @Mapping(source = "food.saturatedFat", target = "saturatedFat")
  @Mapping(source = "food.transFat", target = "transFat")
  public abstract DailyMealSumDto toSumDto(final DailyMealLog dailyMealLog);

  public DailyMealResultDto dailyLogResultDto(
      final List<DailyMealLog> dailyMealLogs, LocalDate date) {
    DailyMealResultDto.DailyMealResultDtoBuilder dto = DailyMealResultDto.builder();
    dto.date(date);
    Map<MealType, List<DailyMealFoodDto>> details = new HashMap<MealType, List<DailyMealFoodDto>>();
    Map<MealType, Map<String, Integer>> sums = new HashMap<MealType, Map<String, Integer>>();

    DailyMealSumIntDto sumResultDto =
        DailyMealSumIntDto.builder()
            .calorie(0)
            .carb(0)
            .protein(0)
            .fat(0)
            .sugar(0)
            .salt(0)
            .cholesterol(0)
            .saturatedFat(0)
            .transFat(0)
            .build();

    for (MealType mealType : MealType.values()) {
      details.put(mealType, new ArrayList<DailyMealFoodDto>());

      Map<String, Integer> container = new HashMap<>();
      container.put("calorie", 0);
      container.put("carb", 0);
      container.put("protein", 0);
      container.put("fat", 0);
      container.put("sugar", 0);
      container.put("salt", 0);
      container.put("cholesterol", 0);
      container.put("saturatedFat", 0);
      container.put("transFat", 0);

      sums.put(mealType, container);
      log.info("sum : {}", sums);
    }

    for (DailyMealLog dailyMealLog : dailyMealLogs) {
      details.get(dailyMealLog.getMealType()).add(foodToDto(dailyMealLog));
      DailyMealSumDto sumDto = toSumDto(dailyMealLog);
      sums.get(dailyMealLog.getMealType())
          .put(
              "calorie",
              sums.get(dailyMealLog.getMealType()).get("calorie")
                  + Math.round(sumDto.getCalorie() * dailyMealLog.getCount()));
      sums.get(dailyMealLog.getMealType())
          .put(
              "carb",
              sums.get(dailyMealLog.getMealType()).get("carb")
                  + Math.round(sumDto.getCarb() * dailyMealLog.getCount()));
      sums.get(dailyMealLog.getMealType())
          .put(
              "protein",
              sums.get(dailyMealLog.getMealType()).get("protein")
                  + Math.round(sumDto.getProtein() * dailyMealLog.getCount()));
      sums.get(dailyMealLog.getMealType())
          .put(
              "fat",
              sums.get(dailyMealLog.getMealType()).get("fat")
                  + Math.round(sumDto.getFat() * dailyMealLog.getCount()));
      sums.get(dailyMealLog.getMealType())
          .put(
              "sugar",
              sums.get(dailyMealLog.getMealType()).get("sugar")
                  + Math.round(sumDto.getSugar() * dailyMealLog.getCount()));
      sums.get(dailyMealLog.getMealType())
          .put(
              "salt",
              sums.get(dailyMealLog.getMealType()).get("salt")
                  + Math.round(sumDto.getSalt() * dailyMealLog.getCount()));
      sums.get(dailyMealLog.getMealType())
          .put(
              "cholesterol",
              sums.get(dailyMealLog.getMealType()).get("cholesterol")
                  + Math.round(sumDto.getCholesterol() * dailyMealLog.getCount()));
      sums.get(dailyMealLog.getMealType())
          .put(
              "saturatedFat",
              sums.get(dailyMealLog.getMealType()).get("saturatedFat")
                  + Math.round(sumDto.getSaturatedFat() * dailyMealLog.getCount()));
      sums.get(dailyMealLog.getMealType())
          .put(
              "transFat",
              sums.get(dailyMealLog.getMealType()).get("transFat")
                  + Math.round(sumDto.getTransFat() * dailyMealLog.getCount()));
      sumResultDto.setCalorie(
          sums.get(dailyMealLog.getMealType()).get("calorie") + sumResultDto.getCalorie());
      sumResultDto.setCarb(
          sums.get(dailyMealLog.getMealType()).get("carb") + sumResultDto.getCarb());
      sumResultDto.setProtein(
          sums.get(dailyMealLog.getMealType()).get("protein") + sumResultDto.getProtein());
      sumResultDto.setFat(sums.get(dailyMealLog.getMealType()).get("fat") + sumResultDto.getFat());
      sumResultDto.setSugar(
          sums.get(dailyMealLog.getMealType()).get("sugar") + sumResultDto.getSugar());
      sumResultDto.setSalt(
          sums.get(dailyMealLog.getMealType()).get("salt") + sumResultDto.getSalt());
      sumResultDto.setCholesterol(
          sums.get(dailyMealLog.getMealType()).get("cholesterol") + sumResultDto.getCholesterol());
      sumResultDto.setSaturatedFat(
          sums.get(dailyMealLog.getMealType()).get("saturatedFat")
              + sumResultDto.getSaturatedFat());
      sumResultDto.setTransFat(
          sums.get(dailyMealLog.getMealType()).get("transFat") + sumResultDto.getTransFat());
    }
    dto.total(sumResultDto);
    dto.sums(sums);
    dto.details(details);
    return dto.build();
  }
}
