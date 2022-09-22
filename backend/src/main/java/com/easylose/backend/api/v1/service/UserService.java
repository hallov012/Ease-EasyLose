package com.easylose.backend.api.v1.service;

import com.easylose.backend.api.v1.dto.UserDto;

public interface UserService {

  UserDto.ResponseDto getUser(Long id);

  UserDto.ResponseDto updateUser(Long id, UserDto.RequestDto userRequestDto);

  void deleteUser(Long id);
}
