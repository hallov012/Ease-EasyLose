package com.easylose.backend.api.v1.mapper;

import com.easylose.backend.api.v1.domain.WeightLog;
import com.easylose.backend.api.v1.dto.WeightLogDto.WeightResponseDto;
import java.util.List;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface WeightLogMapper {

  WeightLogMapper INSTANCE = Mappers.getMapper(WeightLogMapper.class);

  WeightResponseDto toResponseDto(WeightLog weightLog);

  List<WeightResponseDto> toResponseDtoAll(List<WeightLog> weightLogs);
}
