package com.easylose.backend.api.v1.service;

import java.time.LocalDate;
import java.util.List;

public interface MeasureLogService {

  List getMeasureLogAll(Long id, LocalDate start, LocalDate end);

  List getNutrientLogAll(Long id, LocalDate start, LocalDate end);

  void createMeasureLog(Long id);

  void createNutrientLog(Long id);
}
