package com.easylose.backend.api.v1.service;

import com.easylose.backend.api.v1.dto.FoodDto;
import java.util.Collection;

public interface FoodService {
  Collection getFood(Long id, FoodDto.RequestDto requesteDto);
}
