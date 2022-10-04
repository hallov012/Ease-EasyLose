package com.easylose.backend.api.v1.repository.specification;

import com.easylose.backend.api.v1.domain.Food;
import com.easylose.backend.api.v1.domain.User;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import org.springframework.data.jpa.domain.Specification;

public class FoodSpecification {
  public static Specification<Food> containName(String name, User user) {
    return new Specification<Food>() {
      @Override
      public Predicate toPredicate(
          Root<Food> root, CriteriaQuery<?> query, CriteriaBuilder builder) {
        query.distinct(true);
        return builder.and(
            builder.or(builder.equal(root.get("user"), user), builder.isNull(root.get("user"))),
            builder.or(
                builder.like(root.get("name"), "%" + name),
                builder.like(root.get("name"), name + "%")));
      }
    };
  }

  public static Specification<Food> equalBarcode(String code, User user) {
    return (root, query, builder) ->
        builder.and(
            builder.equal(root.get("barcode"), code),
            builder.or(builder.equal(root.get("user"), user), builder.isNull(root.get("user"))));
  }
}
