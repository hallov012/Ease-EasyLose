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
      description = "시작일자와 종료일자 입력 시 해당 기간 내 유저의 변화한 키/몸무게를 알 수 있다. / 날짜 입령 형식 : yyyy-mm-dd")
  public ResponseEntity<Collection<WeightResponseDto>> getWeightLog(
      @AuthenticationPrincipal Long id,
      @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate date) {
    Collection<WeightResponseDto> response = analysisService.getWeightLog(id, date);
    return ResponseEntity.status(HttpStatus.OK).body(response);
  }

  @GetMapping("/daily")
  public ResponseEntity<Collection<MeasureLogResponseDto>> getMeasureLog(
      @AuthenticationPrincipal Long id,
      @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate start,
      @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate end) {
    Collection<MeasureLogResponseDto> response = analysisService.getMeasureLog(id, start, end);
    return ResponseEntity.status(HttpStatus.OK).body(response);
  }
}
