package com.easylose.backend.api.v1.controller;

import com.easylose.backend.api.v1.dto.RecommendDto.RecommendResponseDto;
import com.easylose.backend.api.v1.service.RecommendService;
import io.swagger.v3.oas.annotations.Operation;
import java.util.Collection;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/recommend")
@RequiredArgsConstructor
@Slf4j
public class RecommendController {

  private final RecommendService recommendService;

  @GetMapping("/{foodset_id}")
  @Operation(
      summary = "모의 식단 id를 입력받아 음식 추천을 받는다.",
      description = "모의 식단 id를 입력받아 부족한 부분에 대한 음식을 추천 받는다. 최대 4개")
  public ResponseEntity<Collection<RecommendResponseDto>> getRecommend(
      @AuthenticationPrincipal Long id, @PathVariable Long foodset_id) {

    Collection<RecommendResponseDto> response = recommendService.getRecommend(id, foodset_id);
    return ResponseEntity.status(HttpStatus.OK).body(response);
  }
}
