package com.easylose.backend.api.v1.repository;

import com.easylose.backend.api.v1.domain.Food;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface FoodRepository extends JpaRepository<Food, Long>, JpaSpecificationExecutor<Food> {

  List<Food> findByBarcode(String barcode);
}
