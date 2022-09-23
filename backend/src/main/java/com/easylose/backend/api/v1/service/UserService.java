package com.easylose.backend.api.v1.service;

import com.easylose.backend.api.v1.dto.UserDto;

public interface UserService {

  UserDto.UserResponseDto getUser(Long id);

  UserDto.UserResponseDto updateUser(Long id, UserDto.UserRequestDto userRequestDto);

  void deleteUser(Long id);
}
