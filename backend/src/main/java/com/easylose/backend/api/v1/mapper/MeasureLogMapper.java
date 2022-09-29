package com.easylose.backend.api.v1.mapper;

import com.easylose.backend.api.v1.domain.MeasureLog;
import com.easylose.backend.api.v1.dto.MeasureLogDto.MeasureLogResponseDto;
import java.util.List;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface MeasureLogMapper {

  MeasureLogMapper INSTANCE = Mappers.getMapper(MeasureLogMapper.class);

  MeasureLogResponseDto toResponseDto(MeasureLog measureLog);

  List<MeasureLogResponseDto> toResponseDtoAll(List<MeasureLog> measureLogs);
  //  MeasureLog fromNutrientToEntity(final NutrientLogFormDto formDto);

}
