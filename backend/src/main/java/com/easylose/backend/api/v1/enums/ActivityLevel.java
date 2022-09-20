package com.easylose.backend.api.v1.enums;

import com.fasterxml.jackson.annotation.JsonCreator;

public enum ActivityLevel{
    LOWEST("아주낮음"),
    LOW("낮음"),
    HIGH("높음"),
    HIGHEST("아주높음");

    private final String state;

    ActivityLevel(String state){
        this.state = state;
    }

    @JsonCreator
    public static ActivityLevel from(String s){
        return ActivityLevel.valueOf(s.toUpperCase());
    }
    public String state(){
        return state;
    }
}
