package com.easylose.backend.api.v1.repository.specification;

import com.easylose.backend.api.v1.domain.DailyMealLog;
import com.easylose.backend.api.v1.domain.User;
import org.springframework.data.jpa.domain.Specification;

public class DailyMealLogSpecification {

    public static Specification<DailyMealLog> equalUser(User user){
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("user"), user);
    }

    public static Specification<DailyMealLog> equalDate(String date){
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("date"), date);
    }
}
