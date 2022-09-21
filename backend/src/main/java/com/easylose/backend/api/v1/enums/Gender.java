package com.easylose.backend.api.v1.enums;

public enum Gender {
  MALE("남자"),
  FEMALE("여자");

  private final String state;

  Gender(String state) {
    this.state = state;
  }

  public String state() {
    return state;
  }
}
