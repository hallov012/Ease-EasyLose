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
    boolean nutrient = false;

    if (requestDto.getWeight() != null || requestDto.getHeight() != null) {
      if (user.getHeight() == null || user.getWeight() == null) {
        weightOrHeight = true;
      } else {
        if (Float.compare(user.getHeight(), requestDto.getHeight()) != 0
            || Float.compare(user.getWeight(), requestDto.getWeight()) != 0) {
          weightOrHeight = true;
        }
      }
    }

    if (requestDto.getDailyCalorie() != null
        || requestDto.getDailyCarb() != null
        || requestDto.getDailyProtein() != null
        || requestDto.getDailyFat() != null) {

      if (user.getDailyCalorie() == null
          || user.getDailyCarb() == null
          || user.getDailyProtein() == null
          || user.getDailyFat() == null) {
        nutrient = true;
      } else {
        if (Float.compare(user.getDailyCalorie(), requestDto.getDailyCalorie()) != 0
            || Float.compare(user.getDailyCarb(), requestDto.getDailyCarb()) != 0
            || Float.compare(user.getDailyProtein(), requestDto.getDailyProtein()) != 0
            || Float.compare(user.getDailyFat(), requestDto.getDailyFat()) != 0) nutrient = true;
      }
    }
    //    if (requestDto.getIsAutomatic() == true){
    //      // 영양소 자동 계산되는 로직 추가
    //      nutrient = true;
    //    }
    userMapper.updateUserFromRequestDto(requestDto, user);
    log.info("user: {}", user);
    userRepository.save(user);

    if (weightOrHeight == true) {
      log.info("Detached Measure Log Data Change");
      measureLogService.createMeasureLog(id);
    }

    if (nutrient == true) {
      measureLogService.createNutrientLog(id);
    }

    return userMapper.userToResponseDto(user);
  }

  public void deleteUser(Long id) {
    userRepository.deleteById(id);
  }
}
