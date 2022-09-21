package com.easylose.backend.api.v1.domain;

import javax.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "foodset_detail")
public class FoodSetDetail {

  @Id @GeneratedValue private Long id;

  @Column(nullable = false)
  private Float count;

  @ManyToOne(cascade = CascadeType.PERSIST, fetch = FetchType.LAZY)
  @JoinColumn(name = "food_id")
  private Food food;

  @ManyToOne(cascade = CascadeType.PERSIST, fetch = FetchType.LAZY)
  @JoinColumn(name = "foodset_id")
  private FoodSet foodSet;
}
