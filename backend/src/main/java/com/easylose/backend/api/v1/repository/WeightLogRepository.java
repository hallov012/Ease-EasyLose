package com.easylose.backend.api.v1.repository;

import com.easylose.backend.api.v1.domain.User;
import com.easylose.backend.api.v1.domain.WeightLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface WeightLogRepository
    extends JpaRepository<WeightLog, Long>, JpaSpecificationExecutor<WeightLog> {
  boolean deleteAllByUser(User user);
}
