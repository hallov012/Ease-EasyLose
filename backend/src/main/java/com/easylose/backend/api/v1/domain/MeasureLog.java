package com.easylose.backend.api.v1.domain;

import java.time.LocalDateTime;
import javax.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "measure_log")
public class MeasureLog {

  @Id @GeneratedValue private Long id;

  @Column(nullable = false)
  private Float height;

  @Column(nullable = false)
  private Float weight;

  @ManyToOne(cascade = CascadeType.PERSIST, fetch = FetchType.LAZY)
  @JoinColumn(name = "user_id")
  private User user;

  private LocalDateTime createdAt;
}
