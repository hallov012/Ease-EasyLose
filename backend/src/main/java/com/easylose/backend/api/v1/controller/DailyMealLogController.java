package com.easylose.backend.api.v1.controller;

import com.easylose.backend.api.v1.dto.DailyMealLogDto.DailyMealCreateRequestDto;
import com.easylose.backend.api.v1.dto.DailyMealLogDto.DailyMealCreateResponseDto;
import com.easylose.backend.api.v1.dto.DailyMealLogDto.DailyMealRequestDto;
import com.easylose.backend.api.v1.dto.DailyMealLogDto.DailyMealResponseDto;
import com.easylose.backend.api.v1.dto.DailyMealLogDto.DailyMealResultDto;
import com.easylose.backend.api.v1.service.DailyMealLogService;
import io.swagger.v3.oas.annotations.Operation;
import java.time.LocalDate;
import java.util.Collection;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("api/v1/dailymeal")
@Slf4j
public class DailyMealLogController {
  private final DailyMealLogService dailyMealLogService;

  @GetMapping("")
  @Operation(summary = "유저가 먹은 음식 조회", description = "유저가 특정 날짜에 먹은 음식 조회 / 날짜 입령 형식 : yyyy-mm-dd")
  public ResponseEntity<Collection<DailyMealResultDto>> getDailyMealAll(
      @AuthenticationPrincipal Long id,
      @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate date) {
    Collection<DailyMealResultDto> response = dailyMealLogService.getDailyMealAll(id, date);
    log.info("response : {}", response);
    return ResponseEntity.status(HttpStatus.OK).body(response);
  }

  @PostMapping("")
  @Operation(
      summary = "유저가 먹은 음식 생성",
      description =
          "유저가 특정 날짜에 먹은 음식 로그 데이터를 생성한다. / 날짜 입령 형식 : yyyy-mm-dd / mealType : [BREAKFAST, LUNCH, DINNER, SNACK]")
  public ResponseEntity<DailyMealCreateResponseDto> createDailyMeal(
      @AuthenticationPrincipal Long id, @RequestBody DailyMealCreateRequestDto requestDto) {
    DailyMealCreateResponseDto response = dailyMealLogService.createDailyMeal(id, requestDto);
    log.info("response : {}", response);
    return ResponseEntity.status(HttpStatus.CREATED).body(response);
  }

  @PutMapping("/{dailyMeal_id}")
  @Operation(summary = "유저가 먹은 음식 수정", description = "먹은 음식 수정")
  public ResponseEntity<DailyMealResponseDto> updateDailyMeal(
      @AuthenticationPrincipal Long id,
      @PathVariable Long dailyMeal_id,
      @RequestBody DailyMealRequestDto requestDto) {
    DailyMealResponseDto response =
        dailyMealLogService.updateDailyMeal(id, dailyMeal_id, requestDto);
    return ResponseEntity.status(HttpStatus.OK).body(response);
  }

  @DeleteMapping("/{dailyMeal_id}")
  @Operation(summary = "유저가 먹은 음식 삭제", description = "유저가 먹은 음식 삭제")
  public ResponseEntity<Boolean> deleteDailyMeal(
      @AuthenticationPrincipal Long id, @PathVariable Long dailyMeal_id) {
    boolean response = dailyMealLogService.deleteDailyMeal(id, dailyMeal_id);
    return ResponseEntity.status(HttpStatus.OK).body(response);
  }
}
