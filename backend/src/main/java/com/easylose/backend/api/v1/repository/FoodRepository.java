package com.easylose.backend.api.v1.repository;

import com.easylose.backend.api.v1.domain.Food;
import com.easylose.backend.api.v1.domain.User;
import java.util.List;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

public interface FoodRepository extends JpaRepository<Food, Long>, JpaSpecificationExecutor<Food> {

  List<Food> findByBarcode(String barcode);

  @Query(
      "SELECT f"
          + " FROM Food f"
          + " WHERE f.name LIKE %?1% AND (f.user = ?2 OR f.user = null)"
          + " GROUP BY f.name"
          + " ORDER BY LENGTH(f.name), f.name")
  List<Food> findDistinctFoodNameByUser(String name, User user, Pageable pageable);
}
