package com.easylose.backend.api.v1.service.impl;

import com.easylose.backend.api.v1.domain.User;
import com.easylose.backend.api.v1.dto.UserDto;
import com.easylose.backend.api.v1.mapper.UserMapper;
import com.easylose.backend.api.v1.repository.UserRepository;
import com.easylose.backend.api.v1.service.MeasureLogService;
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
  private final MeasureLogService measureLogService;

  public UserDto.UserResponseDto getUser(Long id) {
    return userMapper.userToResponseDto(userRepository.getReferenceById(id));
  }

  public UserDto.UserResponseDto updateUser(Long id, UserDto.UserRequestDto requestDto) {
    User user = userRepository.getReferenceById(id);
    //    log.info("request: {} {}", requestDto.getHeight(), requestDto.getWeight());
    //    log.info("user: {} {}", user.getHeight(), user.getWeight());
    boolean weightOrHeight = false;

    if (user.getHeight() == null && user.getWeight() == null) {
      weightOrHeight = true;
    } else if (user.getHeight() != null && user.getWeight() != null) {
      if (Float.compare(user.getHeight(), requestDto.getHeight()) != 0
          || Float.compare(user.getWeight(), requestDto.getWeight()) != 0) {
        weightOrHeight = true;
      }
    }

    userMapper.updateUserFromRequestDto(requestDto, user);
    log.info("user: {}", user);
    userRepository.save(user);

    if (weightOrHeight == true) {
      log.info("Detached Measure Log Data Change");
      measureLogService.createMeasureLog(id);
    }

    return userMapper.userToResponseDto(user);
  }

  public void deleteUser(Long id) {
    userRepository.deleteById(id);
  }
}
