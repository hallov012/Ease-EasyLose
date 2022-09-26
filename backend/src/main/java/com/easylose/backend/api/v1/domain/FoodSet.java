package com.easylose.backend.api.v1.domain;

import com.easylose.backend.api.v1.enums.MealType;
import java.util.List;
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
@Table(name = "foodset")
public class FoodSet {

  @Id @GeneratedValue private Long id;

  private Long userId;

  @Column(nullable = false, name = "meal_type")
  @Enumerated(EnumType.STRING)
  private MealType mealType;

  @OneToMany(cascade = CascadeType.PERSIST)
  @JoinColumn(name = "foodset_id")
  private List<FoodSetDetail> details;
}
