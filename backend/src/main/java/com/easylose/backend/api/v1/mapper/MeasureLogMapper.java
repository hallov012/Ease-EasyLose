package com.easylose.backend.api.v1.mapper;

import com.easylose.backend.api.v1.domain.DailyMealLog;
import com.easylose.backend.api.v1.domain.MeasureLog;
import com.easylose.backend.api.v1.dto.MeasureLogDto.AnalysisResponseDto;
import com.easylose.backend.api.v1.dto.MeasureLogDto.MeasureLogResponseDto;
import java.time.LocalDate;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
@RequiredArgsConstructor
public abstract class MeasureLogMapper {

  public abstract MeasureLogResponseDto toResponseDto(MeasureLog measureLog);

  public abstract List<MeasureLogResponseDto> toResponseDtoAll(List<MeasureLog> measureLogs);

  public AnalysisResponseDto toAnalysisDto(
      List<DailyMealLog> dailyMealLogs, LocalDate date, MeasureLogResponseDto total) {
    AnalysisResponseDto responseDto =
        AnalysisResponseDto.builder()
            .calorie(total.getDailyCalorie())
            .carb(total.getDailyCarb())
            .protein(total.getDailyProtein())
            .fat(total.getDailyFat())
            .dailyCalorie(0)
            .dailyCarb(0)
            .dailyProtein(0)
            .dailyFat(0)
            .date(date)
            .build();
    if (dailyMealLogs.isEmpty()) {
      return responseDto;
    }

    int dailyCalorie = 0;
    int dailyCarb = 0;
    int dailyProtein = 0;
    int dailyFat = 0;
    for (DailyMealLog dailyMealLog : dailyMealLogs) {
      dailyCalorie += dailyMealLog.getFood().getCalorie() * dailyMealLog.getCount();
      dailyCarb += dailyMealLog.getFood().getCarb() * dailyMealLog.getCount();
      dailyProtein += dailyMealLog.getFood().getProtein() * dailyMealLog.getCount();
      dailyFat += dailyMealLog.getFood().getFat() * dailyMealLog.getCount();
    }

    responseDto.setDailyCalorie(dailyCalorie);
    responseDto.setDailyCarb(dailyCarb);
    responseDto.setDailyProtein(dailyProtein);
    responseDto.setDailyFat(dailyFat);

    return responseDto;
  }
}
