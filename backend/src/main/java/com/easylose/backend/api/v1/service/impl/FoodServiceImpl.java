package com.easylose.backend.api.v1.service.impl;

import com.easylose.backend.api.v1.domain.Food;
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

  public Collection<Food> getFood(Long id, String name, String barcode) {

    if (name != null) {
      return foodRepository.findByName(name);

    } else if (barcode != null) {
      return foodRepository.findByBarcode(barcode);
    }
    return null;
  }
}
