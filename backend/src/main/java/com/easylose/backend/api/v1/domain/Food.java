package com.easylose.backend.api.v1.domain;

import com.easylose.backend.api.v1.enums.FoodType;
import javax.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "food")
public class Food {

  @Id @GeneratedValue private Long id;

  @Enumerated
  @Column(nullable = false)
  private FoodType foodType;

  @Column(length = 30, nullable = false)
  private String name;

  @ManyToOne(cascade = CascadeType.PERSIST, fetch = FetchType.LAZY)
  @JoinColumn(name = "user_id")
  private User user;

  @Column(name = "product_id", length = 20)
  private String productId;

  @Column(length = 50)
  private String barcode;

  private Float calorie;

  private Float carb;

  private Float protein;

  private Float fat;
}
