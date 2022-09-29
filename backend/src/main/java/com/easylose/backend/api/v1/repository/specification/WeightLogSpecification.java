package com.easylose.backend.api.v1.repository.specification;

import com.easylose.backend.api.v1.domain.User;
import com.easylose.backend.api.v1.domain.WeightLog;
import java.time.LocalDateTime;
import org.springframework.data.jpa.domain.Specification;

public class WeightLogSpecification {
  public static Specification<WeightLog> equalUserAndDate(User user, LocalDateTime dateTime) {
    return (root, query, builder) ->
        builder.and(
            builder.equal(root.get("user"), user),
            builder.between(root.get("createdAt"), user.getCreatedAt(), dateTime));
  }
}
