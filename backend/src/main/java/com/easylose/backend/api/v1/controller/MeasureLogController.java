package com.easylose.backend.api.v1.controller;

import com.easylose.backend.api.v1.dto.MeasureLogDto;
import com.easylose.backend.api.v1.service.MeasureLogService;
import io.swagger.annotations.ApiOperation;
import java.util.Collection;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/analysis")
@RequiredArgsConstructor
@Slf4j
public class MeasureLogController {

  private final MeasureLogService measureLogService;

  @GetMapping("")
  @ApiOperation(value = "유저 몸무게 변화 추이")
  public ResponseEntity<Collection> getMeasureLogAll(
      @AuthenticationPrincipal Long id,
      @RequestBody MeasureLogDto.MeasureLogRequestDto requestDto) {
    Collection<MeasureLogDto.MeasureLogResponseDto> response =
        measureLogService.getMeasureLogAll(id, requestDto);
    return ResponseEntity.status(HttpStatus.OK).body(response);
  }
}
