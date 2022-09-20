package com.easylose.backend.api.v1.dto;

import com.easylose.backend.api.v1.domain.User;
import lombok.Getter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
public class MeasureLogDto {

    private Long id;
    private Float height;
    private Float weight;
    private User user;
    private LocalDateTime createdAt;
}
