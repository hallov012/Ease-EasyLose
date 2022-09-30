package com.easylose.backend.api.v1.service;

import com.easylose.backend.api.v1.dto.MeasureLogDto.AnalysisResponseDto;
import com.easylose.backend.api.v1.dto.MeasureLogDto.MeasureLogResponseDto;
import com.easylose.backend.api.v1.dto.WeightLogDto.WeightResponseDto;
import java.time.LocalDate;
import java.util.List;

public interface AnalysisService {

  List<WeightResponseDto> getWeightLog(Long id, LocalDate date);

  List<AnalysisResponseDto> getDailyChart(Long id, LocalDate date);

  MeasureLogResponseDto createMeasureLog(Long id);

  WeightResponseDto createWeightLog(Long id);
}
