package com.easylose.backend.api.v1.repository;

import com.easylose.backend.api.v1.domain.Recommend;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RecommendRepository extends JpaRepository<Recommend, Long> {

  List<Recommend> findAllByCarbAndProteinAndFat(int carb, int protein, int fat);
}
