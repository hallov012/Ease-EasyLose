package com.easylose.backend.api.v1.controller;

import com.easylose.backend.api.v1.dto.FoodDto;
import com.easylose.backend.api.v1.service.FoodService;
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

@Slf4j
@RestController
@RequestMapping("api/v1/food")
@RequiredArgsConstructor
public class FoodController {

  private final FoodService foodService;

  @GetMapping("")
  @ApiOperation(value = "음식 상세 정보", notes = "음식 명으로 음식 상세 정보를 검색한다")
  public ResponseEntity<Collection> getFood(
      @AuthenticationPrincipal Long id,
      @RequestParam(required = false) String name,
      @RequestParam(required = false) String barcode) {
    Collection<FoodDto.FoodResponseDto> response = foodService.getFood(id, name, barcode);
    return ResponseEntity.status(HttpStatus.OK).body(response);
  }
}
