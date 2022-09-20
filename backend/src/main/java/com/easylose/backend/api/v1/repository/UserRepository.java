package com.easylose.backend.api.v1.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.easylose.backend.api.v1.domain.User;

public interface UserRepository extends JpaRepository<User, Long> {

}
