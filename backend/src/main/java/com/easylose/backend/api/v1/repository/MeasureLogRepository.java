package com.easylose.backend.api.v1.repository;

import com.easylose.backend.api.v1.domain.MeasureLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface MeasureLogRepository
    extends JpaRepository<MeasureLog, Long>, JpaSpecificationExecutor<MeasureLog> {}
