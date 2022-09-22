package com.easylose.backend.api.v1.service.impl;

import com.easylose.backend.api.v1.domain.DailyMealLog;
import com.easylose.backend.api.v1.domain.User;
import com.easylose.backend.api.v1.dto.DailyMealLogDto;
import com.easylose.backend.api.v1.mapper.DailyMealLogMapper;
import com.easylose.backend.api.v1.repository.DailyMealLogRepository;
import com.easylose.backend.api.v1.repository.UserRepository;
import com.easylose.backend.api.v1.repository.specification.DailyMealLogSpecification;
import com.easylose.backend.api.v1.service.DailyMealLogService;
import java.util.Collection;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DailyMealLogServiceImpl implements DailyMealLogService {

  public final DailyMealLogRepository dailyMealLogRepository;
  public final UserRepository userRepository;

  public final DailyMealLogMapper dailyMealLogMapper;

  public Collection getDailyMealAll(Long id, DailyMealLogDto.GetRequestDto getRequestDto) {

    String date = getRequestDto.getYear() + getRequestDto.getMonth() + getRequestDto.getDate();
    Specification<DailyMealLog> spec = (root, query, criteriaBuilder) -> null;
    User user = userRepository.getReferenceById(id);

    if (user != null && date != null) {
      spec = spec.and(DailyMealLogSpecification.equalUser(user));
      spec = spec.and(DailyMealLogSpecification.equalDate(date));
    }
    return dailyMealLogRepository.findAll(spec);
  }

  public DailyMealLogDto.ResponseDto createDailyMeal(
      Long id, DailyMealLogDto.RequestDto requestDto) {
    User user = userRepository.getReferenceById(id);
    requestDto.setUser(user);
    return dailyMealLogMapper.dailyMealLogToResponseDto(
        dailyMealLogRepository.save(requestDto.toEntity()));
  }

  public DailyMealLogDto.ResponseDto updateDailyMeal(
      Long id, Long dailyMeal_id, DailyMealLogDto.RequestDto requestDto) {
    User user = userRepository.findById(id).orElse(null);
    DailyMealLog dailyMealLog = dailyMealLogRepository.findById(dailyMeal_id).orElse(null);
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
