package com.easylose.backend.api.v1.dto;

import com.easylose.backend.api.v1.domain.Food;
import com.easylose.backend.api.v1.domain.User;
import com.easylose.backend.api.v1.enums.MealType;
import lombok.Getter;

import javax.persistence.*;

@Getter
public class DailyMealLogDto {

    private Long id;
    private String date;
    private MealType mealType;
    private Float count;
    private User user;
    private Food food;
}
