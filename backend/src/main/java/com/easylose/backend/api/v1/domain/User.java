package com.easylose.backend.api.v1.domain;

import com.easylose.backend.api.v1.enums.ActivityLevel;
import com.easylose.backend.api.v1.enums.Gender;
import com.easylose.backend.api.v1.enums.Goal;
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
  private Long id;

  private String name;

  @Enumerated(EnumType.STRING)
  private Gender gender;

  private Integer age;

  private Float height;

  private Float weight;

  @Enumerated(EnumType.STRING)
  private ActivityLevel activityLevel;

  @Enumerated(EnumType.STRING)
  private Goal goal;

  private Integer dailyCalorie;

  private Integer dailyCarb;

  private Integer dailyProtein;

  private Integer dailyFat;

  private String profileImg;

  private String providerId;

  private String provider;

  private String refreshJws;

  @CreatedDate
  @Column(name = "created_at", updatable = false, nullable = false)
  private LocalDateTime createdAt;

  @LastModifiedDate
  @Column(name = "updated_at")
  private LocalDateTime updatedAt;
}
