package com.easylose.backend.api.v1.controller;

import com.easylose.backend.api.v1.dto.FoodSetDto.FoodSetDetailRequestDto;
import com.easylose.backend.api.v1.dto.FoodSetDto.FoodSetDetailResponseDto;
import com.easylose.backend.api.v1.dto.FoodSetDto.FoodSetResponseDto;
import com.easylose.backend.api.v1.service.FoodSetService;
import io.swagger.v3.oas.annotations.Operation;
import java.util.Collection;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("api/v1/foodset")
@RequiredArgsConstructor
public class FoodSetController {

  private final FoodSetService foodSetService;

  @GetMapping("")
  @Operation(summary = "유저의 모의식단", description = "유저의 모의식단 전체 목록을 불러온다")
  public ResponseEntity<Collection<FoodSetResponseDto>> getFoodSetAll(
      @AuthenticationPrincipal Long id) {

    Collection<FoodSetResponseDto> response = foodSetService.getFoodSetAll(id);
    return ResponseEntity.status(HttpStatus.OK).body(response);
  }

  @PostMapping("")
  @Operation(summary = "신규 모의식단 생성", description = "신규 모의식단 생성")
  public ResponseEntity<FoodSetResponseDto> createFoodSet(@AuthenticationPrincipal Long id) {

    FoodSetResponseDto response = foodSetService.createFoodSet(id);
    return ResponseEntity.status(HttpStatus.OK).body(response);
  }

  @DeleteMapping("/{foodset_id}")
  @Operation(summary = "모의식단 삭제", description = "모의식단 삭제")
  public ResponseEntity<Boolean> deleteFoodSet(
      @AuthenticationPrincipal Long id, @PathVariable Long foodset_id) {

    boolean response = foodSetService.deleteFoodSet(id, foodset_id);
    return ResponseEntity.status(HttpStatus.OK).body(response);
  }

  @PostMapping("/{foodset_id}")
  @Operation(summary = "모의식단에 항목 추가", description = "모의식단에 항목 추가")
  public ResponseEntity<FoodSetDetailResponseDto> createFoodSetDetail(
      @AuthenticationPrincipal Long id,
      @PathVariable Long foodset_id,
      @RequestBody FoodSetDetailRequestDto body) {

    FoodSetDetailResponseDto response = foodSetService.createFoodSetDetail(id, foodset_id, body);
    return ResponseEntity.status(HttpStatus.OK).body(response);
  }

  @PutMapping("/{foodset_id}/{foodset_detail_id}")
  @Operation(summary = "모의식단 항목 수정", description = "모의식단 항목 수정")
  public ResponseEntity<FoodSetDetailResponseDto> updateFoodSetDetail(
      @AuthenticationPrincipal Long id,
      @PathVariable Long foodset_id,
      @PathVariable Long foodset_detail_id,
      @RequestBody FoodSetDetailRequestDto body) {

    FoodSetDetailResponseDto response =
        foodSetService.updateFoodSetDetail(id, foodset_id, foodset_detail_id, body);
    return ResponseEntity.status(HttpStatus.OK).body(response);
  }

  @DeleteMapping("/{foodset_id}/{foodset_detail_id}")
  @Operation(summary = "모의식단 항목 삭제", description = "모의식단 항목 삭제")
  public ResponseEntity<Boolean> deleteFoodSetDetail(
      @AuthenticationPrincipal Long id,
      @PathVariable Long foodset_id,
      @PathVariable Long foodset_detail_id) {

    boolean response = foodSetService.deleteFoodSetDetail(id, foodset_id, foodset_detail_id);
    return ResponseEntity.status(HttpStatus.OK).body(response);
  }
}
