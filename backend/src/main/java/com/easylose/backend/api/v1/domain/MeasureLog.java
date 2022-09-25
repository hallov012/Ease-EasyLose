package com.easylose.backend.api.v1.domain;

import java.time.LocalDateTime;
import javax.persistence.*;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.annotation.CreatedDate;
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
@Table(name = "measure_log")
public class MeasureLog {

  @Id @GeneratedValue private Long id;

  private Float height;

  private Float weight;

  //  @ManyToOne(cascade = CascadeType.PERSIST, fetch = FetchType.EAGER)
  //  @JoinColumn(name = "user_id")
  //  private User user;
  private Long userId;

  @CreatedDate
  @Column(updatable = false)
  private LocalDateTime createdAt;
}
