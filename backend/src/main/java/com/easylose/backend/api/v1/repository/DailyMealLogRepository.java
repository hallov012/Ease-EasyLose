package com.easylose.backend.api.v1.repository;

import com.easylose.backend.api.v1.domain.DailyMealLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface DailyMealLogRepository  extends JpaRepository<DailyMealLog, Long>, JpaSpecificationExecutor<DailyMealLog> {

}
