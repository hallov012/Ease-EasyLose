package com.easylose.backend.api.v1.mapper;

import com.easylose.backend.api.v1.domain.DailyMealLog;
import com.easylose.backend.api.v1.domain.MeasureLog;
import com.easylose.backend.api.v1.domain.Recommend;
import com.easylose.backend.api.v1.domain.User;
import com.easylose.backend.api.v1.dto.CalendarDto.CalendarResponseDto;
import com.easylose.backend.api.v1.repository.MeasureLogRepository;
import com.easylose.backend.api.v1.repository.RecommendRepository;
import java.time.LocalDate;
import java.time.YearMonth;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;
import lombok.extern.slf4j.Slf4j;
import org.mapstruct.Mapper;
import org.springframework.beans.factory.annotation.Autowired;

@Mapper(componentModel = "spring")
@Slf4j
public abstract class CalendarMapper {
  @Autowired private MeasureLogRepository measureLogRepository;
  @Autowired private RecommendRepository recommendRepository;

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

      float dailyCalorie = lastMeasureLog.getDailyCalorie();
      float dailyCarb = lastMeasureLog.getDailyCarb();
      float dailyProtein = lastMeasureLog.getDailyProtein();
      float dailyFat = lastMeasureLog.getDailyFat();

      float score = 3;
      score -= Math.min(1, Math.abs(1 - totalCarb / dailyCarb));
      score -= Math.min(1, Math.abs(1 - totalProtein / dailyProtein));
      score -= Math.min(1, Math.abs(1 - totalFat / dailyFat));
      score /= 3;

      int carbDiff = Math.round(dailyCarb - totalCarb);
      int proteinDiff = Math.round(dailyProtein - totalProtein);
      int fatDiff = Math.round(dailyFat - totalFat);

      carbDiff = carbDiff > 0 ? Math.floorDiv(carbDiff, 50) * 50 : 0;
      proteinDiff = proteinDiff > 0 ? Math.floorDiv(proteinDiff, 5) * 5 : 0;
      fatDiff = fatDiff > 0 ? Math.floorDiv(fatDiff, 5) * 5 : 0;

      carbDiff = carbDiff > 950 ? 950 : carbDiff;
      proteinDiff = carbDiff > 100 ? 100 : proteinDiff;
      fatDiff = carbDiff > 399 ? 399 : fatDiff;

      List<Recommend> recommendList =
          recommendRepository.findAllByCarbAndProteinAndFat(carbDiff, proteinDiff, fatDiff);

      if (recommendList.isEmpty()){
        while (recommendList.isEmpty()){
          recommendList = re
        }
      }

      log.info("recommend List : {}", recommendList);
      log.info("carb / protein / fat : {} {} {}", carbDiff, proteinDiff, fatDiff);
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
              .build();

      responseDtos.put(date, calendarResponseDto);
    }

    return responseDtos;
  }
}
