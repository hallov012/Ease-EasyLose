package com.easylose.backend.api.v1.repository.specification;

import com.easylose.backend.api.v1.domain.Recommend;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Order;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import org.springframework.data.jpa.domain.Specification;

public class RecommendSpecification {
  public static Specification<Recommend> lessThanList(int carb, int protein, int fat) {
    return new Specification<Recommend>() {
      @Override
      public Predicate toPredicate(
          Root<Recommend> root, CriteriaQuery<?> query, CriteriaBuilder builder) {
        List<Order> orderList = new ArrayList();
        orderList.add(builder.desc(root.get("carb")));
        orderList.add(builder.desc(root.get("protein")));
        orderList.add(builder.desc(root.get("fat")));
        query.orderBy(orderList);

        return builder.and(
            builder.lessThanOrEqualTo(root.get("carb"), carb),
            builder.lessThanOrEqualTo(root.get("protein"), protein),
            builder.lessThanOrEqualTo(root.get("fat"), fat));
      }
    };
  }
}
