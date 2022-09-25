package com.easylose.backend.api.v1.service.impl;

import com.easylose.backend.api.v1.domain.DailyMealLog;
import com.easylose.backend.api.v1.domain.User;
import com.easylose.backend.api.v1.dto.DailyMealLogDto;
import com.easylose.backend.api.v1.mapper.DailyMealLogMapper;
import com.easylose.backend.api.v1.repository.DailyMealLogRepository;
import com.easylose.backend.api.v1.repository.UserRepository;
import com.easylose.backend.api.v1.repository.specification.DailyMealLogSpecification;
import com.easylose.backend.api.v1.service.DailyMealLogService;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
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

  public Collection getDailyMealAll(Long id, String year, String month, String day) {
    DateTimeFormatter formatDate = DateTimeFormatter.ofPattern("yyyyMMdd");
    DateTimeFormatter formatMonth = DateTimeFormatter.ofPattern("yyyyMM");
    DateTimeFormatter formatYear = DateTimeFormatter.ofPattern("yyyy");

    LocalDate date = null;

    if (year != null && month != null && day != null) {
      date = LocalDate.parse(year + month + day, formatDate);
    } else if (day == null && month != null && year != null) {
      date = LocalDate.parse(year + month, formatMonth);
    } else if (month == null && year != null) {
      date = LocalDate.parse(year, formatYear);
    } else {
      date = LocalDate.now();
    }
    Specification<DailyMealLog> spec = (root, query, criteriaBuilder) -> null;
    User user = userRepository.getReferenceById(id);

    if (user != null && date != null) {
      spec = spec.and(DailyMealLogSpecification.equalUser(id));
      spec = spec.and(DailyMealLogSpecification.equalDate(date));
    }
    return dailyMealLogRepository.findAll(spec);
  }

  public DailyMealLogDto.DailyMealResponseDto createDailyMeal(
      Long id, DailyMealLogDto.DailyMealRequestDto requestDto) {
    User user = userRepository.getReferenceById(id);

    if (user == null) {
      return null;
    }
    return dailyMealLogMapper.toDto(
        dailyMealLogRepository.save(dailyMealLogMapper.toEntity(requestDto)));
  }

  public DailyMealLogDto.DailyMealResponseDto updateDailyMeal(
      Long id, Long dailyMeal_id, DailyMealLogDto.DailyMealRequestDto requestDto) {
    User user = userRepository.findById(id).orElse(null);
    DailyMealLog dailyMealLog = dailyMealLogRepository.findById(dailyMeal_id).orElse(null);
    if (user.getId() == dailyMealLog.getUserId()) {
      dailyMealLogMapper.updateDailyMealLogFromRequestDto(requestDto, dailyMealLog);
      dailyMealLogRepository.save(dailyMealLog);
    }
    return dailyMealLogMapper.dailyMealLogToResponseDto(dailyMealLog);
  }

  public void deleteDailyMeal(Long id, Long dailyMeal_id) {
    User user = userRepository.findById(id).orElse(null);
    DailyMealLog dailyMealLog = dailyMealLogRepository.findById(dailyMeal_id).orElse(null);
    if (user.getId() == dailyMealLog.getUserId()) {
      dailyMealLogRepository.deleteById(dailyMeal_id);
    }
  }
}
