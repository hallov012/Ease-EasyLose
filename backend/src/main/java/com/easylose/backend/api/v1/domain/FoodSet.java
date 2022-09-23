package com.easylose.backend.api.v1.domain;

import com.easylose.backend.api.v1.enums.MealType;
import javax.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "foodset")
public class FoodSet {

  @Id @GeneratedValue private Long id;

  @Column(nullable = false, name = "meal_type")
  private MealType mealType;

  @ManyToOne(cascade = CascadeType.PERSIST, fetch = FetchType.LAZY)
  @JoinColumn(name = "user_id")
  private User user;
}
