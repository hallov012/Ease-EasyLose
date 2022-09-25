package com.easylose.backend.api.v1.repository.specification;

import com.easylose.backend.api.v1.domain.DailyMealLog;
import java.time.LocalDate;
import org.springframework.data.jpa.domain.Specification;

public class DailyMealLogSpecification {

  public static Specification<DailyMealLog> equalUser(Long userId) {
    return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("userId"), userId);
  }

  public static Specification<DailyMealLog> equalDate(LocalDate date) {
    return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("date"), date);
  }
}
