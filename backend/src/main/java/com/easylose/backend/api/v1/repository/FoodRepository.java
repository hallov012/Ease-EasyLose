package com.easylose.backend.api.v1.repository;

import com.easylose.backend.api.v1.domain.Food;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface FoodRepository extends JpaRepository<Food, Long>, JpaSpecificationExecutor<Food> {
  //  @Query(
  //      "SELECT distinct (w) FROM Food w WHERE (w.name Like % + name or w.name Like name + %)
  // ORDER BY LENGTH(w.name) Limit 20")
  //  List<Food> findAllByName(User user, String name);

  List<Food> findByBarcode(String barcode);
}
