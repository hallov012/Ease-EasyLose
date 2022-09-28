package com.easylose.backend.api.v1.service.impl;

import com.easylose.backend.api.v1.domain.User;
import com.easylose.backend.api.v1.dto.UserDto;
import com.easylose.backend.api.v1.dto.UserDto.ResultDto;
import com.easylose.backend.api.v1.dto.UserDto.UserRequestDto;
import com.easylose.backend.api.v1.mapper.UserMapper;
import com.easylose.backend.api.v1.repository.UserRepository;
import com.easylose.backend.api.v1.service.MeasureLogService;
import com.easylose.backend.api.v1.service.UserService;
import com.easylose.backend.util.BMI;
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

  public UserDto.UserResponseDto updateUser(Long id, UserRequestDto requestDto) {
    User user = userRepository.getReferenceById(id);
    boolean weightOrHeight = false;
    boolean nutrient = false;

    userMapper.updateUserFromRequestDto(requestDto, user);
    log.info("user: {}", user);
    userRepository.save(user);

    log.info("Detached Measure Log Data Change");
    measureLogService.createMeasureLog(id);
    if (requestDto.getIsAutomatic() == true) {
      BMI bmi = new BMI();
      ResultDto result = bmi.calculation(userMapper.userToAutoDto(user));
      userMapper.updateUserFromResultDto(result, user);
      userRepository.save(user);
    }

    //    measureLogService.createNutrientLog(id);

    return userMapper.userToResponseDto(user);
  }

  public boolean deleteUser(Long id) {
    userRepository.deleteById(id);

    return true;
  }
}
