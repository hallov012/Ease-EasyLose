package com.easylose.backend.api.v1.service.impl;

import com.easylose.backend.api.v1.domain.MeasureLog;
import com.easylose.backend.api.v1.domain.User;
import com.easylose.backend.api.v1.dto.MeasureLogDto;
import com.easylose.backend.api.v1.repository.MeasureLogRepository;
import com.easylose.backend.api.v1.repository.UserRepository;
import com.easylose.backend.api.v1.repository.specification.MeasureLogSpecification;
import com.easylose.backend.api.v1.service.MeasureLogService;
import java.util.Collection;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class MeasureLogServiceImpl implements MeasureLogService {

  private final MeasureLogRepository measureLogRepository;
  private final UserRepository userRepository;

  @Override
  public Collection getMeasureLogAll(Long id, MeasureLogDto.MeasureLogRequestDto requestDto) {
    User user = userRepository.getReferenceById(id);
    Specification<MeasureLog> spec = (root, query, builder) -> null;

    if (user != null) {
      spec = spec.and(MeasureLogSpecification.equalUser(user));
      spec = spec.and(MeasureLogSpecification.betweenDate(requestDto));
    }
    return measureLogRepository.findAll(spec);
  }
}
