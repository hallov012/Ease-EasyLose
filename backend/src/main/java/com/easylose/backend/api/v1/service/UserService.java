package com.easylose.backend.api.v1.service;

import java.util.Collection;

import com.easylose.backend.api.v1.dto.UserDto;

public interface UserService {
    Collection<UserDto> getUserAll();

    UserDto.ResponseDto createUser(UserDto.CreateRequestDto userRequestDto);
    UserDto.ResponseDto getUser(Long id);
    UserDto.ResponseDto updateUser(Long id, UserDto.UpdateRequestDto userRequestDto);
    void deleteUser(Long id);
}
