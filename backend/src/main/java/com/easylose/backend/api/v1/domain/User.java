package com.easylose.backend.api.v1.domain;

import com.easylose.backend.api.v1.dto.UserDto;
import com.easylose.backend.api.v1.enums.ActivityLevel;
import com.easylose.backend.api.v1.enums.Gender;
import com.easylose.backend.api.v1.enums.Goal;
import java.time.LocalDateTime;
import javax.persistence.*;
import lombok.*;
import org.hibernate.annotations.DynamicUpdate;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Entity // Entity 선언
@Getter
@NoArgsConstructor(
    access = AccessLevel.PROTECTED) // 무분별한 객체 생성을 방지할 수 있음, User user = new User() 생성 금지당함
@EntityListeners(AuditingEntityListener.class)
@Table(name = "user")
@DynamicUpdate
public class User {

  @Id // id 설정
  @GeneratedValue(strategy = GenerationType.IDENTITY) // 기본 키 설정을 db에 위임
  private Long id;

  private String name;

  @Enumerated(EnumType.STRING)
  private Gender gender;

  private String birthdate;

  private Float height;

  private Float weight;

  @Enumerated(EnumType.STRING)
  private ActivityLevel activityLevel;

  @Enumerated(EnumType.STRING)
  private Goal goal;

  private Float dailyCalorie;

  private Float dailyCarb;

  private Float dailyProtein;

  private Float dailyFat;

  private String profileImg;

  private String providerId;

  private String provider;

  @Setter private String refreshJws;

  @CreatedDate
  @Column(name = "created_at", updatable = false, nullable = false)
  private LocalDateTime createdAt;

  @LastModifiedDate
  @Column(name = "updated_at")
  private LocalDateTime updatedAt;

  @Builder
  public User(Long id, String name, Gender gender, String birthdate, Float height, Float weight, ActivityLevel activityLevel, Goal goal, Float dailyCalorie, Float dailyCarb, Float dailyProtein, Float dailyFat, String profileImg, String providerId, String provider, LocalDateTime createdAt, LocalDateTime updatedAt) {
    this.id = id;
    this.name = name;
    this.gender = gender;
    this.birthdate = birthdate;
    this.height = height;
    this.weight = weight;
    this.activityLevel = activityLevel;
    this.goal = goal;
    this.dailyCalorie = dailyCalorie;
    this.dailyCarb = dailyCarb;
    this.dailyProtein = dailyProtein;
    this.dailyFat = dailyFat;
    this.profileImg = profileImg;
    this.providerId = providerId;
    this.provider = provider;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }




  public void update(UserDto.UpdateRequestDto requestDto) {
    this.activityLevel = requestDto.getActivityLevel();
    this.goal = requestDto.getGoal();
    this.dailyCalorie = requestDto.getDailyCalorie();
    this.dailyCarb = requestDto.getDailyCarb();
    this.dailyProtein = requestDto.getDailyProtein();
    this.dailyFat = requestDto.getDailyFat();
  }

  public void updateProvider(String name, String profileImg, String providerId, String provider) {
    this.name = name;
    this.profileImg = profileImg;
    this.providerId = providerId;
    this.provider = provider;
  }
}
