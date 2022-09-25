package com.easylose.backend.api.v1.repository.specification;

import com.easylose.backend.api.v1.domain.MeasureLog;
import java.time.LocalDateTime;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.jpa.domain.Specification;

@Slf4j
public class MeasureLogSpecification {

  public static Specification<MeasureLog> equalUser(Long id) {
    return (root, query, builder) -> builder.equal(root.get("userId"), id);
  }

  public static Specification<MeasureLog> betweenDate(
      LocalDateTime startDate, LocalDateTime endDate) {
    // 시작 데이터만 있을 경우
    return (root, query, builder) -> {
      log.info("{} {} {}", startDate, endDate, root.get("createdAt"));
      return builder.between(root.get("createdAt"), startDate, endDate);
    };
  }
}
