package com.easylose.backend.api.v1.repository;

import com.easylose.backend.api.v1.domain.DailyMealLog;
import com.easylose.backend.api.v1.domain.Food;
import com.easylose.backend.api.v1.domain.User;
import java.time.LocalDate;
import java.util.List;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

public interface DailyMealLogRepository
    extends JpaRepository<DailyMealLog, Long>, JpaSpecificationExecutor<DailyMealLog> {
  @Query("SELECT DISTINCT d.food FROM DailyMealLog d WHERE d.user = ?1")
  List<Food> findDistinctFoodByUser(User user, Pageable pageable);

  List<DailyMealLog> findByDateBetween(LocalDate start, LocalDate end);

  List<DailyMealLog> findAllByDate(LocalDate date);

  boolean deleteAllByUser(User user);
}
