package com.easylose.backend.api.v1.controller;

import com.easylose.backend.api.v1.dto.UserDto.UserRequestDto;
import com.easylose.backend.api.v1.dto.UserDto.UserResponseDto;
import com.easylose.backend.api.v1.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController // json 반환
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
public class UserController {

  private final UserService userService;

  @GetMapping("")
  @Operation(summary = "로그인 한 유저 정보", description = "로그인 한 유저 정보를 불러온다.")
  public ResponseEntity<UserResponseDto> getUser(@AuthenticationPrincipal Long id) {
    log.info("[GET] Log in user's information request");
    UserResponseDto response = userService.getUser(id);
    log.info("[GET] Log in user's information response");
    return ResponseEntity.status(HttpStatus.OK).body(response);
  }

  @PutMapping("")
  @Operation(summary = "로그인 한 유저 정보 변경", description = "로그인 한 유저 정보를 업데이트 한다")
  public ResponseEntity<UserResponseDto> updateUser(
      @AuthenticationPrincipal Long id, @RequestBody UserRequestDto requestDto) {
    UserResponseDto response = userService.updateUser(id, requestDto);
    return ResponseEntity.status(HttpStatus.OK).body(response);
  }

  @DeleteMapping("")
  @Operation(summary = "로그인 한 유저 정보 삭제", description = "로그인 한 유저 정보를 삭제한다.")
  public ResponseEntity<Boolean> deleteUser(@AuthenticationPrincipal Long id) {
    boolean response = userService.deleteUser(id);
    return ResponseEntity.status(HttpStatus.OK).body(response);
  }
}
