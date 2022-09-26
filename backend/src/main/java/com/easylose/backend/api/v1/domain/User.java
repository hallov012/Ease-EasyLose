package com.easylose.backend.api.v1.domain;

import com.easylose.backend.api.v1.enums.ActivityLevel;
import com.easylose.backend.api.v1.enums.Gender;
import com.easylose.backend.api.v1.enums.Goal;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.time.LocalDateTime;
import javax.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
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
@Table(name = "user")
public class User {

  @Id // id 설정
  @GeneratedValue(strategy = GenerationType.IDENTITY) // 기본 키 설정을 db에 위임
  @JsonProperty
  private Long id;

  @JsonProperty private String name;

  @Enumerated(EnumType.STRING)
  @JsonProperty
  private Gender gender;

  @JsonProperty private String birthdate;

  @JsonProperty private Float height;

  @JsonProperty private Float weight;

  @JsonProperty
  @Enumerated(EnumType.STRING)
  private ActivityLevel activityLevel;

  @JsonProperty
  @Enumerated(EnumType.STRING)
  private Goal goal;

  @JsonProperty private Float dailyCalorie;

  @JsonProperty private Float dailyCarb;

  @JsonProperty private Float dailyProtein;

  @JsonProperty private Float dailyFat;

  @JsonProperty private String profileImg;

  @JsonProperty private String providerId;

  @JsonProperty private String provider;

  @JsonProperty private String refreshJws;

  @JsonProperty
  @CreatedDate
  @Column(name = "created_at", updatable = false, nullable = false)
  private LocalDateTime createdAt;

  @JsonProperty
  @LastModifiedDate
  @Column(name = "updated_at")
  private LocalDateTime updatedAt;
}
