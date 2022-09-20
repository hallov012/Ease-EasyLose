package com.easylose.backend.api.v1.enums;
public enum Goal{
    KEEP("유지"),
    DIET("다이어트"),
    BULK("벌크업");

    private final String state;

    Goal(String state){
        this.state = state;
    }
    public String state(){
        return state;
    }
}
