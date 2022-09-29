package com.easylose.backend.api.v1.controller;

import com.easylose.backend.api.v1.dto.MeasureLogDto.MeasureLogResponseDto;
import com.easylose.backend.api.v1.dto.WeightLogDto.WeightResponseDto;
import com.easylose.backend.api.v1.service.AnalysisService;
import io.swagger.v3.oas.annotations.Operation;
import java.time.LocalDate;
import java.util.Collection;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/analysis")
@RequiredArgsConstructor
@Slf4j
public class AnalysisController {

  private final AnalysisService analysisService;

  @GetMapping("/weight")
  @Operation(
      summary = "유저 몸무게 변화 추이",
      description = "유저 생성날짜 ~ 입력 날짜 사이의 모든 몸무게 변화 로그 전송 / 날짜 입력 형식 : yyyy-mm-dd")
  public ResponseEntity<Collection<WeightResponseDto>> getWeightLog(
      @AuthenticationPrincipal Long id,
      @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate date) {
    Collection<WeightResponseDto> response = analysisService.getWeightLog(id, date);
    return ResponseEntity.status(HttpStatus.OK).body(response);
  }

  @GetMapping("/dailyLog")
  @Operation(
      summary = "유저 데일리 기준 영양소 변화",
      description = "시작일자와 종료일자 사이의 유저의 데일리 기준 영양소 변화 로그 전송 / 날짜 입력 형식 : yyyy-mm-dd")
  public ResponseEntity<Collection<MeasureLogResponseDto>> getMeasureLog(
      @AuthenticationPrincipal Long id,
      @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate start,
      @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate end) {
    Collection<MeasureLogResponseDto> response = analysisService.getMeasureLog(id, start, end);
    return ResponseEntity.status(HttpStatus.OK).body(response);
  }

  //  @GetMapping("/daily")
  //  @Operation(
  //      summary = "유저 섭취 영양소 분석",
  //      description = "시작일자와 종료일자 사이의 일일 섭취 영양소 전송 / 날짜 입력 형식 : yyyy-mm-dd")
  //  public ResponseEntity<Collection<MeasureLogResponseDto>> getDailyRecord(
  //      @AuthenticationPrincipal Long id,
  //      @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate start,
  //      @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate end) {
  //    Collection<MeasureLogResponseDto> response = analysisService.getDailyRecord(id, start, end);
  //    return ResponseEntity.status(HttpStatus.OK).body(response);
  //  }
}
