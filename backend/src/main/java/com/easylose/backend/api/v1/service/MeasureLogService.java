package com.easylose.backend.api.v1.service;

import java.util.List;

public interface MeasureLogService {
  List getAll();

  List getMeasureLogAll(Long id, String start, String end);

  void createMeasureLog(Long id);
}
