package com.easylose.backend.api.v1.mapper;

import com.easylose.backend.api.v1.domain.DailyMealLog;
import com.easylose.backend.api.v1.domain.MeasureLog;
import com.easylose.backend.api.v1.domain.User;
import com.easylose.backend.api.v1.dto.CalendarDto.CalendarResponseDto;
import com.easylose.backend.api.v1.repository.MeasureLogRepository;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.mapstruct.Mapper;
import org.springframework.beans.factory.annotation.Autowired;

@Mapper(componentModel = "spring")
public abstract class CalendarMapper {
  @Autowired private MeasureLogRepository measureLogRepository;

  public List<CalendarResponseDto> toCalendarDtos(User user, List<DailyMealLog> dailyMealLogs) {
    List<CalendarResponseDto> responseDtos = new ArrayList<CalendarResponseDto>();

    Map<LocalDate, List<DailyMealLog>> intermMap = new HashMap<LocalDate, List<DailyMealLog>>();

    for (DailyMealLog dailyMealLog : dailyMealLogs) {
      LocalDate date = dailyMealLog.getDate();
      if (!intermMap.containsKey(date)) {
        intermMap.put(date, new ArrayList<DailyMealLog>());
      }

      intermMap.get(date).add(dailyMealLog);
    }

    for (Map.Entry<LocalDate, List<DailyMealLog>> entry : intermMap.entrySet()) {
      LocalDate date = entry.getKey();
      List<DailyMealLog> intermDailyMealLogs = entry.getValue();

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

      CalendarResponseDto calendarResponseDto =
          CalendarResponseDto.builder()
              .date(date)
              .totalCalorie(totalCalorie)
              .totalCarb(totalCarb)
              .totalProtein(totalProtein)
              .totalFat(totalFat)
              .dailyCalorie(lastMeasureLog.getDailyCalorie())
              .dailyCarb(lastMeasureLog.getDailyCarb())
              .dailyProtein(lastMeasureLog.getDailyProtein())
              .dailyFat(lastMeasureLog.getDailyFat())
              .build();

      responseDtos.add(calendarResponseDto);
    }

    responseDtos.sort((a, b) -> a.getDate().compareTo(b.getDate()));

    return responseDtos;
  }
}
