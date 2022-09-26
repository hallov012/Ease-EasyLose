package com.easylose.backend.api.v1.repository;

import com.easylose.backend.api.v1.domain.FoodSet;
import com.easylose.backend.api.v1.domain.User;
import com.easylose.backend.api.v1.dto.FoodSetDto;
import java.util.Collection;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FoodSetRepository extends JpaRepository<FoodSet, Long> {

  Collection<FoodSetDto.FoodSetResponseDto> findFoodSetByUser(User user);
}
