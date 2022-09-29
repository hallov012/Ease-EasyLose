package com.easylose.backend.api.v1.service;

import com.easylose.backend.api.v1.dto.MeasureLogDto.MeasureLogResponseDto;
import com.easylose.backend.api.v1.dto.WeightLogDto.WeightResponseDto;
import java.time.LocalDate;
import java.util.List;

public interface AnalysisService {

  List<WeightResponseDto> getWeightLog(Long id, LocalDate date);

  List<MeasureLogResponseDto> getMeasureLog(Long id, LocalDate start, LocalDate end);

  MeasureLogResponseDto createMeasureLog(Long id);

  WeightResponseDto createWeightLog(Long id);
}
