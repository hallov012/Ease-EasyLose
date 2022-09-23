package com.easylose.backend.api.v1.service.impl;

import com.easylose.backend.api.v1.domain.Food;
import com.easylose.backend.api.v1.dto.FoodDto;
import com.easylose.backend.api.v1.repository.FoodRepository;
import com.easylose.backend.api.v1.service.FoodService;
import java.util.Collection;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@RequiredArgsConstructor
@Service
public class FoodServiceImpl implements FoodService {

  private final FoodRepository foodRepository;

  public Collection<Food> getFood(Long id, FoodDto.FoodRequestDto requestDto) {

    if (requestDto.getName() != null) {
      return foodRepository.findByName(requestDto.getName());

    } else if (requestDto.getBarcode() != null) {
      return foodRepository.findByBarcode(requestDto.getBarcode());
    }
    return null;
  }
}
