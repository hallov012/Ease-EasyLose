package com.easylose.backend.api.v1.service;

import com.easylose.backend.api.v1.dto.MeasureLogDto.MeasureLogResponseDto;
import java.time.LocalDate;
import java.util.List;

public interface MeasureLogService {

  List<MeasureLogResponseDto> getMeasureLogAll(Long id, LocalDate start, LocalDate end);

  //  List getNutrientLogAll(Long id, LocalDate start, LocalDate end);

  MeasureLogResponseDto createMeasureLog(Long id);

  //  void createNutrientLog(Long id);
}
