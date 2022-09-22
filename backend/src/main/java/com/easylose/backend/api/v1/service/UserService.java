package com.easylose.backend.api.v1.service;

import com.easylose.backend.api.v1.dto.UserDto;
import java.util.Collection;

public interface UserService {

  UserDto.ResponseDto getUser(Long id);
  UserDto.ResponseDto createUser(UserDto.CreateRequestDto userRequestDto);

  UserDto.ResponseDto updateUser(Long id, UserDto.UpdateRequestDto userRequestDto);

  void deleteUser(Long id);
}
