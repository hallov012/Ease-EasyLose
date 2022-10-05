package com.easylose.backend.util;

public class Utils {
  public static float mealScore(float total, float daily) {
    float CORR = 0.1f;

    float absRawScore = Math.abs(1 - total / daily);
    float absCorrScore = Math.max(0, absRawScore - CORR) / (1 - CORR);

    return 1 - absCorrScore;
  }
}
