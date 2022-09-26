package com.easylose.backend.api.v1.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
@Table(name = "food")
public class Food {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String foodType;

  private Boolean canRecommend;

  private String name;

  @ManyToOne(cascade = CascadeType.PERSIST, fetch = FetchType.LAZY)
  @JoinColumn(name = "user_id")
  @JsonIgnore
  private User user;

  @Column(name = "product_id", length = 20)
  private String productId;

  private Float totalAmount;

  @Column(length = 50)
  private String barcode;

  private Float calorie;

  private Float carb;

  private Float protein;

  private Float fat;

  private Float sugar;
  private Float salt;
  private Float cholesterol;
  private Float saturatedFat;
  private Float transFat;
}
