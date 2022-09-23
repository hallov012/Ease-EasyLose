package com.easylose.backend.api.v1.domain;

import com.easylose.backend.api.v1.enums.MealType;
import javax.persistence.*;
import lombok.*;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Entity // Entity 선언
@Getter
@Setter
@ToString
@Builder
@NoArgsConstructor(
    access = AccessLevel.PROTECTED) // 무분별한 객체 생성을 방지할 수 있음, User user = new User() 생성 금지당함
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@EntityListeners(AuditingEntityListener.class)
@Table(name = "daily_meal")
public class DailyMealLog {

  @Id @GeneratedValue private Long id;
  private String date;

  private MealType mealType;

  private Float count;

  @ManyToOne(cascade = CascadeType.PERSIST, fetch = FetchType.LAZY)
  @JoinColumn(name = "user_id")
  private User user;

  @ManyToOne(cascade = CascadeType.PERSIST, fetch = FetchType.LAZY)
  @JoinColumn(name = "food_id")
  private Food food;

  //  @Builder
  //  public DailyMealLog(Long id, String date, MealType mealType, Float count, User user, Food
  // food) {
  //    this.id = id;
  //    this.date = date;
  //    this.mealType = mealType;
  //    this.count = count;
  //    this.user = user;
  //    this.food = food;
  //  }
}
