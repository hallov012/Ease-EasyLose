package com.easylose.backend.api.v1.mapper;

import com.easylose.backend.api.v1.domain.MeasureLog;
import com.easylose.backend.api.v1.dto.MeasureLogDto.MeasureLogResponseDto;
import java.util.List;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public abstract class MeasureLogMapper {

  public abstract MeasureLogResponseDto toResponseDto(MeasureLog measureLog);

  public abstract List<MeasureLogResponseDto> toResponseDtoAll(List<MeasureLog> measureLogs);

  //  public List<AnalysisResponseDto> toAnalysisDtoAll(List<DailyMealLog> dailyMealLogs)
}
