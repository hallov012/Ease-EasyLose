package com.easylose.backend.api.v1.repository;

import com.easylose.backend.api.v1.domain.FoodSet;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FoodSetRepository extends JpaRepository<FoodSet, Long> {

  List<FoodSet> findByUserId(Long userId);
}
