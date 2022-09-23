package com.easylose.backend.api.v1.service.impl;

import com.easylose.backend.api.v1.domain.DailyMealLog;
import com.easylose.backend.api.v1.domain.User;
import com.easylose.backend.api.v1.dto.DailyMealLogDto;
import com.easylose.backend.api.v1.repository.DailyMealLogRepository;
import com.easylose.backend.api.v1.repository.UserRepository;
import com.easylose.backend.api.v1.repository.specification.DailyMealLogSpecification;
import com.easylose.backend.api.v1.service.DailyMealLogService;
import java.util.Collection;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

@Service
public class DailyMealLogServiceImpl implements DailyMealLogService {

  DailyMealLogRepository dailyMealLogRepository;
  UserRepository userRepository;

  @Autowired
  public DailyMealLogServiceImpl(
      DailyMealLogRepository dailyMealLogRepository, UserRepository userRepository) {
    this.dailyMealLogRepository = dailyMealLogRepository;
    this.userRepository = userRepository;
  }

  public Collection getDailyMealAll(Long id, DailyMealLogDto.GetRequestDto getRequestDto) {

    String date = getRequestDto.getYear() + getRequestDto.getMonth() + getRequestDto.getDate();
    Specification<DailyMealLog> spec = (root, query, criteriaBuilder) -> null;
    User user = userRepository.findById(id).orElse(null);

    if (user != null && date != null) {
      spec = spec.and(DailyMealLogSpecification.equalUser(user));
      spec = spec.and(DailyMealLogSpecification.equalDate(date));
    }
    return dailyMealLogRepository.findAll(spec);
  }

  public DailyMealLogDto.ResponseDto createDailyMeal(
      Long id, DailyMealLogDto.CreateAndUpdateRequestDto createRequestDto) {
    User user = userRepository.findById(id).orElse(null);
    DailyMealLog dailyMealLog = dailyMealLogRepository.save(createRequestDto.toEntity());
    return new DailyMealLogDto.ResponseDto(dailyMealLog); // 예외처리 해야할 듯
  }

  public DailyMealLogDto.ResponseDto updateDailyMeal(
      Long id, Long dailyMeal_id, DailyMealLogDto.CreateAndUpdateRequestDto updateRequestDto) {
    User user = userRepository.findById(id).orElse(null);
    DailyMealLog dailyMealLog = dailyMealLogRepository.findById(dailyMeal_id).orElse(null);
    if (user == dailyMealLog.getUser()) {
      dailyMealLog.update(updateRequestDto);
      dailyMealLogRepository.save(dailyMealLog);
    }
    return new DailyMealLogDto.ResponseDto(dailyMealLog);
  }

  public void deleteDailyMeal(Long id, Long dailyMeal_id) {
    User user = userRepository.findById(id).orElse(null);
    DailyMealLog dailyMealLog = dailyMealLogRepository.findById(dailyMeal_id).orElse(null);
    if (user == dailyMealLog.getUser()) {
      dailyMealLogRepository.deleteById(dailyMeal_id);
    }
  }
}
