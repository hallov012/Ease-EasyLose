package com.easylose.backend.api.v1.repository.specification;

import com.easylose.backend.api.v1.domain.DailyMealLog;
import com.easylose.backend.api.v1.domain.User;
import java.time.LocalDate;
import org.springframework.data.jpa.domain.Specification;

public class DailyMealLogSpecification {

  private DailyMealLog dailyMealLogFilter;

  public static Specification<DailyMealLog> equalUserAndDate(User user, LocalDate date) {
    return (root, query, criteriaBuilder) ->
        criteriaBuilder.and(
            criteriaBuilder.equal(root.get("user"), user),
            criteriaBuilder.equal(root.get("date"), date));
  }
}
