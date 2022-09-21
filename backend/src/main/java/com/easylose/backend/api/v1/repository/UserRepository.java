package com.easylose.backend.api.v1.repository;

import com.easylose.backend.api.v1.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {}
