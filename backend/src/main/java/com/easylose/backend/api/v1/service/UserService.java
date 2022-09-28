package com.easylose.backend.api.v1.service;

import com.easylose.backend.api.v1.dto.UserDto.UserRequestDto;
import com.easylose.backend.api.v1.dto.UserDto.UserResponseDto;

public interface UserService {

  UserResponseDto getUser(Long id);

  UserResponseDto updateUser(Long id, UserRequestDto userRequestDto);

  boolean deleteUser(Long id);
}
