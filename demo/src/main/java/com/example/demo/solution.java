package com.example.demo;

import java.util.ArrayList;
import java.util.List;

public class solution {
  public int solution(int[] A){
    List<String> list = new ArrayList<>();
    for (Integer a :A){
      list.add(Integer.toBinaryString(a));
    }
    System.out.println(list);
    return 0;
  }

}
