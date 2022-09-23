package com.easylose.backend.api.v1.repository;

import com.easylose.backend.api.v1.domain.Food;
import java.util.Collection;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FoodRepository extends JpaRepository<Food, Long> {
  Collection<Food> findByName(String name);

  Collection<Food> findByBarcode(String barcode);
}
