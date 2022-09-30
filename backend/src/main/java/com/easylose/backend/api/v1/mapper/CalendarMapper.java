package com.easylose.backend.api.v1.mapper;

import com.easylose.backend.api.v1.domain.DailyMealLog;
import com.easylose.backend.api.v1.domain.MeasureLog;
import com.easylose.backend.api.v1.domain.User;
import com.easylose.backend.api.v1.dto.CalendarDto.CalendarResponseDto;
import com.easylose.backend.api.v1.repository.MeasureLogRepository;
import java.time.LocalDate;
import java.time.YearMonth;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;
import org.mapstruct.Mapper;
import org.springframework.beans.factory.annotation.Autowired;

@Mapper(componentModel = "spring")
public abstract class CalendarMapper {
  @Autowired private MeasureLogRepository measureLogRepository;

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

      float score = 1;
      score -= Math.abs((totalCarb - dailyCarb) / dailyCarb) / 3;
      score -= Math.abs((totalProtein - dailyProtein) / dailyProtein) / 3;
      score -= Math.abs((totalFat - dailyFat) / dailyFat) / 3;

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
