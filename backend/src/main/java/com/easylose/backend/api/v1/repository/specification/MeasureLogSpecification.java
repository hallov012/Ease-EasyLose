package com.easylose.backend.api.v1.repository.specification;

import com.easylose.backend.api.v1.domain.MeasureLog;
import com.easylose.backend.api.v1.domain.User;
import com.easylose.backend.api.v1.dto.MeasureLogDto;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

public class MeasureLogSpecification {

  public static Specification<MeasureLog> equalUser(User user) {
    return (root, query, builder) -> builder.equal(root.get("user"), user);
  }

  public static Specification<MeasureLog> betweenDate(
      MeasureLogDto.MeasureLogRequestDto requestDto) {
    // 시작 데이터만 있을 경우
    return (root, query, builder) -> {
      DateTimeFormatter format = DateTimeFormatter.ofPattern("yyyyMMdd");

      LocalDateTime start = LocalDateTime.parse(requestDto.getStartDate(), format);
      LocalDateTime end = LocalDateTime.parse(requestDto.getEndDate(), format);

      List records = new ArrayList<>();

      if (start != null && end == null) {
        records.add(builder.greaterThanOrEqualTo(root.get("createdAt"), start));
      } else if (start != null && end != null) {
        records.add(builder.between(root.get("createdAt"), start, end));
      }
      return builder.and((Predicate) records);
    };
  }
}
