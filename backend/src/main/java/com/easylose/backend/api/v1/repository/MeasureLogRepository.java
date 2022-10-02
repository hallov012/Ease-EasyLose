package com.easylose.backend.api.v1.repository;

import com.easylose.backend.api.v1.domain.MeasureLog;
import com.easylose.backend.api.v1.domain.User;
import java.time.LocalDateTime;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface MeasureLogRepository
    extends JpaRepository<MeasureLog, Long>, JpaSpecificationExecutor<MeasureLog> {

  MeasureLog findTopByUserAndCreatedAtLessThanOrderByCreatedAtDesc(User user, LocalDateTime date);

  MeasureLog findTopByUserAndCreatedAtLessThanEqualOrderByCreatedAtDesc(
      User user, LocalDateTime date);

  MeasureLog findTopByUser(User user);
}
