package com.easylose.backend.api.v1.mapper;

import static java.util.Collections.*;

import com.easylose.backend.api.v1.domain.WeightLog;
import com.easylose.backend.api.v1.dto.WeightLogDto.WeightResponseDto;
import java.util.ArrayList;
import java.util.List;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public abstract class WeightLogMapper {

  public abstract WeightResponseDto toResponseDto(WeightLog weightLog);

  public List<WeightResponseDto> toResponseDtoAll(List<WeightLog> weightLogs) {

    List<WeightResponseDto> list = new ArrayList<WeightResponseDto>();

    for (int i = weightLogs.size() - 1; i >= 0; i--) {
      WeightLog weightLog = weightLogs.get(i);
      int a = list.size() - 1;
      if (list.isEmpty()
          || !list.get(a)
              .getCreatedAt()
              .toLocalDate()
              .isEqual(weightLog.getCreatedAt().toLocalDate())) {
        WeightResponseDto dto =
            WeightResponseDto.builder()
                .weight(weightLog.getWeight())
                .id(weightLog.getId())
                .createdAt(weightLog.getCreatedAt())
                .build();
        list.add(dto);
      }
    }
    List<WeightResponseDto> response = new ArrayList<WeightResponseDto>();
    for (int i = list.size() - 1; i >= 0; i--) {
      response.add(list.get(i));
    }

    return response;
  }
}
