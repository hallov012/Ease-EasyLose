package com.easylose.backend.api.v1.controller;

import com.easylose.backend.api.v1.dto.CalendarDto.CalendarResponseDto;
import com.easylose.backend.api.v1.service.CalendarService;
import io.swagger.v3.oas.annotations.Operation;
import java.time.LocalDate;
import java.time.YearMonth;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("api/v1/calendar")
@Slf4j
public class CalendarController {
  private final CalendarService calendarService;

  @GetMapping("/")
  @Operation(summary = "유저가 먹은 음식 월별 조회", description = "유저가 먹은 음식 월별 조회 / 날짜 입력 형식 : yyyy-mm")
  public ResponseEntity<Map<LocalDate, CalendarResponseDto>> getDailyMealCalender(
      @AuthenticationPrincipal Long id,
      @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM") YearMonth year_month) {

    if (year_month == null) {
      year_month = YearMonth.now();
    }

    Map<LocalDate, CalendarResponseDto> response = calendarService.getCalendar(id, year_month);
    log.info("response : {}", response);
    return ResponseEntity.status(HttpStatus.OK).body(response);
  }
}
