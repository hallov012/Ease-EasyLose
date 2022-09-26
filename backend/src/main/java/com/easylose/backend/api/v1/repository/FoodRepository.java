package com.easylose.backend.api.v1.repository;

import com.easylose.backend.api.v1.domain.Food;
import java.util.Collection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface FoodRepository extends JpaRepository<Food, Long>, JpaSpecificationExecutor<Food> {
  Collection<Food> findByName(String name);

  Collection<Food> findByBarcode(String barcode);
}
