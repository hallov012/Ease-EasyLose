package com.easylose.backend.api.v1.service;

import com.easylose.backend.api.v1.dto.RecommendDto.RecommendResponseDto;
import java.util.List;

public interface RecommendService {
  List<RecommendResponseDto> getRecommend(Long id, Long foodset_id);
}
