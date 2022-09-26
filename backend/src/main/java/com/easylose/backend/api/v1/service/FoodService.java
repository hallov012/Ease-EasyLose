package com.easylose.backend.api.v1.service;

import java.util.Collection;

public interface FoodService {
  Collection getFood(Long id, String name, String barcode);
}
