package com.easylose.backend.api.v1.enums;

public enum FoodType{
    PRC("가공식품"),
    FRZ("냉동식품"),
    COK("조리식품"),
    GEN("일반식품"),
    RAW("재료"); // 추후 수정

    private final String state;

    FoodType(String state){
        this.state = state;
    }

    public String state(){
        return state;
    }

}
