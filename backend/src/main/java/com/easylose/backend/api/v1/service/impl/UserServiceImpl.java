package com.easylose.backend.api.v1.service.impl;

import com.easylose.backend.api.v1.domain.User;
import com.easylose.backend.api.v1.dto.UserDto;
import com.easylose.backend.api.v1.dto.UserDto.ResultDto;
import com.easylose.backend.api.v1.dto.UserDto.UserRequestDto;
import com.easylose.backend.api.v1.mapper.UserMapper;
import com.easylose.backend.api.v1.repository.UserRepository;
import com.easylose.backend.api.v1.service.AnalysisService;
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
  private final AnalysisService analysisService;

  public UserDto.UserResponseDto getUser(Long id) {
    return userMapper.userToResponseDto(userRepository.getReferenceById(id));
  }

  public UserDto.UserResponseDto updateUser(Long id, UserRequestDto requestDto) {
    User user = userRepository.getReferenceById(id);

    boolean measureLog = false;
    boolean weight = false;
    if (!user.getWeight().equals(requestDto.getWeight())) {
      weight = true;
    }
    if (user.getDailyCalorie() == null
        || user.getDailyCarb() == null
        || user.getDailyProtein() == null
        || user.getDailyFat() == null) {
      measureLog = true;
    } else if (!user.getDailyCalorie().equals(requestDto.getDailyCalorie())
        || !user.getDailyCarb().equals(requestDto.getDailyCarb())
        || !user.getDailyProtein().equals(requestDto.getDailyProtein())
        || !user.getDailyFat().equals(requestDto.getDailyFat())) {

      measureLog = true;
    }
    userMapper.updateUserFromRequestDto(requestDto, user);
    userRepository.save(user);
    if (requestDto.getIsAutomatic() == true) {
      BMI bmi = new BMI();
      ResultDto result = bmi.calculation(userMapper.userToAutoDto(user));
      userMapper.updateUserFromResultDto(result, user);
      userRepository.save(user);
      analysisService.createMeasureLog(id);
    } else if (measureLog == true) {
      analysisService.createMeasureLog(id);
    }

    if (weight == true) {
      analysisService.createWeightLog(id);
    }
    return userMapper.userToResponseDto(user);
  }

  public boolean deleteUser(Long id) {
    userRepository.deleteById(id);
    return true;
  }
}
