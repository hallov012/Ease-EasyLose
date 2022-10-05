package com.easylose.backend.api.v1.service.impl;

import com.easylose.backend.api.v1.domain.FoodSet;
import com.easylose.backend.api.v1.domain.User;
import com.easylose.backend.api.v1.dto.FoodSetDto.FoodSetResponseDto;
import com.easylose.backend.api.v1.dto.RecommendDto.RecommendResponseDto;
import com.easylose.backend.api.v1.mapper.FoodSetMapper;
import com.easylose.backend.api.v1.mapper.RecommendMapper;
import com.easylose.backend.api.v1.repository.FoodSetRepository;
import com.easylose.backend.api.v1.repository.UserRepository;
import com.easylose.backend.api.v1.service.RecommendService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class RecommendServiceImpl implements RecommendService {

  private final UserRepository userRepository;
  private final FoodSetRepository foodSetRepository;
  private final FoodSetMapper foodSetMapper;
  private final RecommendMapper recommendMapper;

  @Override
  public List<RecommendResponseDto> getRecommend(Long id, Long foodset_id) {
    User user = userRepository.getReferenceById(id);
    FoodSet foodSet = foodSetRepository.getReferenceById(foodset_id);
    if (!foodSet.getUser().equals(user)) {
      return null;
    }
    FoodSetResponseDto dto = foodSetMapper.foodSetToDto(foodSet);
    return recommendMapper.fromFoodSetToDto(user, dto);
  }
}
