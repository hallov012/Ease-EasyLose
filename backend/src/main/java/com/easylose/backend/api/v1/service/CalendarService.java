package com.easylose.backend.api.v1.service;

import com.easylose.backend.api.v1.dto.CalendarDto.CalendarResponseDto;
import java.time.LocalDate;
import java.time.YearMonth;
import java.util.Map;

public interface CalendarService {
  Map<LocalDate, CalendarResponseDto> getCalendar(Long id, YearMonth yearMonth);
}
