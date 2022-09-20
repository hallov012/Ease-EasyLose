package com.easylose.backend.api.v1.controller;

import java.util.Collection;

import com.easylose.backend.api.v1.dto.UserDto;
import io.swagger.annotations.ApiOperation;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.easylose.backend.api.v1.service.UserService;

@RestController // json 반환
@RequestMapping("/api/v1/user")
public class UserController {

  private final Logger logger = LoggerFactory.getLogger(UserController.class);
  UserService userService;

  @Autowired
  public UserController(UserService userService) {
    this.userService = userService;
  }

  @GetMapping("")
  @ApiOperation(value="전체 유저 목록", notes ="전체 유저목록을 불러온다")
  public ResponseEntity<Collection> getUserAll() {
    logger.info("[getUserAll] Request Read All User List");
    Collection users = userService.getUserAll();
    return ResponseEntity.status(HttpStatus.OK).body(users);
  }

  @PostMapping("")
  @ApiOperation(value="유저 생성", notes="유저를 생성한다")
  public ResponseEntity<UserDto.ResponseDto> createUser(@RequestBody UserDto.CreateRequestDto userRequestDto){
    logger.info("[createUser] Request Create User");
    UserDto.ResponseDto response = userService.createUser(userRequestDto);
    return ResponseEntity.status(HttpStatus.CREATED).body(response);
  }
}
