package com.easylose.backend.api.v1.domain;

import com.easylose.backend.api.v1.dto.DailyMealLogDto;
import com.easylose.backend.api.v1.enums.MealType;
import javax.persistence.*;

import lombok.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "dailymeal_log")
public class DailyMealLog {

  @Id
  @GeneratedValue
  private Long id;
  private String date;

  private MealType mealType;

  private Float count;

  @ManyToOne(cascade = CascadeType.PERSIST, fetch = FetchType.LAZY)
  @JoinColumn(name = "user_id")
  private User user;

  @ManyToOne(cascade = CascadeType.PERSIST, fetch = FetchType.LAZY)
  @JoinColumn(name = "food_id")
  private Food food;

  @Builder
  public DailyMealLog(Long id, String date, MealType mealType, Float count, User user, Food food) {
    this.id = id;
    this.date = date;
    this.mealType = mealType;
    this.count = count;
    this.user = user;
    this.food = food;
  }
  public void update(DailyMealLogDto.CreateAndUpdateRequestDto updateRequestDto){
    this.date = updateRequestDto.getDate();
    this.mealType = updateRequestDto.getMealType();
    this.food = updateRequestDto.getFood();
  }
}
