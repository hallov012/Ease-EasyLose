package com.easylose.backend.api.v1.service.impl;

import com.easylose.backend.api.v1.domain.User;
import com.easylose.backend.api.v1.dto.UserDto;
import com.easylose.backend.api.v1.mapper.UserMapper;
import com.easylose.backend.api.v1.repository.UserRepository;
import com.easylose.backend.api.v1.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@RequiredArgsConstructor
@Service
public class UserServiceImpl implements UserService {

  private final UserRepository userRepository;
  private final UserMapper userMapper;

  public UserDto.ResponseDto getUser(Long id) {
    return userMapper.userToResponseDto(userRepository.getReferenceById(id));
  }

  public UserDto.ResponseDto updateUser(Long id, UserDto.RequestDto requestDto) {
    User user = userRepository.getReferenceById(id);
    log.info("request: {}", requestDto);
    log.info("user: {}", user);
    userMapper.updateUserFromRequestDto(requestDto, user);
    log.info("user: {}", user);
    userRepository.save(user);
    return userMapper.userToResponseDto(user);
  }

  public void deleteUser(Long id) {
    userRepository.deleteById(id);
  }
}
