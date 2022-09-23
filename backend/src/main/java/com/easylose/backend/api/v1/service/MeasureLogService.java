package com.easylose.backend.api.v1.service;

import com.easylose.backend.api.v1.dto.MeasureLogDto;
import java.util.Collection;

public interface MeasureLogService {
  Collection<MeasureLogDto.ResponseDto> getMeasureLogAll(
      Long id, MeasureLogDto.RequestDto requestDto);
}
