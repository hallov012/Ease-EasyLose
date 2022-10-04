package com.easylose.backend.api.v1.service.impl;

import com.easylose.backend.api.v1.domain.Food;
import com.easylose.backend.api.v1.domain.User;
import com.easylose.backend.api.v1.dto.FoodDto.FoodBarCodeDto;
import com.easylose.backend.api.v1.dto.FoodDto.FoodResponseDto;
import com.easylose.backend.api.v1.dto.FoodDto.FoodUserDto;
import com.easylose.backend.api.v1.mapper.FoodMapper;
import com.easylose.backend.api.v1.repository.DailyMealLogRepository;
import com.easylose.backend.api.v1.repository.FoodRepository;
import com.easylose.backend.api.v1.repository.UserRepository;
import com.easylose.backend.api.v1.repository.specification.FoodSpecification;
import com.easylose.backend.api.v1.service.FoodService;
import com.easylose.backend.util.BarCodeSearch;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

@Slf4j
@RequiredArgsConstructor
@Service
public class FoodServiceImpl implements FoodService {

  private final FoodRepository foodRepository;
  private final UserRepository userRepository;
  private final DailyMealLogRepository dailyMealLogRepository;
  private final FoodMapper foodMapper;
  private final BarCodeSearch barCodeSearch;

  public List<FoodResponseDto> getFoodByName(Long id, String name) {
    User user = userRepository.getReferenceById(id);
    Specification<Food> spec = (root, query, builder) -> null;
    if (name == null) {
      return null;
    }
    spec = spec.and(FoodSpecification.containName(name, user));
    Pageable limit = PageRequest.of(0, 20);
    List<FoodResponseDto> response =
        foodMapper.toDtoAll(foodRepository.findAll(spec, limit).toList());
    //    List<FoodResponseDto> response = foodMapper.toDtoAll(foodRepository.findAllByName(user,
    // name));
    log.info("response for food : {}", response);

    return response;
  }

  public List<FoodResponseDto> getFoodByBarcode(Long id, String barcode) {
    User user = userRepository.getReferenceById(id);
    Specification<Food> spec = (root, query, builder) -> null;
    Pageable limit = PageRequest.of(0, 1, Direction.ASC, "name");

    if (barcode == null) {
      return null;
    }
    spec = spec.and(FoodSpecification.equalBarcode(barcode, user));
    List<FoodResponseDto> dtoList =
        foodMapper.toDtoAll(foodRepository.findAll(spec, limit).toList());
    List<FoodResponseDto> response = new ArrayList<FoodResponseDto>();

    if (dtoList.isEmpty()) {
      String name = barCodeSearch.search(barcode);
      if (name != null) {
        Specification<Food> newSpec = (root, query, builder) -> null;
        newSpec = newSpec.and(FoodSpecification.containName(name, user));
        FoodBarCodeDto barCodeDto = FoodBarCodeDto.builder().barcode(barcode).build();
        log.info("barcode dto :{}", barCodeDto);
        List<Food> foodList = foodRepository.findAll(newSpec, limit).toList();
        if (!foodList.isEmpty()) {
          Food food = foodList.get(0);
          foodMapper.updateFoodFromBarCodeDto(barCodeDto, food);
          response.add(foodMapper.toDto(foodRepository.save(food)));
        }
      }
    } else {
      FoodResponseDto foodResponseDto = dtoList.get(0);
      response.add(foodResponseDto);
      log.info("barcode already exist");
    }
    return response;
  }

  public List<FoodResponseDto> getRecentFood(Long id) {
    User user = userRepository.getReferenceById(id);
    Pageable pageRequest = PageRequest.of(0, 20, Sort.Direction.DESC, "createdAt");
    List<Food> foods = dailyMealLogRepository.findDistinctFoodByUser(user, pageRequest);
    List<FoodResponseDto> foodDto = foodMapper.toDtoAll(foods);

    log.info("{}", foodDto.toString());

    return foodDto;
  }

  public FoodResponseDto createFood(Long id, FoodUserDto dto) {
    User user = userRepository.getReferenceById(id);
    Food food = Food.builder().user(user).build();

    foodMapper.updateFoodFromDto(dto, food);
    foodRepository.save(food);

    return foodMapper.toDto(food);
  }

  public FoodResponseDto updateFood(Long id, Long food_id, FoodUserDto dto) {
    User user = userRepository.getReferenceById(id);
    Food food = foodRepository.getReferenceById(food_id);
    if (user != food.getUser()) {
      return null;
    }

    foodMapper.updateFoodFromDto(dto, food);
    foodRepository.save(food);

    return foodMapper.toDto(food);
  }

  public boolean deleteFood(Long id, Long food_id) {
    User user = userRepository.getReferenceById(id);
    Food food = foodRepository.getReferenceById(food_id);

    if (user != food.getUser()) {
      return false;
    }

    foodRepository.delete(food);

    return true;
  }
}
