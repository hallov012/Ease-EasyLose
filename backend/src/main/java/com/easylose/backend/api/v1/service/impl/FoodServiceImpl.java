package com.easylose.backend.api.v1.service.impl;

import com.easylose.backend.api.v1.domain.Food;
import com.easylose.backend.api.v1.domain.User;
import com.easylose.backend.api.v1.dto.FoodDto.FoodResponseDto;
import com.easylose.backend.api.v1.dto.FoodDto.FoodUserDto;
import com.easylose.backend.api.v1.mapper.FoodMapper;
import com.easylose.backend.api.v1.repository.FoodRepository;
import com.easylose.backend.api.v1.repository.UserRepository;
import com.easylose.backend.api.v1.repository.specification.FoodSpecification;
import com.easylose.backend.api.v1.service.FoodService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

@Slf4j
@RequiredArgsConstructor
@Service
public class FoodServiceImpl implements FoodService {

  private final FoodRepository foodRepository;
  private final UserRepository userRepository;
  private final FoodMapper foodMapper;

  public List<FoodResponseDto> getFood(Long id, String name, String barcode) {
    User user = userRepository.getReferenceById(id);
    Specification<Food> spec = (root, query, builder) -> null;
    if (name == null && barcode == null) {
      return null;
    }
    if (name != null) {
      spec = spec.and(FoodSpecification.containName(name, user));
      //      spec = spec.and(FoodSpecification.myFoodUser(user));
    } else if (barcode != null) {
      spec = spec.and(FoodSpecification.equalBarcode(barcode));
      spec = spec.and(FoodSpecification.myFoodUser(user));
    }
    Pageable limit = PageRequest.of(0, 10);
    List<FoodResponseDto> response =
        foodMapper.toDtoAll(foodRepository.findAll(spec, limit).toList());
    log.info("response for food : {}", response);

    return response;
  }

  public FoodResponseDto createFood(Long id, FoodUserDto dto) {
    User user = userRepository.getReferenceById(id);
    dto.setUser(user);
    return foodMapper.toDto(foodRepository.save(foodMapper.toEntity(dto)));
  }

  @Override
  public FoodResponseDto updateFood(Long id, Long food_id, FoodUserDto dto) {
    User user = userRepository.getReferenceById(id);
    Food food = foodRepository.getReferenceById(food_id);
    if (user == food.getUser()) {
      foodMapper.updateFoodFromDto(dto, food);
    }
    return foodMapper.toDto(foodRepository.save(food));
  }

  @Override
  public void deleteFood(Long id, Long food_id) {
    User user = userRepository.getReferenceById(id);
    Food food = foodRepository.getReferenceById(food_id);
    if (user == food.getUser()) {
      foodRepository.deleteById(food_id);
    }
  }
}
