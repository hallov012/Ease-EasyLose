package com.easylose.backend.api.v1.mapper;

import com.easylose.backend.api.v1.domain.MeasureLog;
import com.easylose.backend.api.v1.dto.MeasureLogDto.MeasureLogFormDto;
import com.easylose.backend.api.v1.dto.MeasureLogDto.MeasureLogResponseDto;
import java.util.List;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface MeasureLogMapper {

  MeasureLogMapper INSTANCE = Mappers.getMapper(MeasureLogMapper.class);

  MeasureLog toEntity(final MeasureLogFormDto formDto);

  List<MeasureLogResponseDto> toResponseDtos(List<MeasureLog> measureLogs);

  MeasureLogResponseDto toResponseDto(MeasureLog measureLog);
  //  MeasureLog fromNutrientToEntity(final NutrientLogFormDto formDto);
}
