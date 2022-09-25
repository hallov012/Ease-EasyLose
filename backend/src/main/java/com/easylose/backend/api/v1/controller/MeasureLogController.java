package com.easylose.backend.api.v1.controller;

import com.easylose.backend.api.v1.service.MeasureLogService;
import io.swagger.annotations.ApiOperation;
import java.util.Collection;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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
public class MeasureLogController {

  private final MeasureLogService measureLogService;

  @GetMapping("")
  @ApiOperation(
      value = "유저 키/몸무게 변화 추이",
      notes = "시작일자와 종료일자 입력 시 해당 기간 내 유저의 변화한 키/몸무게를 알 수 있다. 아무것도 입력하지 않을 시 오늘 조회")
  public ResponseEntity<Collection> getMeasureLogAll(
      @AuthenticationPrincipal Long id,
      @RequestParam(required = false) String start,
      @RequestParam(required = false) String end) {
    Collection response = measureLogService.getMeasureLogAll(id, start, end);
    return ResponseEntity.status(HttpStatus.OK).body(response);
  }
}
