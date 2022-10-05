package com.easylose.backend.api.v1.mapper;

import com.easylose.backend.api.v1.domain.DailyMealLog;
import com.easylose.backend.api.v1.domain.MeasureLog;
import com.easylose.backend.api.v1.domain.Recommend;
import com.easylose.backend.api.v1.domain.User;
import com.easylose.backend.api.v1.dto.CalendarDto.CalendarResponseDto;
import com.easylose.backend.api.v1.dto.RecommendDto.RecommendResponseDto;
import com.easylose.backend.api.v1.repository.MeasureLogRepository;
import com.easylose.backend.api.v1.repository.RecommendRepository;
import com.easylose.backend.api.v1.repository.specification.RecommendSpecification;
import com.easylose.backend.util.Utils;
import java.time.LocalDate;
import java.time.YearMonth;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.TreeMap;
import lombok.extern.slf4j.Slf4j;
import org.mapstruct.Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

@Mapper(componentModel = "spring")
@Slf4j
public abstract class CalendarMapper {
  @Autowired private MeasureLogRepository measureLogRepository;
  @Autowired private RecommendRepository recommendRepository;

  @Autowired private RecommendMapper recommendMapper;

  public Map<LocalDate, CalendarResponseDto> toCalendarDtos(
      User user, List<DailyMealLog> dailyMealLogs, YearMonth yearMonth) {

    Map<LocalDate, List<DailyMealLog>> intermMap = new HashMap<LocalDate, List<DailyMealLog>>();
    for (int i = 0; i < yearMonth.lengthOfMonth(); i++) {
      intermMap.put(yearMonth.atDay(1).plusDays(i), new ArrayList<DailyMealLog>());
    }

    for (DailyMealLog dailyMealLog : dailyMealLogs) {
      intermMap.get(dailyMealLog.getDate()).add(dailyMealLog);
    }

    Map<LocalDate, CalendarResponseDto> responseDtos =
        new TreeMap<LocalDate, CalendarResponseDto>();

    for (Map.Entry<LocalDate, List<DailyMealLog>> entry : intermMap.entrySet()) {
      LocalDate date = entry.getKey();
      List<DailyMealLog> intermDailyMealLogs = entry.getValue();

      if (intermDailyMealLogs.isEmpty()) {
        responseDtos.put(date, null);
        continue;
      }

      float totalCalorie = 0;
      float totalCarb = 0;
      float totalProtein = 0;
      float totalFat = 0;

      for (DailyMealLog dailyMealLog : intermDailyMealLogs) {
        totalCalorie += dailyMealLog.getFood().getCalorie() * dailyMealLog.getCount();
        totalCarb += dailyMealLog.getFood().getCarb() * dailyMealLog.getCount();
        totalProtein += dailyMealLog.getFood().getProtein() * dailyMealLog.getCount();
        totalFat += dailyMealLog.getFood().getFat() * dailyMealLog.getCount();
      }

      MeasureLog lastMeasureLog =
          measureLogRepository.findTopByUserAndCreatedAtLessThanOrderByCreatedAtDesc(
              user, date.plusDays(1).atStartOfDay());

      if (lastMeasureLog == null) {
        lastMeasureLog = measureLogRepository.findTopByUser(user);
      }

      List<RecommendResponseDto> resList = new ArrayList<RecommendResponseDto>();
      float dailyCalorie = lastMeasureLog.getDailyCalorie();
      float dailyCarb = lastMeasureLog.getDailyCarb();
      float dailyProtein = lastMeasureLog.getDailyProtein();
      float dailyFat = lastMeasureLog.getDailyFat();

      float score = 0;
      score += Utils.mealScore(totalCarb, dailyCarb);
      score += Utils.mealScore(totalProtein, dailyProtein);
      score += Utils.mealScore(totalFat, dailyFat);
      score /= 3;

      int carbDiff = Math.round(dailyCarb - totalCarb);
      int proteinDiff = Math.round(dailyProtein - totalProtein);
      int fatDiff = Math.round(dailyFat - totalFat);

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
        resList = recommendMapper.toDtoAll(recommendList);
      }

      CalendarResponseDto calendarResponseDto =
          CalendarResponseDto.builder()
              .score(score)
              .totalCalorie(totalCalorie)
              .totalCarb(totalCarb)
              .totalProtein(totalProtein)
              .totalFat(totalFat)
              .dailyCalorie(dailyCalorie)
              .dailyCarb(dailyCarb)
              .dailyProtein(dailyProtein)
              .dailyFat(dailyFat)
              .recommends(resList)
              .build();

      responseDtos.put(date, calendarResponseDto);
    }

    return responseDtos;
  }
}
