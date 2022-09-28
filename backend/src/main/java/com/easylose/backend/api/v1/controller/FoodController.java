package com.easylose.backend.api.v1.controller;

import com.easylose.backend.api.v1.dto.FoodDto;
import com.easylose.backend.api.v1.dto.FoodDto.FoodResponseDto;
import com.easylose.backend.api.v1.dto.FoodDto.FoodUserDto;
import com.easylose.backend.api.v1.service.FoodService;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("api/v1/food")
@RequiredArgsConstructor
public class FoodController {

  private final FoodService foodService;

  @GetMapping("")
  @Operation(summary = "음식 상세 정보", description = "음식 명으로 음식 상세 정보를 검색한다")
  public ResponseEntity<Collection> getFoodByName(
      @AuthenticationPrincipal Long id, @RequestParam(required = true) String name) {
    Collection<FoodDto.FoodResponseDto> response = foodService.getFoodByName(id, name);
    return ResponseEntity.status(HttpStatus.OK).body(response);
  }

  //  @GetMapping("/barcode")
  //  @Operation(summary = "음식 상세 정보", description = "음식 명으로 음식 상세 정보를 검색한다")
  //  public String getFoodByBarcode(
  //      @AuthenticationPrincipal Long id, @RequestParam(required = true) String barcode) {
  //    String response = foodService.getFoodByBarcode(id, barcode);
  //    //    return ResponseEntity.status(HttpStatus.OK).body(response);
  //    return response;
  //  }

  @GetMapping("/recent")
  @Operation(summary = "최근에 유저가 먹은 음식 리스트", description = "최근에 유저가 먹은 음식 중 상위 20개를 검색")
  public ResponseEntity<Collection> getRecentFood(@AuthenticationPrincipal Long id) {
    Collection<FoodResponseDto> response = foodService.getRecentFood(id);
    return ResponseEntity.status(HttpStatus.OK).body(response);
  }

  @PostMapping("")
  @Operation(summary = "유저 커스텀 음식 생성", description = "유저의 커스텀 음식을 생성한다")
  public ResponseEntity<FoodResponseDto> createFood(
      @AuthenticationPrincipal Long id, @RequestBody FoodUserDto dto) {
    FoodResponseDto response = foodService.createFood(id, dto);
    return ResponseEntity.status(HttpStatus.CREATED).body(response);
  }

  @PutMapping("{food_id}")
  @Operation(summary = "유저 커스텀 음식 수정", description = "유저의 커스텀 음식을 수정한다")
  public ResponseEntity<FoodResponseDto> updateFood(
      @AuthenticationPrincipal Long id, @PathVariable Long food_id, @RequestBody FoodUserDto dto) {

    FoodResponseDto response = foodService.updateFood(id, food_id, dto);
    return ResponseEntity.status(HttpStatus.OK).body(response);
  }

  @DeleteMapping("{food_id}")
  @Operation(summary = "유저 커스텀 음식 삭제", description = "요청을 보내는 유저의 커스텀 음식을 삭제한다")
  public ResponseEntity deleteFood(@AuthenticationPrincipal Long id, @PathVariable Long food_id) {
    foodService.deleteFood(id, food_id);
    return ResponseEntity.status(HttpStatus.OK).body(null);
  }
}
