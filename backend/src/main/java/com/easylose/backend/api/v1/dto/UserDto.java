package com.easylose.backend.api.v1.dto;

import com.easylose.backend.api.v1.domain.User;
import com.easylose.backend.api.v1.enums.ActivityLevel;
import com.easylose.backend.api.v1.enums.Gender;
import com.easylose.backend.api.v1.enums.Goal;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import javax.persistence.*;
import java.time.LocalDateTime;


public class UserDto {

    @AllArgsConstructor
    @Builder
    @Getter
    public static class CreateRequestDto{
        private String name;
        private Gender gender;
        private String birthdate;
        private String loginType;
        private String authorizationCode;
        private ActivityLevel activityLevel;
        private Goal goal;
        private Float dailyCalorie;
        private Float dailyCarb;
        private Float dailyProtein;
        private Float dailyFat;

        public User toEntity(){
            return User.builder()
                    .name(name)
                    .gender(gender)
                    .birthdate(birthdate)
                    .loginType(loginType)
                    .authorizationCode(authorizationCode)
                    .activityLevel(activityLevel)
                    .goal(goal)
                    .dailyCalorie(dailyCalorie)
                    .dailyCarb(dailyCarb)
                    .dailyProtein(dailyProtein)
                    .dailyFat(dailyFat)
                    .build();
        }
    }

    @AllArgsConstructor
    @Builder
    @Getter
    public static class ResponseDto{
        private Long id;
        private String name;
        private Gender gender;
        private String birthdate;
        private String loginType;
        private String authorizationCode;
        private ActivityLevel activityLevel;
        private Goal goal;
        private Float dailyCalorie;
        private Float dailyCarb;
        private Float dailyProtein;
        private Float dailyFat;
        private String profileImg;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;


        public ResponseDto(User user) {
            this.id = user.getId();
            this.name = user.getName();
            this.gender = user.getGender();
            this.birthdate = user.getBirthdate();
            this.loginType = user.getLoginType();
            this.authorizationCode = user.getAuthorizationCode();
            this.activityLevel = user.getActivityLevel();
            this.goal = user.getGoal();
            this.dailyCalorie = user.getDailyCalorie();
            this.dailyCarb = user.getDailyCarb();
            this.dailyProtein = user.getDailyProtein();
            this.dailyFat = user.getDailyFat();
            this.profileImg = user.getProfileImg();
            this.createdAt = user.getCreatedAt();
            this.updatedAt = user.getUpdatedAt();
        }

    }

    @AllArgsConstructor
    @Builder
    @Getter
    public static class UpdateRequestDto {
        private ActivityLevel activityLevel;
        private Goal goal;
        private Float dailyCalorie;
        private Float dailyCarb;
        private Float dailyProtein;
        private Float dailyFat;

        public User toEntity(){
            return User.builder()
                    .activityLevel(activityLevel)
                    .goal(goal)
                    .dailyCalorie(dailyCalorie)
                    .dailyCarb(dailyCarb)
                    .dailyProtein(dailyProtein)
                    .dailyFat(dailyFat)
                    .build();
        }
    }
}
