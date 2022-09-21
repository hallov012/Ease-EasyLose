package com.easylose.backend.api.v1.controller;

import com.easylose.backend.api.v1.dto.UserDto;
import com.easylose.backend.api.v1.service.UserService;
import io.swagger.annotations.ApiOperation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/profile")
public class ProfileController {
  private final Logger logger = LoggerFactory.getLogger(ProfileController.class);

  UserService userService;

  @Autowired
  public ProfileController(UserService userService) {
    this.userService = userService;
  }

  @GetMapping("/{id}")
  @ApiOperation(value = "특정 유저 정보", notes = "특정 유저 정보를 불러온다")
  public ResponseEntity<UserDto.ResponseDto> getUser(@PathVariable Long id) {
    logger.info("[getUser] Request Read User Information");
    UserDto.ResponseDto response = userService.getUser(id);
    return ResponseEntity.status(HttpStatus.OK).body(response);
  }

  @PutMapping("/{id}")
  @ApiOperation(value = "특정 유저 정보 변경", notes = "특정 유저 정보를 업데이트 한다")
  public ResponseEntity<UserDto.ResponseDto> updateUser(
      @PathVariable Long id, @RequestBody UserDto.UpdateRequestDto userRequestDto) {
    logger.info("[updateUser] Request Update User Information");
    UserDto.ResponseDto response = userService.updateUser(id, userRequestDto);
    return ResponseEntity.status(HttpStatus.OK).body(response);
  }

  @DeleteMapping("/{id}")
  @ApiOperation(value = "특정 유저 정보 삭제", notes = "특정 유저 정보를 삭제한다.")
  public ResponseEntity deleteUser(@PathVariable Long id) {
    logger.info("[deleteUser] Request Delete User Information");
    userService.deleteUser(id);
    return ResponseEntity.status(HttpStatus.OK).body(null);
  }

  @GetMapping("")
  @ApiOperation(value = "로그인 한 유저 정보", notes = "로그인 한 유저 정보를 불러온다.")
  public ResponseEntity<UserDto.ResponseDto> getMe(@AuthenticationPrincipal Long id) {
    UserDto.ResponseDto response = userService.getUser(id);
    return ResponseEntity.status(HttpStatus.OK).body(response);
  }
}
