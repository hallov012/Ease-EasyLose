package com.easylose.backend.api.v1.domain;


import com.easylose.backend.api.v1.enums.MealType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name="dailymeal_log")
public class DailyMealLog {

    @Id
    @GeneratedValue
    private Long id;

    @Column(nullable = false)
    private String date;

    @Column(nullable = false)
    private MealType mealType;

    @Column(nullable = false)
    private Float count;

    @ManyToOne(cascade = CascadeType.PERSIST, fetch = FetchType.LAZY)
    @JoinColumn(name="user_id")
    private User user;

    @ManyToOne(cascade = CascadeType.PERSIST, fetch = FetchType.LAZY)
    @JoinColumn(name="food_id")
    private Food food;



}
