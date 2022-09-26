package com.easylose.backend.api.v1.service.impl;

import com.easylose.backend.api.v1.domain.DailyMealLog;
import com.easylose.backend.api.v1.domain.Food;
import com.easylose.backend.api.v1.domain.User;
import com.easylose.backend.api.v1.dto.DailyMealLogDto;
import com.easylose.backend.api.v1.dto.DailyMealLogDto.DailyMealResponseDto;
import com.easylose.backend.api.v1.mapper.DailyMealLogMapper;
import com.easylose.backend.api.v1.repository.DailyMealLogRepository;
import com.easylose.backend.api.v1.repository.FoodRepository;
import com.easylose.backend.api.v1.repository.UserRepository;
import com.easylose.backend.api.v1.repository.specification.DailyMealLogSpecification;
import com.easylose.backend.api.v1.service.DailyMealLogService;
import java.time.LocalDate;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class DailyMealLogServiceImpl implements DailyMealLogService {

  public final DailyMealLogRepository dailyMealLogRepository;
  public final UserRepository userRepository;
  public final FoodRepository foodRepository;

  public final DailyMealLogMapper dailyMealLogMapper;

  public List<DailyMealResponseDto> getDailyMealAll(Long id, LocalDate date) {
    Specification<DailyMealLog> spec = (root, query, criteriaBuilder) -> null;
    User user = userRepository.getReferenceById(id);

    if (user != null && date != null) {
      spec = spec.and(DailyMealLogSpecification.equalUser(user));
      spec = spec.and(DailyMealLogSpecification.equalDate(date));
    }
    List response = dailyMealLogRepository.findAll(spec);
    return response;
  }

  public DailyMealResponseDto createDailyMeal(
      Long id, DailyMealLogDto.DailyMealRequestDto requestDto) {
    User user = userRepository.getReferenceById(id);
    Food food = foodRepository.getReferenceById(requestDto.getFoodId());

    if (user == null || food == null) {
      log.info("this is empty");
      return null;
    }
    if (user == food.getUser() || food.getUser() == null) {
      requestDto.setUser(user);
      requestDto.setFood(food);
      return dailyMealLogMapper.toDto(
          dailyMealLogRepository.save(dailyMealLogMapper.toEntity(requestDto)));
    }
    return null;
  }

  public DailyMealResponseDto updateDailyMeal(
      Long id, Long dailyMeal_id, DailyMealLogDto.DailyMealRequestDto requestDto) {
    User user = userRepository.getReferenceById(id);
    DailyMealLog dailyMealLog = dailyMealLogRepository.getReferenceById(dailyMeal_id);
    if (user == dailyMealLog.getUser()) {
      dailyMealLogMapper.updateDailyMealLogFromRequestDto(requestDto, dailyMealLog);
      dailyMealLogRepository.save(dailyMealLog);
    }
    return dailyMealLogMapper.dailyMealLogToResponseDto(dailyMealLog);
  }

  public void deleteDailyMeal(Long id, Long dailyMeal_id) {
    User user = userRepository.findById(id).orElse(null);
    DailyMealLog dailyMealLog = dailyMealLogRepository.findById(dailyMeal_id).orElse(null);
    if (user == dailyMealLog.getUser()) {
      dailyMealLogRepository.deleteById(dailyMeal_id);
    }
  }
}
