package com.easylose.backend.api.v1.enums;

public enum MealType{
    BREAKFAST("아침"),
    LUNCH("점심"),
    DINNER("저녁"),
    SNACK("간식");

    private final String state;
    MealType(String state){
        this.state = state;
    }
    public String state(){
        return state;
    }
}
