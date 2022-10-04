package com.easylose.backend.api.v1.domain;

import com.easylose.backend.api.v1.enums.MealType;
import com.fasterxml.jackson.annotation.JsonBackReference;
import javax.persistence.*;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
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
@Table(name = "foodset_detail")
public class FoodSetDetail {

  @Id @GeneratedValue private Long id;

  @Column(nullable = false)
  private Float count;

  @Column(nullable = false, name = "meal_type")
  @Enumerated(EnumType.STRING)
  private MealType mealType;

  @ManyToOne(cascade = CascadeType.PERSIST, fetch = FetchType.LAZY)
  @JoinColumn(name = "food_id")
  @OnDelete(action = OnDeleteAction.CASCADE)
  private Food food;

  @ManyToOne(cascade = CascadeType.PERSIST, fetch = FetchType.LAZY)
  @JoinColumn(name = "foodset_id")
  @OnDelete(action = OnDeleteAction.CASCADE)
  @JsonBackReference
  private FoodSet foodSet;
}
