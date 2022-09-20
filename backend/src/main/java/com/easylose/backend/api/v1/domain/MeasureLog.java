package com.easylose.backend.api.v1.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;


@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name="measure_log")
public class MeasureLog {

    @Id
    @GeneratedValue
    private Long id;

    @Column(nullable = false)
    private Float height;

    @Column(nullable = false)
    private Float weight;

    @ManyToOne(cascade = CascadeType.PERSIST, fetch = FetchType.LAZY)
    @JoinColumn(name="user_id")
    private User user;

    private LocalDateTime createdAt;

}
