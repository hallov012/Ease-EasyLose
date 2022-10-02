package com.easylose.backend.api.v1.service.impl;

import com.easylose.backend.api.v1.domain.MeasureLog;
import com.easylose.backend.api.v1.domain.User;
import com.easylose.backend.api.v1.domain.WeightLog;
import com.easylose.backend.api.v1.dto.MeasureLogDto.AnalysisResponseDto;
import com.easylose.backend.api.v1.dto.MeasureLogDto.MeasureLogResponseDto;
import com.easylose.backend.api.v1.dto.WeightLogDto.WeightResponseDto;
import com.easylose.backend.api.v1.mapper.DailyMealLogMapper;
import com.easylose.backend.api.v1.mapper.MeasureLogMapper;
import com.easylose.backend.api.v1.mapper.WeightLogMapper;
import com.easylose.backend.api.v1.repository.DailyMealLogRepository;
import com.easylose.backend.api.v1.repository.MeasureLogRepository;
import com.easylose.backend.api.v1.repository.UserRepository;
import com.easylose.backend.api.v1.repository.WeightLogRepository;
import com.easylose.backend.api.v1.repository.specification.WeightLogSpecification;
import com.easylose.backend.api.v1.service.AnalysisService;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class AnalysisServiceImpl implements AnalysisService {

  private final MeasureLogRepository measureLogRepository;
  private final UserRepository userRepository;

  private final DailyMealLogRepository dailyMealLogRepository;
  private final WeightLogRepository weightLogRepository;
  private final MeasureLogMapper measureLogMapper;
  private final WeightLogMapper weightLogMapper;
  private final DailyMealLogMapper dailyMealLogMapper;

  public List<WeightResponseDto> getWeightLog(Long id, LocalDate date) {
    User user = userRepository.getReferenceById(id);

    Specification<WeightLog> spec = (root, query, builder) -> null;
    LocalDateTime dateTime = date.atTime(23, 59, 59);
    if (user != null) {
      spec = spec.and(WeightLogSpecification.equalUserAndDate(user, dateTime));
      return weightLogMapper.toResponseDtoAll(weightLogRepository.findAll(spec));
    }
    return null;
  }

  @Override
  public List<AnalysisResponseDto> getDailyChart(Long id, LocalDate date) {
    User user = userRepository.getReferenceById(id);
    List<AnalysisResponseDto> response = new ArrayList<AnalysisResponseDto>();
    for (int i = 6; i >= 0; i--) {
      LocalDate start = date.minusDays(i);
      LocalDateTime dateTime = start.atTime(23, 59, 59);
      if (user.getCreatedAt().isAfter(start.atStartOfDay())) {
        dateTime = user.getCreatedAt().plusHours(1);
      }
      log.info("datetime : {}", dateTime);

      MeasureLogResponseDto totalDto =
          measureLogMapper.toResponseDto(
              measureLogRepository.findTopByUserAndCreatedAtLessThanEqualOrderByCreatedAtDesc(
                  user, dateTime));
      response.add(
          measureLogMapper.toAnalysisDto(
              dailyMealLogRepository.findAllByDate(start), start, totalDto));
    }
    return response;
  }

  public MeasureLogResponseDto createMeasureLog(Long id) {
    User user = userRepository.getReferenceById(id);
    MeasureLog measureLog =
        MeasureLog.builder()
            .user(user)
            .dailyCalorie(user.getDailyCalorie())
            .dailyCarb(user.getDailyCarb())
            .dailyFat(user.getDailyFat())
            .dailyProtein(user.getDailyProtein())
            .build();
    return measureLogMapper.toResponseDto(measureLogRepository.save(measureLog));
  }

  public WeightResponseDto createWeightLog(Long id) {
    User user = userRepository.getReferenceById(id);
    WeightLog weightLog = WeightLog.builder().weight(user.getWeight()).user(user).build();
    return weightLogMapper.toResponseDto(weightLogRepository.save(weightLog));
  }
}
