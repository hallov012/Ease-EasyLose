package com.easylose.backend.api.v1.service;

import com.easylose.backend.api.v1.dto.CalendarDto.CalendarResponseDto;
import java.time.YearMonth;
import java.util.List;

public interface CalendarService {
  List<CalendarResponseDto> getCalendar(Long id, YearMonth yearMonth);
}
