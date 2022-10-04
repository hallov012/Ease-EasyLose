package com.easylose.backend.api.v1.service.impl;

import com.easylose.backend.api.v1.domain.DailyMealLog;
import com.easylose.backend.api.v1.domain.User;
import com.easylose.backend.api.v1.dto.CalendarDto.CalendarResponseDto;
import com.easylose.backend.api.v1.mapper.CalendarMapper;
import com.easylose.backend.api.v1.repository.DailyMealLogRepository;
import com.easylose.backend.api.v1.repository.UserRepository;
import com.easylose.backend.api.v1.service.CalendarService;
import java.time.LocalDate;
import java.time.YearMonth;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class CalendarServiceImpl implements CalendarService {

  private final DailyMealLogRepository dailyMealLogRepository;
  private final UserRepository userRepository;
  private final CalendarMapper calendarMapper;

  public Map<LocalDate, CalendarResponseDto> getCalendar(Long id, YearMonth yearMonth) {
    User user = userRepository.getReferenceById(id);
    LocalDate startDate = yearMonth.atDay(1);
    LocalDate endDate = yearMonth.plusMonths(1).atDay(1).minusDays(1);

    List<DailyMealLog> dailyMealLogs =
        dailyMealLogRepository.findByUserAndDateBetween(user, startDate, endDate);

    return calendarMapper.toCalendarDtos(user, dailyMealLogs, yearMonth);
  }
}
