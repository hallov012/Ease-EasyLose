package com.easylose.backend.api.v1.service.impl;

import com.easylose.backend.api.v1.domain.User;
import com.easylose.backend.api.v1.dto.FoodSetDto;
import com.easylose.backend.api.v1.repository.FoodSetRepository;
import com.easylose.backend.api.v1.repository.UserRepository;
import com.easylose.backend.api.v1.service.FoodSetService;
import java.util.Collection;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@RequiredArgsConstructor
@Service
public class FoodSetServiceImpl implements FoodSetService {

  private final FoodSetRepository foodSetRepository;
  private final UserRepository userRepository;

  // 단순 이렇게 "식단"만 보내는 것은 의미 없음
  // 식단의 디테일까지 같이 보낼 수 있도록 설계해야 함

  public Collection<FoodSetDto.ResponseDto> getFoodSetAll(Long id) {
    User user = userRepository.getReferenceById(id);
    return foodSetRepository.findFoodSetByUser(user);
  }
}
