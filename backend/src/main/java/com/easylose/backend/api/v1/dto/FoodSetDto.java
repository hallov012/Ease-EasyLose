package com.easylose.backend.api.v1.dto;

import com.easylose.backend.api.v1.domain.User;
import com.easylose.backend.api.v1.enums.MealType;
import lombok.Getter;

import javax.persistence.*;

@Getter
public class FoodSetDto {

    private Long id;
    private MealType mealType;
    private User user;
}
